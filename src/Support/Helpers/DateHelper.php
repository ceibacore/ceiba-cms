<?php

declare(strict_types=1);

namespace LemurCms\Support\Helpers;

class DateHelper
{
    private const ISO8601_FORMAT = 'Y-m-d\TH:i:sP';

    /**
     * Convertir DateTime a ISO8601 string
     */
    public static function toISO8601(\DateTime $date): string
    {
        return $date->format(self::ISO8601_FORMAT);
    }

    /**
     * Convertir ISO8601 string a DateTime
     */
    public static function fromISO8601(string $date): \DateTime
    {
        return \DateTime::createFromFormat(self::ISO8601_FORMAT, $date) ?: new \DateTime($date);
    }

    /**
     * Obtener fecha actual en formato MySQL
     */
    public static function now(): string
    {
        return date('Y-m-d H:i:s');
    }

    /**
     * Comparar dos fechas y retornar diferencia en días
     */
    public static function daysDifference(string $date1, string $date2): int
    {
        $dt1 = new \DateTime($date1);
        $dt2 = new \DateTime($date2);
        $diff = $dt1->diff($dt2);
        return (int) $diff->days;
    }

    /**
     * Verificar si fecha está en el futuro
     */
    public static function isFuture(string $date): bool
    {
        $dt = new \DateTime($date);
        return $dt > new \DateTime();
    }

    /**
     * Verificar si fecha está en el pasado
     */
    public static function isPast(string $date): bool
    {
        $dt = new \DateTime($date);
        return $dt < new \DateTime();
    }

    /**
     * Agregar días a una fecha
     */
    public static function addDays(string $date, int $days): string
    {
        $dt = new \DateTime($date);
        $dt->modify(sprintf('+%d days', $days));
        return $dt->format('Y-m-d H:i:s');
    }
}
