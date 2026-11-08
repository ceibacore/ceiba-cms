<?php
declare(strict_types=1);

namespace LemurCms\Tests\Localization;

use LemurDB;
use LemurCms\Localization\Infrastructure\LemurDbTranslationRepository;
use PHPUnit\Framework\TestCase;

final class TranslationRepositoryOrderingTest extends TestCase
{
    /** `group` and `key` are reserved words; ordering must use both columns. */
    public function testOrdersByGroupThenKeyWithReservedColumnNames(): void
    {
        $prefix = 'tr_' . bin2hex(random_bytes(4)) . '_';
        $db = LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $db->pdo()->exec("CREATE TABLE {$prefix}translations (id TEXT PRIMARY KEY, language_id TEXT, `group` TEXT, `key` TEXT, value TEXT)");
        $insert = $db->pdo()->prepare("INSERT INTO {$prefix}translations VALUES (?, ?, ?, ?, ?)");
        foreach ([['1', 'general', 'z', 'Z'], ['2', 'auth', 'b', 'B'], ['3', 'general', 'a', 'A'], ['4', 'auth', 'a', 'A2']] as [$id, $group, $key, $value]) {
            $insert->execute([$id, 'lang-es', $group, $key, $value]);
        }
        $insert->execute(['5', 'lang-en', 'auth', 'a', 'other language']);

        $rows = (new LemurDbTranslationRepository($db))->getTranslationsForLanguage('lang-es');
        self::assertSame(['4', '2', '3', '1'], array_column($rows, 'id'));
    }
}
