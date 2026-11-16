<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Infrastructure;

use CeibaCms\PageBuilder\Domain\Contract\MailDelivery;
use CeibaCms\PageBuilder\Domain\Document\HostContext;

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
