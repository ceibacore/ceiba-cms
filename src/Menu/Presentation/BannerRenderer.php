<?php

declare(strict_types=1);

namespace LemurCms\Menu\Presentation;

use LemurCms\Menu\Domain\MenuRepositoryInterface;

class BannerRenderer
{
    public function __construct(private MenuRepositoryInterface $repository)
    {
    }

    /**
     * Renderizar banners activos para una posición
     *
     * @param string $position 'above' o 'below'
     * @return string HTML de banners
     */
    public function render(string $position = 'above'): string
    {
        $banners = $this->repository->getActiveBanners($position);

        if (empty($banners)) {
            return '';
        }

        return sprintf('<div class="banners-container banners-%s">%s</div>', 
            htmlspecialchars($position),
            implode('', array_map(fn($b) => $this->renderBanner($b), $banners))
        );
    }

    /**
     * Renderizar un banner individual
     *
     * @param array<string, mixed> $banner
     * @return string HTML del banner
     */
    private function renderBanner(array $banner): string
    {
        $bannerClass = 'alert alert-dismissible fade show';
        $bgColor = $banner['bg_color'] ?? '#f8f9fa';
        $textColor = $banner['text_color'] ?? '#000000';

        $content = htmlspecialchars($banner['content']);
        $linkHtml = '';

        if (!empty($banner['link_url']) && !empty($banner['link_text'])) {
            $linkUrl = htmlspecialchars($banner['link_url']);
            $linkText = htmlspecialchars($banner['link_text']);
            $linkHtml = sprintf(' <a href="%s" class="alert-link">%s</a>', $linkUrl, $linkText);
        }

        $closeBtn = $banner['is_closeable'] 
            ? '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>'
            : '';

        return sprintf(
            '<div class="%s" style="background-color:%s; color:%s;" role="alert">%s%s%s</div>',
            htmlspecialchars($bannerClass),
            htmlspecialchars($bgColor),
            htmlspecialchars($textColor),
            $closeBtn,
            $content,
            $linkHtml
        );
    }

    /**
     * Renderizar banners para una posición específica con scheduling
     *
     * @param string $position 'above' o 'below'
     * @return string HTML
     */
    public function renderScheduled(string $position = 'above'): string
    {
        $now = date('Y-m-d H:i:s');
        $banners = $this->repository->getActiveBanners($position);

        $filtered = array_filter($banners, function ($banner) use ($now) {
            $startAt = $banner['start_at'] ?? null;
            $endAt = $banner['end_at'] ?? null;

            if ($startAt && $now < $startAt) {
                return false;
            }

            if ($endAt && $now > $endAt) {
                return false;
            }

            return true;
        });

        if (empty($filtered)) {
            return '';
        }

        return sprintf('<div class="banners-container banners-%s">%s</div>',
            htmlspecialchars($position),
            implode('', array_map(fn($b) => $this->renderBanner($b), $filtered))
        );
    }
}
