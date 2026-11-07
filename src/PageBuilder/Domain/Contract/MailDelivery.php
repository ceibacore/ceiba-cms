<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

interface MailDelivery
{
    public function send(HostContext $context, string $recipient, string $subject, string $textBody): void;
}
