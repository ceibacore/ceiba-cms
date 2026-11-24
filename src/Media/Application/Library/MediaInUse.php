<?php

declare(strict_types=1);

namespace CeibaCms\Media\Application\Library;

/** The asset is still drawn by a page, a layout footer or the site design; remove those uses first. */
final class MediaInUse extends \RuntimeException
{
    /** @param array{pages: list<array{pageId: string, title: string}>, layouts: list<array{layoutId: string, name: string}>, design: bool} $usages */
    public function __construct(public readonly array $usages)
    {
        parent::__construct('Media is in use');
    }
}
