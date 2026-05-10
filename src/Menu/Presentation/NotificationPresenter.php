<?php

declare(strict_types=1);

namespace LemurCms\Menu\Presentation;

class NotificationPresenter
{
    /**
     * @var array<array<string, string>>
     */
    private array $notifications = [];

    private const TYPES = ['success', 'error', 'warning', 'info'];

    /**
     * @param array<string, mixed> $session Referencia a $_SESSION o equivalente
     */
    public function __construct(private array &$session = [])
    {
        $this->loadFromSession();
    }

    /**
     * Agregar notificación de éxito
     *
     * @param string $message Mensaje a mostrar
     * @param string|null $title Título (opcional)
     * @return self
     */
    public function success(string $message, ?string $title = null): self
    {
        return $this->add('success', $message, $title);
    }

    /**
     * Agregar notificación de error
     *
     * @param string $message Mensaje a mostrar
     * @param string|null $title Título (opcional)
     * @return self
     */
    public function error(string $message, ?string $title = null): self
    {
        return $this->add('error', $message, $title);
    }

    /**
     * Agregar notificación de advertencia
     *
     * @param string $message Mensaje a mostrar
     * @param string|null $title Título (opcional)
     * @return self
     */
    public function warning(string $message, ?string $title = null): self
    {
        return $this->add('warning', $message, $title);
    }

    /**
     * Agregar notificación de información
     *
     * @param string $message Mensaje a mostrar
     * @param string|null $title Título (opcional)
     * @return self
     */
    public function info(string $message, ?string $title = null): self
    {
        return $this->add('info', $message, $title);
    }

    /**
     * Agregar notificación genérica
     *
     * @param string $type success|error|warning|info
     * @param string $message Mensaje
     * @param string|null $title Título
     * @return self
     * @throws \InvalidArgumentException
     */
    public function add(string $type, string $message, ?string $title = null): self
    {
        if (!in_array($type, self::TYPES, true)) {
            throw new \InvalidArgumentException("Invalid notification type: $type");
        }

        $this->notifications[] = [
            'type' => $type,
            'title' => $title,
            'message' => $message,
        ];

        $this->saveToSession();

        return $this;
    }

    /**
     * Renderizar notificaciones como HTML (Bootstrap 5 alerts)
     *
     * @param bool $clear Limpiar después de renderizar (flash)
     * @return string HTML
     */
    public function render(bool $clear = true): string
    {
        if (empty($this->notifications)) {
            return '';
        }

        $html = implode('', array_map(fn($n) => $this->renderNotification($n), $this->notifications));

        if ($clear) {
            $this->clear();
        }

        return $html;
    }

    /**
     * Renderizar una notificación individual
     *
     * @param array<string, string|null> $notification
     * @return string HTML
     */
    private function renderNotification(array $notification): string
    {
        $type = htmlspecialchars($notification['type']);
        $message = htmlspecialchars($notification['message']);
        $title = $notification['title'] ? htmlspecialchars($notification['title']) : null;

        // Mapear tipo a clase Bootstrap
        $bootstrapClass = match ($type) {
            'success' => 'alert-success',
            'error' => 'alert-danger',
            'warning' => 'alert-warning',
            'info' => 'alert-info',
            default => 'alert-info',
        };

        $icon = match ($type) {
            'success' => 'bi bi-check-circle',
            'error' => 'bi bi-exclamation-circle',
            'warning' => 'bi bi-exclamation-triangle',
            'info' => 'bi bi-info-circle',
            default => 'bi bi-info-circle',
        };

        $titleHtml = $title ? sprintf('<strong>%s</strong><br>', $title) : '';

        return sprintf(
            '<div class="alert %s alert-dismissible fade show" role="alert"><i class="%s"></i> %s%s<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>',
            $bootstrapClass,
            $icon,
            $titleHtml,
            $message
        );
    }

    /**
     * Obtener todas las notificaciones
     *
     * @return array<array<string, string|null>>
     */
    public function all(): array
    {
        return $this->notifications;
    }

    /**
     * Obtener notificaciones por tipo
     *
     * @param string $type success|error|warning|info
     * @return array<array<string, string|null>>
     */
    public function ofType(string $type): array
    {
        return array_filter($this->notifications, fn($n) => $n['type'] === $type);
    }

    /**
     * Verificar si hay notificaciones de un tipo
     *
     * @param string $type success|error|warning|info
     * @return bool
     */
    public function hasType(string $type): bool
    {
        return count($this->ofType($type)) > 0;
    }

    /**
     * Contar notificaciones
     */
    public function count(): int
    {
        return count($this->notifications);
    }

    /**
     * Limpiar todas las notificaciones
     *
     * @return self
     */
    public function clear(): self
    {
        $this->notifications = [];
        $this->session['notifications'] = [];
        return $this;
    }

    /**
     * Cargar notificaciones desde sesión
     */
    private function loadFromSession(): void
    {
        $this->notifications = $this->session['notifications'] ?? [];
    }

    /**
     * Guardar notificaciones en sesión
     */
    private function saveToSession(): void
    {
        $this->session['notifications'] = $this->notifications;
    }
}
