<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\PageBuilder\Domain\Contract\MailDelivery;
use LemurCms\PageBuilder\Domain\Document\HostContext;

final class NullMailDelivery implements MailDelivery
{
    /** @var list<array{context: HostContext, recipient: string, subject: string, textBody: string}> */
    private array $sent = [];

    public function send(HostContext $context, string $recipient, string $subject, string $textBody): void
    {
        $this->sent[] = [
            'context' => $context,
            'recipient' => $recipient,
            'subject' => $subject,
            'textBody' => $textBody,
        ];
    }

    /** @return list<array{context: HostContext, recipient: string, subject: string, textBody: string}> */
    public function getSent(): array
    {
        return $this->sent;
    }
}
