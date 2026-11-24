<?php

declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\PageRevisionNotFound;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PublicationTransactionTest extends TestCase
{
    public function testFailureOfSecondPublicationRollsBackFirstPublicationAndItsOutbox(): void
    {
        $db = RevisionSchema::create();
        $create = new CreatePage($db, 'site-1');
        $first = $create->execute(['title' => 'Header', 'slug' => 'header', 'kind' => 'header']);
        $second = $create->execute(['title' => 'Footer', 'slug' => 'footer', 'kind' => 'footer']);
        $publish = new PublishPageRevision($db, 'site-1');
        try {
            $db->transaction(function () use ($publish, $first, $second): void {
                $publish->execute($first, 1, 'batch-first');
                $publish->execute($second, 999, 'batch-second');
            });
            self::fail('Invalid revision was accepted');
        } catch (PageRevisionNotFound) {
            $pdo = $db->pdo();
            $prefix = $db->getPrefix();
            self::assertSame(0, (int) $pdo->query("SELECT COUNT(*) FROM {$prefix}pages WHERE status = 'published'")->fetchColumn());
            self::assertSame(0, (int) $pdo->query("SELECT COUNT(*) FROM {$prefix}page_publication_outbox")->fetchColumn());
            self::assertFalse($pdo->inTransaction());
        }
    }

    public function testCaughtNestedFailureDoesNotBreakTheCallerTransaction(): void
    {
        $db = RevisionSchema::create();
        $id = (new CreatePage($db, 'site-1'))->execute(['title' => 'Header', 'slug' => 'header', 'kind' => 'header']);
        $publish = new PublishPageRevision($db, 'site-1');
        $db->transaction(function () use ($publish, $id): void {
            try {
                $publish->execute($id, 999, 'bad');
            } catch (PageRevisionNotFound) {
                $publish->execute($id, 1, 'good');
            }
        });
        self::assertSame('published', $db->query('pages')->where(['id' => $id])->first()['status']);
    }
}
