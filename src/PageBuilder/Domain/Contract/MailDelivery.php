<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Contract;

use CeibaCms\PageBuilder\Domain\Document\HostContext;

interface MailDelivery
{
    public function send(HostContext $context, string $recipient, string $subject, string $textBody): void;
}
