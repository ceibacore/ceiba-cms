<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\Page\Infrastructure\CeibaDbPageRepository;
use CeibaCms\PageBuilder\Infrastructure\SystemClock;
use CeibaCms\SitePart\Application\HostRoutes;
use CeibaCms\SitePart\Application\ManageSiteParts;
use CeibaCms\SitePart\Application\RulesConflict;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 06-A: parts are page documents kept out of every page lookup; their rules are versioned drafts. */
final class ManageSitePartsTest extends TestCase
{
    private \CeibaDB $db;
    private SitePartStore $store;
    private ManageSiteParts $parts;

    protected function setUp(): void
    {
        $this->db = RevisionSchema::create();
        $this->store = new SitePartStore($this->db, 'site-1');
        $this->parts = new ManageSiteParts($this->store, new CreatePage($this->db, 'site-1'), new GetPageWorkingRevision($this->db, 'site-1'),
            new SystemClock(), new HostRoutes(['portal' => 'Student portal']));
    }

    public function testAPartIsADraftDocumentThatNoPageLookupReturns(): void
    {
        RevisionSchema::page($this->db, 'site-1', 'p1', '[]');
        $id = $this->parts->create('header', 'Main header', 'admin');
        $part = $this->store->find($id);
        self::assertSame(['header', 'Main header', 'draft', 1], [$part['kind'], $part['name'], $part['status'], $part['version']]);
        self::assertSame([['type' => 'site']], $part['rules']['include']);
        self::assertNull($part['publishedRules']);

        (new PublishPageRevision($this->db, 'site-1'))->execute($id, 1, 'k1', 'admin');
        $pages = new CeibaDbPageRepository($this->db);
        self::assertNull($pages->findBySlug('__part-' . $id));
        self::assertSame(['p1'], array_column($pages->findPublished(50, 0), 'id'));
        self::assertSame(['p1'], array_column($pages->findAdministrative(null, null, 50, 0), 'id'));
        self::assertSame([], $this->store->published(), 'rules reach visitors only once published');
        $this->store->publishRules($id);
        self::assertSame([$id], array_map(fn ($p) => $p->id, $this->store->published()));
    }

    public function testRulesAreSavedOverTheirVersionAndValidated(): void
    {
        $id = $this->parts->create('footer', 'Footer', 'admin');
        $rules = ['include' => [['type' => 'routes', 'names' => ['portal']]], 'priority' => 3];
        self::assertSame(2, $this->parts->saveRules($id, $rules, 1, 'admin'));
        try {
            $this->parts->saveRules($id, $rules, 1, 'other');
            self::fail('Stale version accepted');
        } catch (RulesConflict $conflict) {
            self::assertSame(2, $conflict->currentVersion);
        }
        $this->expectException(InvalidRules::class);
        $this->parts->saveRules($id, ['include' => [['type' => 'routes', 'names' => ['admin']]]], 2, 'admin');
    }

    public function testDuplicatingCopiesTheDocumentAndTheDraftRules(): void
    {
        $id = $this->parts->create('not_found', '404', 'admin');
        $this->parts->saveRules($id, ['include' => [['type' => 'path_prefix', 'value' => '/cursos']]], 1, 'admin');
        $copy = $this->parts->create('not_found', '404 courses', 'admin', $id);
        self::assertSame('/cursos', $this->store->find($copy)['rules']['include'][0]['value']);
        $this->expectException(InvalidRules::class);
        $this->parts->create('header', 'Wrong kind', 'admin', $id);
    }

    public function testUnknownKindsAndEmptyNamesAreRefused(): void
    {
        foreach ([['sidebar', 'x'], ['header', '  ']] as [$kind, $name]) {
            try {
                $this->parts->create($kind, $name, 'admin');
                self::fail('Accepted');
            } catch (InvalidRules $invalid) {
                self::assertSame('INVALID_VALUE', $invalid->reason);
            }
        }
    }

    public function testPartsCannotBeReadOrChangedFromAnotherSite(): void
    {
        $id = $this->parts->create('header', 'Site one', 'admin');
        (new PublishPageRevision($this->db, 'site-1'))->execute($id, 1, 'publish-site-one', 'admin');
        $this->store->publishRules($id);
        $other = new SitePartStore($this->db, 'site-2');
        self::assertSame([], $other->all());
        self::assertSame([], $other->published());
        self::assertNull($other->find($id));
        self::assertNull($other->saveDraftRules($id, \CeibaCms\SitePart\Domain\SitePartRules::default(), 1, null, '2026-01-01'));
        $this->expectException(\InvalidArgumentException::class);
        $other->publishRules($id);
    }

    public function testCreationRollsBackTheDocumentWhenRulesCannotBeInserted(): void
    {
        $pdo = $this->db->pdo();
        $pdo->exec('DROP TABLE ' . $this->db->getPrefix() . 'site_part_rules');
        try {
            $this->parts->create('footer', 'Footer', 'admin');
            self::fail('Creation should fail');
        } catch (\PDOException) {
            self::assertSame(0, (int) $pdo->query('SELECT COUNT(*) FROM ' . $this->db->getPrefix() . 'pages')->fetchColumn());
            self::assertFalse($pdo->inTransaction());
        }
    }
}
