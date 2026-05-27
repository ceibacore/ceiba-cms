<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\PageBuilder\Import\HtmlImporter;

final class ImportController extends BaseController
{
    public function importHtml(): void
    {
        try {
            $data = $this->getRequest();
            $html = $data['html'] ?? '';

            if (!is_string($html) || trim($html) === '') {
                $this->error('El campo html es requerido.', 422);
                return;
            }

            if (strlen($html) > 524288) {
                $this->error('El HTML excede el límite permitido de 512 KB.', 422);
                return;
            }

            $importer = new HtmlImporter();
            $result   = $importer->import($html, $data['options'] ?? []);

            $this->success($result->toArray(), 'HTML importado correctamente.');
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        } catch (\Exception $e) {
            $this->error('Error al procesar el HTML: ' . $e->getMessage());
        }
    }

    public function previewHtml(): void
    {
        // Preview behaves identically to import — no persistence
        $this->importHtml();
    }
}
