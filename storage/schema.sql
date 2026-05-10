-- Lemur CMS — Generated schema (do not edit manually)
-- Generated: 2026-05-10 22:20:45
-- Dialect: mysql

-- Migration: 20260510000001 create_menu_tables
CREATE TABLE IF NOT EXISTS `cms_menus` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `type` ENUM('main','footer','sidebar','mobile') NOT NULL DEFAULT 'main',
    `status` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `uq_menus_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_menu_items` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `menu_id` INT UNSIGNED NOT NULL,
    `parent_id` INT UNSIGNED NULL,
    `label` VARCHAR(200) NOT NULL,
    `url` VARCHAR(500) NULL,
    `type` ENUM('link','dropdown','mega','button','divider') NOT NULL DEFAULT 'link',
    `target` ENUM('_self','_blank') NOT NULL DEFAULT '_self',
    `icon` VARCHAR(100) NULL,
    `css_class` VARCHAR(200) NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `status` TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT `fk_menu_items_menu_id` FOREIGN KEY (`menu_id`) REFERENCES `cms_menus`(`id`) ON DELETE CASCADE,
    INDEX `idx_menu_items_parent` (`menu_id`, `parent_id`),
    INDEX `idx_menu_items_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_logos` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `site_name` VARCHAR(200) NOT NULL,
    `image_url` VARCHAR(500) NULL,
    `image_dark_url` VARCHAR(500) NULL,
    `image_mobile_url` VARCHAR(500) NULL,
    `alt_text` VARCHAR(200) NULL,
    `link_url` VARCHAR(500) NOT NULL DEFAULT '/',
    `width` SMALLINT NULL,
    `height` SMALLINT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_banners` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `menu_id` INT UNSIGNED NULL,
    `position` ENUM('above','below') NOT NULL DEFAULT 'above',
    `content` TEXT NOT NULL,
    `bg_color` VARCHAR(50) NULL,
    `text_color` VARCHAR(50) NULL,
    `link_url` VARCHAR(500) NULL,
    `link_text` VARCHAR(200) NULL,
    `is_closeable` TINYINT(1) NOT NULL DEFAULT 1,
    `start_at` DATETIME NULL,
    `end_at` DATETIME NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `status` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_banners_pos_status` (`position`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_mega_sections` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `menu_item_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(200) NULL,
    `col_span` TINYINT(1) NOT NULL DEFAULT 1,
    `sort_order` INT NOT NULL DEFAULT 0,
    CONSTRAINT `fk_mega_sections_menu_item_id` FOREIGN KEY (`menu_item_id`) REFERENCES `cms_menu_items`(`id`) ON DELETE CASCADE,
    INDEX `idx_mega_sections_item` (`menu_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_mega_links` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `section_id` INT UNSIGNED NOT NULL,
    `label` VARCHAR(200) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `description` VARCHAR(500) NULL,
    `icon` VARCHAR(100) NULL,
    `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
    `sort_order` INT NOT NULL DEFAULT 0,
    CONSTRAINT `fk_mega_links_section_id` FOREIGN KEY (`section_id`) REFERENCES `cms_mega_sections`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migration: 20260510000002 create_page_tables
CREATE TABLE IF NOT EXISTS `cms_pages` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(300) NOT NULL,
    `slug` VARCHAR(300) NOT NULL,
    `content` JSON NULL,
    `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
    `template` VARCHAR(100) NULL DEFAULT 'default',
    `sort_order` INT NOT NULL DEFAULT 0,
    `published_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `uq_pages_slug` (`slug`),
    INDEX `idx_pages_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migration: 20260510000003 create_seo_tables
CREATE TABLE IF NOT EXISTS `cms_seo` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `entity_type` VARCHAR(100) NOT NULL,
    `entity_id` INT UNSIGNED NOT NULL,
    `meta_title` VARCHAR(200) NULL,
    `meta_description` VARCHAR(500) NULL,
    `canonical_url` VARCHAR(500) NULL,
    `og_title` VARCHAR(200) NULL,
    `og_description` VARCHAR(500) NULL,
    `og_image` VARCHAR(500) NULL,
    `robots` VARCHAR(100) NULL DEFAULT 'index,follow',
    `schema_json` JSON NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `uq_seo_entity` (`entity_type`, `entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migration: 20260510000004 create_media_tables
CREATE TABLE IF NOT EXISTS `cms_media` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `disk` VARCHAR(50) NOT NULL DEFAULT 'local',
    `path` VARCHAR(500) NOT NULL,
    `filename` VARCHAR(300) NOT NULL,
    `mime_type` VARCHAR(100) NOT NULL,
    `size` BIGINT NOT NULL DEFAULT 0,
    `alt_text` VARCHAR(300) NULL,
    `title` VARCHAR(300) NULL,
    `conversions` JSON NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_media_mime` (`mime_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migration: 20260510000005 create_auth_tables
CREATE TABLE IF NOT EXISTS `cms_roles` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `uq_roles_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_permissions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `module` VARCHAR(100) NULL,
    UNIQUE INDEX `uq_permissions_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_role_permissions` (
    `role_id` INT UNSIGNED NOT NULL,
    `permission_id` INT UNSIGNED NOT NULL,
    CONSTRAINT `fk_role_permissions_role_id` FOREIGN KEY (`role_id`) REFERENCES `cms_roles`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_role_permissions_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `cms_permissions`(`id`) ON DELETE CASCADE,
    UNIQUE INDEX `uq_rp` (`role_id`, `permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(300) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `last_login_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE IF NOT EXISTS `cms_user_roles` (
    `user_id` INT UNSIGNED NOT NULL,
    `role_id` INT UNSIGNED NOT NULL,
    CONSTRAINT `fk_user_roles_user_id` FOREIGN KEY (`user_id`) REFERENCES `cms_users`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `cms_roles`(`id`) ON DELETE CASCADE,
    UNIQUE INDEX `uq_ur` (`user_id`, `role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
