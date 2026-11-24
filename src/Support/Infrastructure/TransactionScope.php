<?php

declare(strict_types=1);

namespace CeibaCms\Support\Infrastructure;

/** Runs an operation atomically, including when the caller already owns a transaction. */
final class TransactionScope
{
    private static int $sequence = 0;

    public static function run(\CeibaDB $db, callable $operation): mixed
    {
        $pdo = $db->pdo();
        if (!$pdo->inTransaction()) {
            return $db->transaction($operation);
        }
        $savepoint = 'cms_scope_' . ++self::$sequence;
        $pdo->exec('SAVEPOINT ' . $savepoint);
        try {
            $result = $operation();
            $pdo->exec('RELEASE SAVEPOINT ' . $savepoint);
            return $result;
        } catch (\Throwable $error) {
            $pdo->exec('ROLLBACK TO SAVEPOINT ' . $savepoint);
            $pdo->exec('RELEASE SAVEPOINT ' . $savepoint);
            throw $error;
        }
    }
}
