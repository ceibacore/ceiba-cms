<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Components;

use CeibaCms\PageBuilder\Application\ComponentScripts;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use PHPUnit\Framework\TestCase;

/** Plan 05-C: groups hold only their own items, and pages carry the scripts and CSS of what they use. */
final class InteractiveComponentsTest extends TestCase
{
    public function testEachGroupHoldsOnlyItsOwnItems(): void
    {
        $catalogue = ComponentCatalogue::createDefault();
        foreach (['tabs' => 'tab_panel', 'disclosures' => 'disclosure', 'slideshow' => 'slide'] as $group => $item) {
            self::assertSame([$item], $catalogue->get($group)->allowedChildren, $group);
            self::assertSame([$group], $catalogue->get($item)->allowedParents, $item);
            self::assertTrue($catalogue->get($item)->isContainer, $item);
        }
        $json = json_encode($catalogue->toArray(), JSON_THROW_ON_ERROR);
        self::assertStringContainsString('"name":"slide","version":1,"label":"Carousel slide","category":"interactive","propsSchema":{}', $json);
    }

    public function testPagesGetTheBehaviourAndCssOfTheComponentsTheyUse(): void
    {
        $tree = [['id' => 't', 'type' => 'tabs', 'children' => [['id' => 'p', 'type' => 'tab_panel', 'children' => []]]],
            ['id' => 'c', 'type' => 'slideshow', 'children' => []]];
        $js = ComponentScripts::for($tree);
        self::assertStringContainsString('window.__cmsTabs', $js);
        self::assertStringContainsString('window.__cmsCarousel', $js);
        self::assertStringNotContainsString('window.__cmsAccordion', $js);
        self::assertStringContainsString('prefers-reduced-motion', ComponentScripts::css($tree));
        self::assertSame('', ComponentScripts::css([['id' => 't', 'type' => 'tabs', 'children' => []]]), 'tabs need no extra CSS');
        foreach (ComponentScripts::SCRIPTS as $file) {
            self::assertFileExists(dirname(__DIR__, 3) . '/src/PageBuilder/Frameworks/Bootstrap5/behaviors/' . $file);
        }
    }
}
