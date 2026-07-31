<?php

declare(strict_types=1);

namespace LemurCms\Support\Helpers;

class ArrayHelper
{
    /**
     * Obtener valor de array con dot notation: ['user' => ['name' => 'John']] → get('user.name')
     * 
     * @template T
     * @param array<string, mixed> $array
     * @param string $key
     * @param T $default
     * @return T|mixed
     */
    public static function get(array $array, string $key, mixed $default = null): mixed
    {
        if (array_key_exists($key, $array)) {
            return $array[$key];
        }

        if (strpos($key, '.') === false) {
            return $default;
        }

        $keys = explode('.', $key);
        $current = $array;

        foreach ($keys as $k) {
            if (!is_array($current) || !array_key_exists($k, $current)) {
                return $default;
            }
            $current = $current[$k];
        }

        return $current;
    }

    /**
     * Establecer valor en array con dot notation
     * 
     * @param array<string, mixed> $array
     * @param string $key
     * @param mixed $value
     * @return array<string, mixed>
     */
    public static function set(array &$array, string $key, mixed $value): array
    {
        if (strpos($key, '.') === false) {
            $array[$key] = $value;
            return $array;
        }

        $keys = explode('.', $key);
        $current = &$array;

        foreach ($keys as $k) {
            if (!isset($current[$k]) || !is_array($current[$k])) {
                $current[$k] = [];
            }
            $current = &$current[$k];
        }

        $current = $value;
        return $array;
    }

    /**
     * Filtrar array por claves whitelist
     * 
     * @param array<string, mixed> $array
     * @param array<string> $keys
     * @return array<string, mixed>
     */
    public static function only(array $array, array $keys): array
    {
        return array_intersect_key($array, array_flip($keys));
    }

    /**
     * Excluir claves de array
     * 
     * @param array<string, mixed> $array
     * @param array<string> $keys
     * @return array<string, mixed>
     */
    public static function except(array $array, array $keys): array
    {
        return array_diff_key($array, array_flip($keys));
    }

    /**
     * Convertir array a pares key=value para queries
     * 
     * @param array<string, mixed> $array
     * @return array<string>
     */
    public static function toQueryString(array $array): array
    {
        return array_map(fn($k, $v) => "$k=" . urlencode((string)$v), array_keys($array), $array);
    }

    /**
     * Agrupar array por clave
     * 
     * @param array<mixed> $array
     * @param string|callable $key
     * @return array<string, array<mixed>>
     */
    public static function groupBy(array $array, mixed $key): array
    {
        $result = [];
        
        foreach ($array as $item) {
            if (is_callable($key)) {
                $k = call_user_func($key, $item);
            } else {
                $k = is_array($item) ? $item[$key] ?? null : $item->$key ?? null;
            }
            
            if ($k !== null) {
                if (!isset($result[$k])) {
                    $result[$k] = [];
                }
                $result[$k][] = $item;
            }
        }

        return $result;
    }

    /**
     * Mapear array con clave
     * 
     * @param array<mixed> $array
     * @param string|callable $key
     * @return array<mixed>
     */
    public static function keyBy(array $array, mixed $key): array
    {
        $result = [];

        foreach ($array as $item) {
            if (is_callable($key)) {
                $k = call_user_func($key, $item);
            } else {
                $k = is_array($item) ? $item[$key] : $item->$key;
            }

            $result[$k] = $item;
        }

        return $result;
    }
}
