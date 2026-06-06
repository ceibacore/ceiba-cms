<?php

declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Import;

use LemurCms\PageBuilder\Import\HtmlImporter;
use PHPUnit\Framework\TestCase;

class NewSemanticRulesTest extends TestCase
{
    private HtmlImporter $importer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->importer = new HtmlImporter();
    }

    public function testBlockquoteRuleImportsCorrectly(): void
    {
        $html = '<blockquote class="my-quote"><p>Words</p><time datetime="2026-06-05">Today</time></blockquote><address>Madrid</address>';
        $result = $this->importer->import($html);
        $tree = $result->toArray()['tree'];

        $this->assertCount(2, $tree);

        // First node is blockquote
        $blockquote = $tree[0];
        $this->assertEquals('blockquote', $blockquote['type']);
        $this->assertNull($blockquote['name']);
        $this->assertEquals('pb-semantic-blockquote my-quote', $blockquote['props']['class'] ?? '');
        $this->assertEquals('blockquote', $blockquote['props']['tag'] ?? '');

        // Inside blockquote there's a p and a time
        $this->assertCount(2, $blockquote['children']);
        
        $p = $blockquote['children'][0];
        $this->assertEquals('p', $p['type']);

        $time = $blockquote['children'][1];
        $this->assertEquals('time', $time['type']);
        $this->assertEquals('pb-semantic-time', $time['props']['class'] ?? '');
        $this->assertEquals('2026-06-05', $time['props']['datetime'] ?? '');

        // Second node is address
        $address = $tree[1];
        $this->assertEquals('address', $address['type']);
        $this->assertEquals('pb-semantic-address', $address['props']['class'] ?? '');
    }

    public function testListRuleImportsListsCorrectly(): void
    {
        $html = '<ul class="nav-list"><li>Item 1</li><li>Item 2</li></ul>';
        $result = $this->importer->import($html);
        $tree = $result->toArray()['tree'];

        $this->assertCount(1, $tree);

        $ul = $tree[0];
        $this->assertEquals('ul', $ul['type']);
        $this->assertEquals('pb-semantic-ul nav-list', $ul['props']['class'] ?? '');

        $this->assertCount(2, $ul['children']);

        $li1 = $ul['children'][0];
        $this->assertEquals('li', $li1['type']);
        $this->assertEquals('pb-semantic-li', $li1['props']['class'] ?? '');
    }

    public function testTableRuleImportsTablesCorrectly(): void
    {
        $html = '<table class="table"><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>';
        $result = $this->importer->import($html);
        $tree = $result->toArray()['tree'];

        $this->assertCount(1, $tree);

        $table = $tree[0];
        $this->assertEquals('table', $table['type']);
        $this->assertEquals('pb-semantic-table table', $table['props']['class'] ?? '');

        $this->assertCount(2, $table['children']);

        $thead = $table['children'][0];
        $this->assertEquals('thead', $thead['type']);

        $tbody = $table['children'][1];
        $this->assertEquals('tbody', $tbody['type']);

        $this->assertCount(1, $thead['children']);
        $trHead = $thead['children'][0];
        $this->assertEquals('tr', $trHead['type']);

        $this->assertCount(1, $trHead['children']);
        $th = $trHead['children'][0];
        $this->assertEquals('th', $th['type']);
    }
}
