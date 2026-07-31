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

    private array $sessionRef;

    /**
     * @param array|null $session Injectable session array (pass by reference for testability).
     *                            Defaults to $_SESSION when null.
     */
    public function __construct(?array &$session = null)
    {
        if ($session !== null) {
            $this->sessionRef = &$session;
        } else {
            if (!isset($_SESSION)) {
                $_SESSION = [];
            }
            $this->sessionRef = &$_SESSION;
        }
        $this->loadFromSession();
    }

    /**
     * Agregar notificación de éxito
     */
    public function success(string $message, ?string $title = null): self
    {
        return $this->add('success', $message, $title);
    }

    /**
     * Agregar notificación de error
     */
    public function error(string $message, ?string $title = null): self
    {
        return $this->add('error', $message, $title);
    }

    /**
     * Agregar notificación de advertencia
     */
    public function warning(string $message, ?string $title = null): self
    {
        return $this->add('warning', $message, $title);
    }

    /**
     * Agregar notificación de información
     */
    public function info(string $message, ?string $title = null): self
    {
        return $this->add('info', $message, $title);
    }

    /**
     * Agregar notificación genérica
     *
     * @throws \InvalidArgumentException
     */
    public function add(string $type, string $message, ?string $title = null): self
    {
        if (!in_array($type, self::TYPES, true)) {
            throw new \InvalidArgumentException("Invalid notification type: $type");
        }

        $this->notifications[] = [
            'type'    => $type,
            'title'   => $title,
            'message' => $message,
        ];

        $this->saveToSession();

        return $this;
    }

    /**
     * Renderizar notificaciones como HTML (Bootstrap 5 alerts)
     *
     * @param bool $clear Limpiar después de renderizar (flash)
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

    private function renderNotification(array $notification): string
    {
        $type    = htmlspecialchars($notification['type']);
        $message = htmlspecialchars($notification['message']);
        $title   = $notification['title'] ? htmlspecialchars($notification['title']) : null;

        $bootstrapClass = match ($type) {
            'success' => 'alert-success',
            'error'   => 'alert-danger',
            'warning' => 'alert-warning',
            'info'    => 'alert-info',
            default   => 'alert-info',
        };

        $icon = match ($type) {
            'success' => 'bi bi-check-circle',
            'error'   => 'bi bi-exclamation-circle',
            'warning' => 'bi bi-exclamation-triangle',
            'info'    => 'bi bi-info-circle',
            default   => 'bi bi-info-circle',
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
     * @return array<array<string, string|null>>
     */
    public function all(): array
    {
        return $this->notifications;
    }

    /**
     * @return array<array<string, string|null>>
     */
    public function ofType(string $type): array
    {
        return array_values(array_filter($this->notifications, fn($n) => $n['type'] === $type));
    }

    public function hasType(string $type): bool
    {
        return count($this->ofType($type)) > 0;
    }

    public function count(): int
    {
        return count($this->notifications);
    }

    public function clear(): self
    {
        $this->notifications = [];
        $this->sessionRef['notifications'] = [];
        return $this;
    }

    private function loadFromSession(): void
    {
        $this->notifications = $this->sessionRef['notifications'] ?? [];
    }

    private function saveToSession(): void
    {
        $this->sessionRef['notifications'] = $this->notifications;
    }
}
