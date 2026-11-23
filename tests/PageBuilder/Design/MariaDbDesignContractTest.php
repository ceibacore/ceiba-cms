<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Design;

use CeibaCms\Migration\CmsMigrationGenerator;
use CeibaCms\Migration\CmsMigrationRunner;
use CeibaCms\PageBuilder\Application\Design\DesignRevisionConflict;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\PublishSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaDB;
use PHPUnit\Framework\TestCase;

/**
 * Site design store on a real MariaDB/MySQL with the real migrations (plan 04-B): row locking (FOR UPDATE), JSON
 * snapshots and two sites on one database. Opt-in like MariaDbRevisionContractTest (CMS_CONTRACT_DB_*).
 */
final class MariaDbDesignContractTest extends TestCase
{
    private static ?CeibaDB $db = null;
    private static string $prefix = '';

    public static function setUpBeforeClass(): void
    {
        if (!getenv('CMS_CONTRACT_DB_HOST')) {
            return;
        }
        self::$prefix = 'dz_' . bin2hex(random_bytes(3)) . '_';
        self::$db = CeibaDB::getInstance(['driver' => 'mysql', 'host' => getenv('CMS_CONTRACT_DB_HOST'),
            'port' => (int) (getenv('CMS_CONTRACT_DB_PORT') ?: 3306), 'db' => getenv('CMS_CONTRACT_DB_NAME'),
            'username' => getenv('CMS_CONTRACT_DB_USER'), 'password' => getenv('CMS_CONTRACT_DB_PASS'), 'prefix' => self::$prefix]);
        (new CmsMigrationRunner(new CmsMigrationGenerator(dirname(__DIR__, 3) . '/migrations', self::$prefix), self::$db, self::$prefix))->up();
    }

    public static function tearDownAfterClass(): void
    {
        if (self::$db === null) {
            return;
        }
        $pdo = self::$db->pdo();
        $pdo->exec('SET FOREIGN_KEY_CHECKS=0');
        foreach ($pdo->query("SHOW TABLES LIKE '" . self::$prefix . "%'")->fetchAll(\PDO::FETCH_COLUMN) as $table) {
            $pdo->exec("DROP TABLE `{$table}`");
        }
        $pdo->exec('SET FOREIGN_KEY_CHECKS=1');
    }

    protected function setUp(): void
    {
        if (self::$db === null) {
            self::markTestSkipped('Set CMS_CONTRACT_DB_* to run the MariaDB contract test');
        }
    }

    public function testDesignRevisionsLifecycleOnMariaDb(): void
    {
        $store = new SiteDesignStore(self::$db, 'site-a');
        $get = new GetSiteDesign($store);
        $save = new SaveSiteDesignDraft($store);
        $design = array_replace(SiteDesign::defaults(), ['tokens' => ['color.brand' => ['type' => 'color', 'value' => '#123456']]]);

        self::assertSame(1, $save->execute($design, 0, 'admin'));
        self::assertSame(2, $save->execute($design, 1, 'admin'));
        try {
            $save->execute($design, 1, 'admin');
            self::fail('A stale draft must be refused');
        } catch (DesignRevisionConflict $conflict) {
            self::assertSame(2, $conflict->currentRevision);
        }
        self::assertSame(2, (new PublishSiteDesign($store))->execute(2));
        self::assertSame('#123456', $get->published()['tokens']['color.brand']['value']);
        self::assertSame(0, (new GetSiteDesign(new SiteDesignStore(self::$db, 'site-b')))->working()['revision']);
        $hash = self::$db->pdo()->query('SELECT content_hash FROM ' . self::$prefix . "design_revisions WHERE revision = 2")->fetchColumn();
        self::assertSame(SiteDesign::hash($design), $hash);
    }
}
