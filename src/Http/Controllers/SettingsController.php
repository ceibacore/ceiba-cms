<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\Settings\Domain\Repository\SettingsRepositoryInterface;

class SettingsController extends BaseController
{
    public function __construct(
        private readonly SettingsRepositoryInterface $settingsRepository
    ) {}

    public function index(): void
    {
        try {
            $settings = $this->settingsRepository->all();
            $this->success($settings, 'Settings retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function update(): void
    {
        try {
            $data = $this->getRequest();
            foreach ($data as $key => $value) {
                if (is_string($key)) {
                    $this->settingsRepository->set($key, $value !== null ? (string)$value : null);
                }
            }
            $this->success([], 'Settings updated');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
