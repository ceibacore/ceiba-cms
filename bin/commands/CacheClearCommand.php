<?php

declare(strict_types=1);

namespace LemurCms\Commands;

class CacheClearCommand extends Command
{
    protected string $signature = 'cache:clear';
    protected string $description = 'Clear application cache';

    public function __construct(private \LemurCms\Menu\Presentation\LemurMenuCache $cache)
    {
    }

    public function handle(): int
    {
        $this->info('Clearing cache...');

        try {
            $this->cache->flush();
            $this->info('Cache cleared successfully');
            return 0;
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return 1;
        }
    }
}
