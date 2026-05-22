<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Routing\Application\ListReservedPaths;
use LemurCms\Routing\Application\AddReservedPath;
use LemurCms\Routing\Application\RemoveReservedPath;
use LemurCms\Routing\Domain\Service\ReservedPathChecker;

class ReservedPathController extends BaseController
{
    public function __construct(
        private readonly ListReservedPaths  $listReservedPaths,
        private readonly AddReservedPath    $addReservedPath,
        private readonly RemoveReservedPath $removeReservedPath,
        private readonly ReservedPathChecker $checker,
    ) {}

    public function index(): void
    {
        $dynamic = $this->listReservedPaths->execute();
        $static  = array_map(fn($p) => ['path' => $p, 'reason' => 'system', 'static' => true], $this->checker->staticPaths());
        $this->success(['static' => $static, 'dynamic' => $dynamic]);
    }

    public function store(): void
    {
        try {
            $data   = $this->getRequest();
            $path   = $data['path']   ?? '';
            $reason = $data['reason'] ?? '';
            $id     = $this->addReservedPath->execute($path, $reason);
            $this->success(['id' => $id], 'Reserved path added', 201);
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->removeReservedPath->execute($id);
            $this->success([], 'Reserved path removed');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
