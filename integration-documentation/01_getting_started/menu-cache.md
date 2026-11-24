# Menu cache storage

By default ceiba-cms stores menu cache files under its own `storage/cache/menus` directory. Hosts that install the package as a Composer dependency should set `CMS_MENU_CACHE_BASE` to a writable directory owned by the host application. The CMS creates a separate cache subtree for each `CMS_SITE_ID`, preventing menus from different sites from sharing cache entries.

For example, a Laravel host can pass `storage_path('framework/cache/ceiba-cms-menus')` when booting ceiba-cms. Provision that Laravel storage directory with permissions for the web process. Set `CMS_SITE_ID` explicitly for every site; when it is not supplied, the CMS uses `DB_NAME` as the identity.
