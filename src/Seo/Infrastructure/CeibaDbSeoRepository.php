<?php
declare(strict_types=1);
namespace CeibaCms\Seo\Infrastructure;
use CeibaCms\Seo\Domain\Repository\SeoRepositoryInterface;
use CeibaDB;
/**
 * CeibaDB adapter — concrete implementation of SeoRepositoryInterface.
 * Inject via constructor in your bootstrap.
 */
final class CeibaDbSeoRepository implements SeoRepositoryInterface
{
    public function __construct(private readonly \CeibaDB $db) {}

    public function findByEntity(string $entityType, string|int $entityId): ?array
    {
        return $this->db->query('seo')->where(['entity_type' => $entityType, 'entity_id' => $entityId])->first();
    }

    public function upsert(string $entityType, string|int $entityId, array $data): void
    {
        $existing = $this->findByEntity($entityType, $entityId);
        if ($existing) {
            $data['updated_at'] = date('Y-m-d H:i:s');
            $this->db->query('seo')->where(['id' => $existing['id']])->update($data);
        } else {
            $id = \CeibaCms\Support\Helpers\UuidHelper::v4();
            $this->db->query('seo')->insert(array_merge(['id' => $id, 'entity_type' => $entityType, 'entity_id' => $entityId, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')], $data));
        }
    }
}
