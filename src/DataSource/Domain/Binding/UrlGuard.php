<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain\Binding;

/** A URL from data is used only when it is relative, http(s), mailto or tel (plan 07, D-4). */
final class UrlGuard
{
    public static function safe(string $url): ?string
    {
        $url = trim(str_replace(["\0", "\t", "\n", "\r"], '', $url));
        if ($url === '') {
            return null;
        }
        if (preg_match('#^(/(?!/)|\./|\.\./|\?|\#)#', $url)) {
            return $url;
        }
        $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));

        return in_array($scheme, ['http', 'https', 'mailto', 'tel'], true) ? $url : null;
    }
}
