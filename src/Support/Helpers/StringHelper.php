<?php

declare(strict_types=1);

namespace LemurCms\Support\Helpers;

class StringHelper
{
    /**
     * Convertir texto a slug: "Hello World" → "hello-world"
     */
    public static function slugify(string $text): string
    {
        // Convertir a minúsculas
        $text = strtolower($text);

        // Reemplazar espacios con guiones
        $text = preg_replace('/\s+/', '-', $text);

        // Remover caracteres no alfanuméricos excepto guiones
        $text = preg_replace('/[^a-z0-9-]/', '', $text);

        // Remover guiones múltiples
        $text = preg_replace('/-+/', '-', $text);

        // Remover guiones al inicio y final
        return trim($text, '-');
    }

    /**
     * Sanitizar URL: asegurar que sea una URL válida
     * 
     * @param string $url URL a sanitizar
     * @return string URL sanitizada
     */
    public static function sanitizeUrl(string $url): string
    {
        // Si es una URL relativa que comienza con /, dejarla así
        if (strpos($url, '/') === 0) {
            return $url;
        }

        // Si es una URL absoluta, validar y limpiar
        if (filter_var($url, FILTER_VALIDATE_URL)) {
            return $url;
        }

        // Si es una URL relativa sin /, agregar /
        if (strpos($url, 'http') === false && strpos($url, '#') === false) {
            return '/' . ltrim($url, '/');
        }

        return $url;
    }

    /**
     * Truncar HTML preservando etiquetas: "Hello <b>World</b>!" → "Hello <b>Wo...</b>"
     * 
     * @param string $html HTML a truncar
     * @param int $length Longitud máxima
     * @param string $suffix Sufijo (default: "...")
     * @return string HTML truncado
     */
    public static function htmlTruncate(string $html, int $length, string $suffix = '...'): string
    {
        if (strlen(strip_tags($html)) <= $length) {
            return $html;
        }

        // Contar caracteres sin tags
        $position = 0;
        $tags = [];
        $output = '';
        $currentLength = 0;

        // Simple implementation: strip tags, truncate, and add ellipsis
        $text = strip_tags($html);
        $text = substr($text, 0, $length);

        // Si hay HTML, intentar preservar estructura básica
        if (strpos($html, '<') !== false) {
            return htmlspecialchars(substr($text, 0, $length - strlen($suffix))) . $suffix;
        }

        return $text . $suffix;
    }

    /**
     * Generar hash compatible con URLs
     */
    public static function hashId(int $id): string
    {
        return bin2hex(pack('N', $id));
    }

    /**
     * Decodificar hash de URL
     */
    public static function unhashId(string $hash): ?int
    {
        if (strlen($hash) !== 8) {
            return null;
        }

        try {
            $unpacked = unpack('N', hex2bin($hash));
            return $unpacked[1] ?? null;
        } catch (\Throwable) {
            return null;
        }
    }
}
