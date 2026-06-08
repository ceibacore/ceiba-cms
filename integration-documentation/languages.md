# English Translations Catalog

This document lists all the English translations defined in the CMS seeder file: [SystemTranslationsSeeder.php](file:///d:/repositories/lemur-books-lms-2/lemur-cms/src/Seeders/SystemTranslationsSeeder.php).

## Group: `errors`

### Category: `menu`

| Key | Translation (EN) |
| :--- | :--- |
| `menu.missing_label` | Menu item label is required and must not be empty |
| `menu.missing_url` | Menu item URL is required |
| `menu.invalid_type` | Invalid menu item type &quot;{type}&quot;. Valid types: {valid_types} |
| `menu.missing_menu_slug` | Menu slug is required |
| `menu.missing_menu_name` | Menu name is required |
| `menu.duplicate_menu_slug` | Menu with slug &quot;{slug}&quot; already exists |

### Category: `permission`

| Key | Translation (EN) |
| :--- | :--- |
| `permission.denied` | Permission &quot;{permission}&quot; denied |
| `permission.role_not_found` | Role with ID {role_id} not found |
| `permission.missing_permission` | Permission &quot;{slug}&quot; does not exist |

### Category: `user`

| Key | Translation (EN) |
| :--- | :--- |
| `user.missing_email` | User email is required |
| `user.invalid_email` | Invalid email format: {email} |
| `user.missing_password` | User password is required |
| `user.weak_password` | Password must be at least 8 characters with uppercase, lowercase, and numbers |
| `user.email_exists` | User with email &quot;{email}&quot; already exists |
| `user.not_found` | User with ID {id} not found |
| `user.new_password_required` | New password is required |

### Category: `page`

| Key | Translation (EN) |
| :--- | :--- |
| `page.not_found_by_id` | Page with ID {id} not found |
| `page.not_found_by_slug` | Page with slug &quot;{slug}&quot; not found |
| `page.none_published` | No published pages found |
| `page.title_required` | Page title is required and must be a string |
| `page.title_max_length` | Page title must not exceed 255 characters |
| `page.slug_required` | Page slug is required and must be a string |
| `page.slug_format` | Page slug must contain only alphanumeric characters and hyphens |
| `page.content_required` | Page content is required |
| `page.content_invalid_tree` | Invalid page tree: {errors} |
| `page.content_malformed_json` | Page content is malformed JSON |
| `page.content_json_array_object` | Page content JSON must be an array or object |
| `page.content_invalid_format` | Page content must be a string or array |
| `page.status_invalid` | Invalid page status &quot;{status}&quot;. Valid: {valid_statuses} |
| `page.publish_title_required` | Page must have a title to be published |
| `page.publish_content_required` | Page must have content to be published |

### Category: `layout`

| Key | Translation (EN) |
| :--- | :--- |
| `layout.name_required` | Layout name is required and must be a string |
| `layout.name_max_length` | Layout name must not exceed 200 characters |
| `layout.menu_slug_string` | Layout menu_slug must be a string |
| `layout.menu_slug_max_length` | Layout menu_slug must not exceed 300 characters |
| `layout.palette_malformed_json` | Layout palette is malformed JSON |
| `layout.palette_decode_array` | Layout palette must decode to an array |
| `layout.palette_array_or_json` | Layout palette must be an array or JSON string |
| `layout.footer_tree_malformed_json` | Layout footer_tree is malformed JSON |
| `layout.footer_tree_array_or_json` | Layout footer_tree must be an array or JSON string |
| `layout.footer_tree_invalid` | Invalid layout footer_tree: {errors} |

### Category: `template`

| Key | Translation (EN) |
| :--- | :--- |
| `template.name_required` | Template name is required and must be a string |
| `template.name_max_length` | Template name must not exceed 200 characters |
| `template.tree_required` | Template tree is required |
| `template.tree_invalid` | Invalid template tree: {errors} |
| `template.tree_malformed_json` | Template tree is malformed JSON |
| `template.tree_json_array_object` | Template tree JSON must be an array or object |
| `template.tree_invalid_format` | Template tree must be a string or array |

### Category: `language`

| Key | Translation (EN) |
| :--- | :--- |
| `language.code_required` | Language code is required. |
| `language.label_required` | Language label is required. |
| `language.translations_array` | Translations must be an array. |

## Group: `messages`

### Category: `language`

| Key | Translation (EN) |
| :--- | :--- |
| `language.retrieved` | Languages retrieved |
| `language.created` | Language created |
| `language.updated` | Language updated |
| `language.deleted` | Language deleted |

### Category: `translation`

| Key | Translation (EN) |
| :--- | :--- |
| `translation.retrieved` | Translations retrieved |
| `translation.updated` | Translations updated |

### Category: `settings`

| Key | Translation (EN) |
| :--- | :--- |
| `settings.retrieved` | Settings retrieved |
| `settings.updated` | Settings updated |

### Category: `template`

| Key | Translation (EN) |
| :--- | :--- |
| `template.retrieved` | Templates retrieved |
| `template.saved` | Template saved |
| `template.deleted` | Template deleted |

### Category: `reserved_path`

| Key | Translation (EN) |
| :--- | :--- |
| `reserved_path.added` | Reserved path added |
| `reserved_path.removed` | Reserved path removed |

### Category: `cache`

| Key | Translation (EN) |
| :--- | :--- |
| `cache.cleared` | Cache cleared |
| `cache.menu_cleared` | Menu cache cleared for: {slug} |

## Group: `general`

### Category: `actions`

| Key | Translation (EN) |
| :--- | :--- |
| `actions.add` | Add |
| `actions.delete` | Delete |
| `actions.update` | Update |
| `actions.back` | Back |
| `actions.cancel` | Cancel |
| `actions.save` | Save |
| `actions.edit` | Edit |
| `actions.create` | Create |
| `actions.search` | Search |
| `actions.confirm` | Confirm |
| `actions.accept` | Accept |
| `actions.close` | Close |
| `actions.next` | Next |
| `actions.previous` | Previous |
| `actions.yes` | Yes |
| `actions.no` | No |
| `actions.clear` | Clear |
| `actions.filter` | Filter |
| `actions.upload` | Upload |
| `actions.download` | Download |
| `actions.show` | Show |
| `actions.hide` | Hide |

### Category: `labels`

| Key | Translation (EN) |
| :--- | :--- |
| `labels.name` | Name |
| `labels.description` | Description |
| `labels.status` | Status |
| `labels.active` | Active |
| `labels.inactive` | Inactive |
| `labels.date` | Date |
| `labels.all` | All |
| `labels.filters` | Filters |
| `labels.success` | Success |
| `labels.error` | Error |
| `labels.warning` | Warning |
| `labels.info` | Info |
| `labels.loading` | Loading... |
| `labels.saving` | Saving... |
| `labels.sending` | Sending... |
| `labels.actions` | Actions |

## Group: `dashboard`

### Category: `branding`

| Key | Translation (EN) |
| :--- | :--- |
| `branding.activar` | Activar |
| `branding.activar_como_logo` | Activate as main logo |
| `branding.alto_px` | Height (px) |
| `branding.ancho_px` | Width (px) |
| `branding.banner` | Banner |
| `branding.banner_eliminado_correctamente` | Banner deleted successfully |
| `branding.contenido_del_banner` | Banner content |
| `branding.crear_banner` | Create banner |
| `branding.crear_logo` | Create logo |
| `branding.desactivar` | Desactivar |
| `branding.editar_banner` | Edit banner |
| `branding.editar_logo` | Edit logo |
| `branding.eliminar_banner` | Delete banner |
| `branding.eliminar_logo` | Delete logo |
| `branding.fin_opcional` | End (optional) |
| `branding.guardando` | Guardando… |
| `branding.guardar_cambios` | Save changes |
| `branding.inicio_opcional` | Start (optional) |
| `branding.logo` | Logo |
| `branding.logo_de_mi` | My Company Logo |
| `branding.logo_eliminado_correctamente` | Logo deleted successfully |
| `branding.mi_empresa` | My Company |
| `branding.no_hay_banners` | No banners configured. |
| `branding.no_hay_logos` | No logos. Create one to start. |
| `branding.nombre_del_sitio` | Site name |
| `branding.nuevo_banner` | New banner |
| `branding.nuevo_logo` | New logo |
| `branding.orden` | Orden |
| `branding.permite_cerrar` | Allows closing |
| `branding.posicin` | Position |
| `branding.se_puede_cerrar` | Can be closed |
| `branding.sin_imagen` | No image |
| `branding.texto_alternativo_alt` | Alternative text (alt) |
| `branding.texto_del_enlace` | Link text |
| `branding.url_del_enlace` | Link URL |
| `branding.url_imagen_dark` | Dark image URL |
| `branding.url_imagen_mobile` | Mobile image URL |
| `branding.url_imagen_principal` | Main image URL |
| `branding.ver_oferta` | View offer |
| `branding.vista_previa_del` | Banner preview... |
| `branding.eliminar_este_banner` | Delete this banner? |
| `branding.eliminar_este_logo` | Delete this logo? |
| `branding.arriba` | ▲ Arriba |
| `branding.encima_del_men` | ▲ Above menu |
| `branding.abajo` | ▼ Abajo |
| `branding.debajo_del_men` | ▼ Below menu |
| `branding.activo` | ✓ Activo |
| `branding.versin_dark_disponible` | 🌙 Dark version available |
| `branding.oferta_especial_20` | 🎉 Special offer: 20% discount this weekend |
| `branding.branding__logos` | 🎨 Branding — Logos &amp;amp; Banners |
| `branding.banners` | 📢 Banners |
| `branding.logos` | 🖼️ Logos |

### Category: `dashboard`

| Key | Translation (EN) |
| :--- | :--- |
| `dashboard.archivos_media` | Media files |
| `dashboard.banners_activos` | Active banners |
| `dashboard.borradores` | Drafts |
| `dashboard.cms__panel` | CMS — Admin Panel |
| `dashboard.gestiona_la_estructura` | Manage the structure, design, and semantic tags of your website. |
| `dashboard.items_de_men` | Menu items |
| `dashboard.limpiar_cach_cms` | Clear CMS cache |
| `dashboard.logos_activos` | Active logos |
| `dashboard.mens` | Menús |
| `dashboard.publicadas` | Publicadas |
| `dashboard.pginas_totales` | Total pages |
| `dashboard.rutas_bloqueadas` | Blocked paths |
| `dashboard.limpiar_toda_la` | Clear all CMS cache? Menus will regenerate on next access. |

### Category: `tags`

| Key | Translation (EN) |
| :--- | :--- |
| `tags.category.structure` | Structure |
| `tags.category.advanced_structure` | Advanced Structure |
| `tags.category.text` | Text |
| `tags.category.inline` | Inline Formatting |
| `tags.category.list` | List |
| `tags.category.media` | Media |
| `tags.category.table` | Table |
| `tags.category.form` | Form |
| `tags.category.advanced_form` | Advanced Form |
| `tags.category.interactive` | Interactive |
| `tags.label_div` | Division |
| `tags.label_section` | Section |
| `tags.label_header` | Header |
| `tags.label_footer` | Footer |
| `tags.label_h1` | Heading 1 |
| `tags.label_h2` | Heading 2 |
| `tags.label_h3` | Heading 3 |
| `tags.label_h4` | Heading 4 |
| `tags.label_h5` | Heading 5 |
| `tags.label_h6` | Heading 6 |
| `tags.label_p` | Paragraph |
| `tags.label_blockquote` | Blockquote |
| `tags.label_ul` | Unordered List |
| `tags.label_ol` | Ordered List |
| `tags.label_li` | List Item |
| `tags.label_img` | Image |
| `tags.label_video` | Video |
| `tags.label_audio` | Audio |
| `tags.label_iframe` | Iframe |
| `tags.label_form` | Form |
| `tags.label_input` | Input Field |
| `tags.label_textarea` | Textarea |
| `tags.label_select` | Select Dropdown |
| `tags.label` | Label |
| `tags.label_submit` | Submit Button |
| `tags.label_main` | Main Content |
| `tags.label_article` | Article |
| `tags.label_aside` | Sidebar |
| `tags.label_nav` | Navigation |
| `tags.label_table` | Table |
| `tags.label_thead` | Table Head |
| `tags.label_tbody` | Table Body |
| `tags.label_tr` | Table Row |
| `tags.label_th` | Header Cell |
| `tags.label_td` | Data Cell |
| `tags.label_option` | Option |
| `tags.label_optgroup` | Option Group |
| `tags.label_fieldset` | Fieldset |
| `tags.label_legend` | Legend |
| `tags.label_details` | Details Accordion |
| `tags.label_summary` | Summary |
| `tags.label_dialog` | Dialog Modal |
| `tags.label_link` | Link |
| `tags.label_span` | Span |
| `tags.label_icon` | Icon |
| `tags.label_hr` | Horizontal Rule |

### Category: `dynamicmoduleform`

| Key | Translation (EN) |
| :--- | :--- |
| `dynamicmoduleform.seleccionar` | -- Select -- |
| `dynamicmoduleform.seleccionar_relacin` | -- Select Relation -- |
| `dynamicmoduleform.aaaammdd_hhmmss_ej` | YYYY-MM-DD HH:MM:SS (ex. 2026-05-22 14:30:00) |
| `dynamicmoduleform.editar_registro` | Edit Record |
| `dynamicmoduleform.error_en_el` | Server Error: |
| `dynamicmoduleform.escribe_aqu` | Write here... |
| `dynamicmoduleform.escribe_el_contenido` | Write content here... |
| `dynamicmoduleform.guardar_registro` | Save Record |
| `dynamicmoduleform.ingrese_en_formato` | Enter in format YYYY-MM-DD HH:MM:SS |
| `dynamicmoduleform.listado` | List |
| `dynamicmoduleform.nuevo_registro` | New Record |
| `dynamicmoduleform.rellena_los_campos` | Fill in the fields defined in the module schema. |
| `dynamicmoduleform.vista_previa` | Preview |
| `dynamicmoduleform.biblioteca` | 🖼️ Library |
| `dynamicmoduleform.seleccionar_de_biblioteca` | 🖼️ Select from Media Library |

### Category: `dynamicmoduleindex`

| Key | Translation (EN) |
| :--- | :--- |
| `dynamicmoduleindex.agregar_primer_registro` | Add first record |
| `dynamicmoduleindex.buscar_en_campos` | Search in indexed fields... |
| `dynamicmoduleindex.creado` | Creado |
| `dynamicmoduleindex.no_se_ha` | No records have been added to this dynamic module. |
| `dynamicmoduleindex.schemas` | Schemas |
| `dynamicmoduleindex.sin_asignar` | Unassigned |
| `dynamicmoduleindex.sin_registros_an` | No records yet |
| `dynamicmoduleindex.eliminar_este_registro` | Delete this content record? |

### Category: `layouteditor`

| Key | Translation (EN) |
| :--- | :--- |
| `layouteditor.agrega_hojas_de` | Add linked stylesheets, fonts, or external scripts for this layout (ex. alternative Bootstrap, Google Fonts, FontAwesome). If left empty, default Bootstrap 5.3 CDN will be used. |
| `layouteditor.cdns_y_recursos` | CDNs &amp; External Resources |
| `layouteditor.datos_del_layout` | Layout data |
| `layouteditor.define_variables_css` | Define custom CSS variables. Ex: |
| `layouteditor.descripcin_opcional` | Optional description |
| `layouteditor.ej_landing_con` | Ex: Landing with nav and footer |
| `layouteditor.eliminar_fila` | Delete row |
| `layouteditor.footer_page_builder` | Footer (Page Builder) |
| `layouteditor.guardar_layout` | Save layout |
| `layouteditor.men_de_navegacin` | Navigation menu |
| `layouteditor.nuevo_layout` | New layout |
| `layouteditor.paleta_de_colores` | Color palette |
| `layouteditor.recursos_en_body` | Body Resources (Scripts) |
| `layouteditor.se_inyecta_antes` | Injected before the closing of |
| `layouteditor.usar_paleta_del` | Use system palette (Bootswatch) |
| `layouteditor.variable` | Variable |
| `layouteditor.sin_men` | — No menu — |

### Category: `layouts`

| Key | Translation (EN) |
| :--- | :--- |
| `layouts.crear_el_primero` | Create the first one |
| `layouts.eliminar_layout` | Eliminar layout |
| `layouts.footer` | Footer |
| `layouts.layout_eliminado_correctamente` | Layout eliminado correctamente |
| `layouts.layouts_cms` | Layouts CMS |
| `layouts.men` | Menú |
| `layouts.paleta` | Paleta |
| `layouts.personalizada` | Personalizada |
| `layouts.sin_layouts` | No layouts. |
| `layouts.sistema` | System |

### Category: `localization`

| Key | Translation (EN) |
| :--- | :--- |
| `localization.activar_idioma` | Activate language |
| `localization.buscar_por_clave` | Search by key or translated text... |
| `localization.cms__localizacin` | CMS — Localization &amp; Translations |
| `localization.cargando_traducciones` | Loading translations... |
| `localization.clave_key` | Key |
| `localization.clona_todas_las` | Clone all translations from the selected language to start quickly. |
| `localization.copiar_claves_base` | Copy base keys from |
| `localization.cdigo` | Código |
| `localization.cdigo_iso` | ISO Code |
| `localization.cdigo_iso_ej` | ISO Code (Ex: &#039;es&#039;, &#039;en&#039;, &#039;fr&#039;) |
| `localization.desactivar_idioma` | Deactivate language |
| `localization.edita_las_claves` | Edit the translation keys of the platform. Cache will be automatically invalidated on save. |
| `localization.editar_idioma` | Edit Language |
| `localization.el_idioma_predeterminado` | The default language must remain active. |
| `localization.error_al_actualizar` | Error updating language. |
| `localization.error_al_cargar` | Error loading translations. |
| `localization.error_al_crear` | Error creating language. |
| `localization.error_al_eliminar` | Error deleting language. |
| `localization.error_al_guardar` | Error saving. |
| `localization.error_de_red` | Network error saving translations. |
| `localization.escribe_la_traduccin` | Write translation... |
| `localization.establecer` | Set |
| `localization.establecer_como_idioma` | Set as default language |
| `localization.estado_activo` | Status (Active) |
| `localization.estado_del_idioma` | Language status updated. |
| `localization.franais` | Français |
| `localization.gestiona_los_idiomas` | Manage active languages of the platform and edit cached translation dictionaries. |
| `localization.grupo` | Group |
| `localization.habilitar_idioma` | Enable language |
| `localization.habilitar_idioma_de` | Enable language immediately |
| `localization.idioma` | Language |
| `localization.idioma_actualizado_correctamente` | Language updated successfully. |
| `localization.idioma_creado_correctamente` | Language created successfully. |
| `localization.idioma_eliminado_correctamente` | Language deleted successfully. |
| `localization.idiomas` | Languages |
| `localization.no_hay_idiomas` | No languages registered in the database. |
| `localization.no_puedes_eliminar` | You cannot delete the system default language. |
| `localization.no_se_encontraron` | No translation keys found for the applied filters. |
| `localization.nombre_del_idioma` | Language name (Label) |
| `localization.predeterminado` | Default |
| `localization.registrar` | Register |
| `localization.registrar_idioma` | Register Language |
| `localization.registrar_nuevo_idioma` | Register new language |
| `localization.todos_los_grupos` | All groups |
| `localization.traducciones_actualizadas_e` | Translations updated and cache invalidated. |
| `localization.traduccin_valor` | Translation (Value) |
| `localization.traducir` | Translate |
| `localization.volver_a_idiomas` | Back to Translations |
| `localization.volver_al_cms` | Volver al CMS |
| `localization.no_duplicar_vaco` | — Do not duplicate (Empty) — |
| `localization.o_fr` | 🇫🇷 o fr |

### Category: `media`

| Key | Translation (EN) |
| :--- | :--- |
| `media.archivo_eliminado` | File deleted. |
| `media.arrastra_imgenes_aqu` | Drag images here or |
| `media.biblioteca_de_media` | Media library |
| `media.buscar_por_nombre` | Search by name or alt text... |
| `media.copiar_url` | Copy URL |
| `media.eliminar_archivo` | Delete file |
| `media.error_al_eliminar` | Error deleting file. |
| `media.error_al_subir` | Error uploading |
| `media.fallo_de_red` | Network failure uploading |
| `media.jpg_png_gif` | JPG, PNG, GIF, WebP, SVG — Max 8 MB per file |
| `media.manejador` | Manager |
| `media.no_hay_archivos` | No files. Upload an image to start. |
| `media.zona_de_subida` | File upload zone |
| `media.eliminar_este_archivo` | Delete this file? It cannot be undone. |
| `media.url` | ⎘ URL |
| `media.copiado` | ✓ Copiado |
| `media.upload_success` | file(s) uploaded successfully. |
| `media.uploading` | Uploading... |

### Category: `menuitems`

| Key | Translation (EN) |
| :--- | :--- |
| `menuitems.editar_item` | Edit item |
| `menuitems.eliminar_item` | Delete item |
| `menuitems.etiqueta` | Label |
| `menuitems.inicio` | Home |
| `menuitems.item_eliminado_correctamente` | Item deleted successfully |
| `menuitems.misma_pestaa` | Same tab |
| `menuitems.no_hay_items` | No items. |
| `menuitems.nueva_pestaa` | New tab |
| `menuitems.nuevo_item` | New item |
| `menuitems.target` | Target |
| `menuitems.url` | URL |

### Category: `menus`

| Key | Translation (EN) |
| :--- | :--- |
| `menus.eliminar_men` | Delete menu |
| `menus.gestionar_items` | Manage items |
| `menus.items` | Items |
| `menus.men_eliminado_correctamente` | Menu deleted successfully |
| `menus.men_principal` | Main menu |
| `menus.mens_cms` | Menus CMS |
| `menus.mobile` | Mobile |
| `menus.nfd` | NFD |
| `menus.nuevo_men` | Nuevo menú |
| `menus.principal` | Principal |
| `menus.sidebar` | Sidebar |
| `menus.tipo` | Type |

### Category: `modulebuilder`

| Key | Translation (EN) |
| :--- | :--- |
| `modulebuilder.0_campos` | 0 campo(s) |
| `modulebuilder.campos` | Fields |
| `modulebuilder.contenido` | Content |
| `modulebuilder.crear_mdulo` | Create Module |
| `modulebuilder.editar_esquema` | Edit Schema |
| `modulebuilder.eliminar_mdulo` | Delete module |
| `modulebuilder.icono` | Icon |
| `modulebuilder.mdulo` | Module |
| `modulebuilder.mdulo_eliminado_correctamente` | Module deleted successfully |
| `modulebuilder.mdulos_dinmicos` | Dynamic Modules |
| `modulebuilder.no_hay_mdulos` | No dynamic modules defined |
| `modulebuilder.sin_descripcin` | Sin descripción |

### Category: `modulebuilderedit`

| Key | Translation (EN) |
| :--- | :--- |
| `modulebuilderedit.buscable` | Searchable |
| `modulebuilderedit.cms_esttico` | Static CMS |
| `modulebuilderedit.campo` | Field |
| `modulebuilderedit.crear_mdulo_dinmico` | Create Dynamic Module |
| `modulebuilderedit.define_el_esquema` | Define the schema, fields, and relations for a new content type. |
| `modulebuilderedit.detalle_el_propsito` | Detail the purpose of this content... |
| `modulebuilderedit.editar_mdulo_dinmico` | Edit Dynamic Module |
| `modulebuilderedit.editor_enriquecido_html` | Rich Editor (HTML) |
| `modulebuilderedit.ej_preguntas_frecuentes` | Ej. Preguntas Frecuentes, Banners, Libros |
| `modulebuilderedit.el_mdulo_debe` | The module must have at least one field. |
| `modulebuilderedit.eliminar_campo` | Delete field |
| `modulebuilderedit.etiqueta_visual` | Visual Label |
| `modulebuilderedit.fecha_y_hora` | Date &amp; Time |
| `modulebuilderedit.guardar_mdulo` | Save Module |
| `modulebuilderedit.icono_emoji` | Icon (Emoji) |
| `modulebuilderedit.ingresa_el_formato` | Enter format |
| `modulebuilderedit.lista_de_seleccin` | Lista de Selección (Dropdown) |
| `modulebuilderedit.longitud_mxima` | Maximum Length |
| `modulebuilderedit.mdulos_dinmicos_activos` | Active Dynamic Modules |
| `modulebuilderedit.nombre_columna_bd` | Column Name (DB) |
| `modulebuilderedit.nombre_del_mdulo` | Module Name |
| `modulebuilderedit.nmero_decimal` | Decimal Number |
| `modulebuilderedit.nmero_entero` | Integer Number |
| `modulebuilderedit.orden_en_el` | Menu Order |
| `modulebuilderedit.otro_campo` | Another field |
| `modulebuilderedit.pginas_cms_pages` | CMS Pages (pages) |
| `modulebuilderedit.relacin_con_otro` | Relation to another Module |
| `modulebuilderedit.requerido` | Required |
| `modulebuilderedit.slug_nombre_de` | Slug (Table Name) |
| `modulebuilderedit.solo_letras_minsculas` | Lowercase letters, numbers, and underscores only. |
| `modulebuilderedit.texto_corto_varchar` | Short Text (Varchar) |
| `modulebuilderedit.texto_largo_text` | Long Text (Text) |
| `modulebuilderedit.texto_visible_en` | Text visible on forms |
| `modulebuilderedit.tipo_de_campo` | Field Type |
| `modulebuilderedit.valor` | Valor |
| `modulebuilderedit.clave_valor` | clave: Valor |
| `modulebuilderedit.ej_precio_de` | ej. Precio de Lanzamiento |
| `modulebuilderedit.ej_preciolanzamiento` | ej. precio_lanzamiento |
| `modulebuilderedit.min3_url_email` | min:3, url, email |
| `modulebuilderedit.configuracin_general` | ⚙️ General Settings |
| `modulebuilderedit.destino_de_la` | 🎯 Relation Destination |
| `modulebuilderedit.recomendaciones` | 💡 Recommendations |
| `modulebuilderedit.campos_del_mdulo` | 🗂️ Module Fields |

### Category: `pageeditorbuilder`

| Key | Translation (EN) |
| :--- | :--- |
| `pageeditorbuilder.archivado` | Archived |
| `pageeditorbuilder.borrador` | Draft |
| `pageeditorbuilder.editar_pgina` | Editar página |
| `pageeditorbuilder.layout` | Layout |
| `pageeditorbuilder.mi_pgina` | Mi página |
| `pageeditorbuilder.mximo_3_niveles` | Máximo 3 niveles |
| `pageeditorbuilder.nueva_pgina_page` | New page (Page Builder) |
| `pageeditorbuilder.profundidad` | Depth: |
| `pageeditorbuilder.publicado` | Published |
| `pageeditorbuilder.si_no_se` | If not selected, default active layout will be used. |
| `pageeditorbuilder.sobrescribe_el_men` | Overrides the menu defined in the layout. |
| `pageeditorbuilder.ttulo` | Título |
| `pageeditorbuilder.volver` | Back |
| `pageeditorbuilder.layout_predeterminado` | — Default layout — |
| `pageeditorbuilder.men_del_layout` | — Menú del layout — |

### Category: `pageeditorstatic`

| Key | Translation (EN) |
| :--- | :--- |
| `pageeditorstatic.contenido_html` | Content (HTML) |
| `pageeditorstatic.crear_pgina_esttica` | Create static page |
| `pageeditorstatic.cdigo_personalizado` | Custom Code |
| `pageeditorstatic.escribe_el_contenido` | Escribe el contenido de la página aquí... |
| `pageeditorstatic.mi_pgina_esttica` | Mi página estática |
| `pageeditorstatic.nueva_pgina_clsica` | New page (Classic) |
| `pageeditorstatic.seo__metadatos` | SEO &amp; Metadata |
| `pageeditorstatic.template` | Template |
| `pageeditorstatic.vista_previa` | 👁 Vista previa |

### Category: `pages`

| Key | Translation (EN) |
| :--- | :--- |
| `pages.archivadas` | Archived |
| `pages.avanzada_page_builder` | Advanced (Page Builder) |
| `pages.buscar_por_ttulo` | Search by title or slug... |
| `pages.clsica_texto_enriquecido` | Classic (Rich Text) |
| `pages.eliminar_pgina` | Eliminar página |
| `pages.listado_y_administracin` | Listado y administración de las páginas dinámicas y de texto enriquecido. |
| `pages.media` | Media |
| `pages.nueva_pgina` | New Page |
| `pages.preview` | Preview |
| `pages.publicar` | Publish |
| `pages.pgina_eliminada_correctamente` | Page deleted successfully |
| `pages.pginas_cms` | CMS Pages |
| `pages.todos_los_estados` | All statuses |
| `pages.eliminar_esta_pgina` | Delete this page? This action is irreversible. |
| `pages.publicar_esta_pgina` | Publish this page? |

### Category: `reservedpaths`

| Key | Translation (EN) |
| :--- | :--- |
| `reservedpaths.accin` | Action |
| `reservedpaths.aadir` | Add |
| `reservedpaths.path` | Path |
| `reservedpaths.personalizadas` | Custom |
| `reservedpaths.razn` | Reason |
| `reservedpaths.razn_opcional` | Reason (optional) |
| `reservedpaths.rutas_restringidas` | Restricted Paths |
| `reservedpaths.rutas_bloqueadas_por` | Paths blocked by administrator |
| `reservedpaths.rutas_protegidas_por` | Protected paths by default |
| `reservedpaths.sin_rutas_personalizadas` | No custom paths. |

### Category: `settings`

| Key | Translation (EN) |
| :--- | :--- |
| `settings.bloquear_completamente_noindexnofollow` | Block Completely (noindex,nofollow) |
| `settings.cdns_globales` | Global CDNs |
| `settings.cdns_y_recursos` | Global CDNs &amp; Resources: |
| `settings.cms__configuracin` | CMS — Global Settings |
| `settings.css_global` | Global CSS |
| `settings.compartir_en_redes` | Social Share (OpenGraph) |
| `settings.configura_los_enlaces` | Configure default CDN links (ex. Bootstrap, FontAwesome, Google Fonts) for the whole site. If a layout does not define its own CDNs, it will inherit these values. If both are empty, default Bootstrap 5.3 will apply. |
| `settings.configuracin` | Configuración |
| `settings.configuracin_seo_global` | Global SEO Settings: |
| `settings.configuracin_global_guardada` | Global configuration saved successfully. |
| `settings.cdigo_de_idioma` | Language code (ex. |
| `settings.define_los_valores` | Define default values to be used as fallback if a page does not have its own SEO metadata defined, as well as the main site language. |
| `settings.descripcin_seo_global` | Global SEO Description |
| `settings.descripcin_general_de` | General description of my website... |
| `settings.directiva_robots_global` | Global Robots Directive |
| `settings.error_al_guardar` | Error saving configuration. |
| `settings.este_cdigo_se` | This code is injected before the closing of the tag |
| `settings.idioma_principal_del` | Main Site Language (HTML lang) |
| `settings.imagen_opengraph_global` | Global OpenGraph Image |
| `settings.imagen_por_defecto` | Default image when sharing links if the page does not specify one. |
| `settings.indexar_pero_no` | Index but Do Not Follow links (index,nofollow) |
| `settings.indexar_y_seguir` | Index and Follow links (index,follow) |
| `settings.js_global` | Global JS |
| `settings.meta_descripcin_predeterminada` | Default meta description for organic search engine positioning. |
| `settings.metadatos_de_bsqueda` | Search Metadata |
| `settings.mi_sitio_web` | My Website |
| `settings.no_indexar_pero` | Do Not Index but Follow links (noindex,follow) |
| `settings.recursos_body_globales` | Global Body Resources (Scripts) |
| `settings.seo_global_e` | Global SEO &amp; Language |
| `settings.seleccionar` | Seleccionar |
| `settings.ttulo_seo_global` | Global SEO Title |
| `settings.ttulo_por_defecto` | Default title for search engine tabs. |
| `settings.vista_previa_opengraph` | Global OpenGraph preview |
| `settings.en_todas_las` | on all public CMS pages. Ideal for analytics, third-party scripts, or global behaviors. |
| `settings.biblioteca_de_media` | 🖼️ Biblioteca de Media |
| `settings.css_info` | This code is injected inside the &lt;head&gt; tag on all public CMS pages. Ideal for global styles, typography, and component overrides. |
| `settings.recursos_head_globales` | Global Head Resources (CSS/JS) |
| `settings.title` | CMS — General Settings |
| `settings.subtitle` | Configure core CMS engine parameters, global SEO, and code injection. |
| `settings.tabs.general` | Site Info |
| `settings.tabs.seo` | Global SEO |
| `settings.tabs.code` | Scripts &amp; CSS |
| `settings.general.site_title` | Site Title |
| `settings.general.site_description` | Site Description |
| `settings.general.default_language` | Default Language |
| `settings.seo.meta_title` | Global Meta Title |
| `settings.seo.meta_description` | Global Meta Description |
| `settings.seo.robots` | Robots (Global Directive) |
| `settings.code.head_inject` | Head Code Injection |
| `settings.code.body_inject` | Body Code Injection |
| `settings.toast.success` | Configuration changes have been saved. |

---

## Group: `auth`

### Category: `confirmpassword`

| Key | Translation (EN) |
| :--- | :--- |
| `confirmpassword.title` | Confirm password |
| `confirmpassword.description` | Please confirm your password before continuing. |
| `confirmpassword.password` | Password |
| `confirmpassword.confirm` | Confirm |

### Category: `forgotpassword`

| Key | Translation (EN) |
| :--- | :--- |
| `forgotpassword.title` | Recover password |
| `forgotpassword.description` | Enter your email and we will send you a link to reset your password. |
| `forgotpassword.email` | Email address |
| `forgotpassword.email_placeholder` | email@example.com |
| `forgotpassword.send_link` | Send link |
| `forgotpassword.back_to_login` | Back to login |

### Category: `login`

| Key | Translation (EN) |
| :--- | :--- |
| `login.title` | Sign in |
| `login.email` | Email address |
| `login.email_placeholder` | email@example.com |
| `login.password` | Password |
| `login.password_placeholder` | Password |
| `login.forgot_password` | Forgot your password? |
| `login.show` | Show |
| `login.hide` | Hide |
| `login.remember_me` | Remember me |
| `login.sign_in` | Sign in |
| `login.no_account` | Don't have an account? |
| `login.register` | Register |

### Category: `register`

| Key | Translation (EN) |
| :--- | :--- |
| `register.title` | Create account |
| `register.full_name` | Full name |
| `register.name_placeholder` | Your name |
| `register.email` | Email address |
| `register.email_placeholder` | email@example.com |
| `register.password` | Password |
| `register.confirm_password` | Confirm password |
| `register.create_account` | Create account |
| `register.already_have_account` | Already have an account? |
| `register.sign_in` | Sign in |

### Category: `resetpassword`

| Key | Translation (EN) |
| :--- | :--- |
| `resetpassword.title` | New password |
| `resetpassword.email` | Email address |
| `resetpassword.new_password` | New password |
| `resetpassword.confirm_password` | Confirm password |
| `resetpassword.reset_password` | Reset password |

### Category: `twofactorchallenge`

| Key | Translation (EN) |
| :--- | :--- |
| `twofactorchallenge.title` | Two-factor verification |
| `twofactorchallenge.use_recovery_description` | Enter one of your emergency recovery codes. |
| `twofactorchallenge.use_code_description` | Enter the code from your authentication app. |
| `twofactorchallenge.auth_code` | Authentication code |
| `twofactorchallenge.recovery_code` | Recovery code |
| `twofactorchallenge.verify` | Verify |
| `twofactorchallenge.use_auth_code` | Use authentication code |
| `twofactorchallenge.use_recovery_code` | Use recovery code |

### Category: `verifyemail`

| Key | Translation (EN) |
| :--- | :--- |
| `verifyemail.title` | Email verification |
| `verifyemail.verification_sent` | A new verification link has been sent to the email address you provided during registration. |
| `verifyemail.resend` | Resend verification email |
| `verifyemail.logout` | Log out |

---

## Group: `billing`

### Category: `index`

| Key | Translation (EN) |
| :--- | :--- |
| `index.title` | Billing & Subscription |
| `index.current_subscription` | Current Subscription |
| `index.active` | Active |
| `index.standard_plan` | Standard Plan |
| `index.subscription_id` | Subscription ID |
| `index.next_charge` | Next charge |
| `index.payment_method` | Payment method |
| `index.pause` | Pause |
| `index.cancel` | Cancel |
| `index.no_active_subscription` | You do not have an active subscription. |
| `index.choose_plan` | Choose a Plan |
| `index.payment_history` | Payment History |
| `index.col_date` | Date |
| `index.col_concept` | Concept |
| `index.col_amount` | Amount |
| `index.col_status` | Status |
| `index.col_action` | Action |
| `index.subscription_payment` | Subscription payment |
| `index.status_paid` | Paid |
| `index.status_issued` | Issued |
| `index.status_draft` | Draft |
| `index.status_void` | Void |
| `index.status_uncollectible` | Uncollectible |
| `index.action_view_details` | View Details |
| `index.action_download_pdf` | Download PDF |
| `index.cancel_title` | Cancel Subscription |
| `index.cancel_description` | Choose how you want to proceed with your cancellation: |
| `index.cancel_eop_title` | At the end of the period |
| `index.cancel_eop_desc` | You will retain access until the end of your current period. |
| `index.cancel_imm_title` | Immediately |
| `index.cancel_imm_desc` | The licence will be revoked immediately. |
| `index.cancel_warning` | Warning: This action is irreversible. To confirm, write |
| `index.cancel_word` | CANCEL |
| `index.cancel_word_now` | CANCEL NOW |
| `index.cancel_placeholder` | Type the security word... |
| `index.confirm` | Confirm |
| `index.pause_title` | Pause Subscription |
| `index.pause_description` | Pausing your subscription will stop automatic charges but your licence will no longer be valid until you resume it. |
| `index.pause_warning` | Type PAUSE to confirm this action. |
| `index.pause_word` | PAUSE |

### Category: `invoices`

| Key | Translation (EN) |
| :--- | :--- |
| `invoices.title` | Invoice History |
| `invoices.back_to_billing` | ← Billing |
| `invoices.col_date` | Date |
| `invoices.col_concept` | Concept |
| `invoices.col_amount` | Amount |
| `invoices.col_status` | Status |
| `invoices.col_actions` | Actions |
| `invoices.status_paid` | Paid |
| `invoices.status_pending` | Pending |
| `invoices.action_view_details` | View Details |
| `invoices.action_download_pdf` | Download PDF |

### Category: `invoice_detail`

| Key | Translation (EN) |
| :--- | :--- |
| `invoice_detail.title` | Invoice Detail |
| `invoice_detail.back` | Back |
| `invoice_detail.invoice_number` | Invoice # |
| `invoice_detail.status_paid` | Paid |
| `invoice_detail.status_pending` | Pending |
| `invoice_detail.concept` | Concept |
| `invoice_detail.subscription_payment` | Subscription Payment |
| `invoice_detail.plan_prefix` | Plan: |
| `invoice_detail.subscription_period` | Subscription Period |
| `invoice_detail.invoice_id` | Invoice ID |
| `invoice_detail.col_description` | Description |
| `invoice_detail.col_quantity` | Quantity |
| `invoice_detail.col_price` | Price |
| `invoice_detail.col_total` | Total |
| `invoice_detail.subtotal` | Subtotal: |
| `invoice_detail.taxes` | Taxes: |
| `invoice_detail.total` | Total: |
| `invoice_detail.download_pdf` | Download PDF |
| `invoice_detail.payment_info` | Payment Information |
| `invoice_detail.provider` | Provider |
| `invoice_detail.payment_method` | Payment Method |
| `invoice_detail.currency` | Currency |
| `invoice_detail.payment_date` | Payment Date |

---

## Group: `settings`

### Category: `appearance`

| Key | Translation (EN) |
| :--- | :--- |
| `appearance.title` | Appearance settings |
| `appearance.description` | Update your account's appearance settings |

### Category: `profile`

| Key | Translation (EN) |
| :--- | :--- |
| `profile.title` | Profile settings |
| `profile.section_title` | Profile information |
| `profile.section_description` | Update your name and email address |
| `profile.name` | Name |
| `profile.name_placeholder` | Full name |
| `profile.email` | Email address |
| `profile.email_placeholder` | Email address |
| `profile.unverified_email` | Your email address is unverified. |
| `profile.resend_verification` | Click here to resend the verification email. |
| `profile.verification_sent` | A new verification link has been sent to your email address. |
| `profile.save` | Save |

### Category: `security`

| Key | Translation (EN) |
| :--- | :--- |
| `security.title` | Security settings |
| `security.password_section_title` | Update password |
| `security.password_section_desc` | Ensure your account is using a long, random password to stay secure |
| `security.current_password` | Current password |
| `security.current_password_ph` | Current password |
| `security.new_password` | New password |
| `security.new_password_ph` | New password |
| `security.confirm_password` | Confirm password |
| `security.confirm_password_ph` | Confirm password |
| `security.save_password` | Save password |
| `security.2fa_section_title` | Two-factor authentication |
| `security.2fa_section_desc` | Manage your two-factor authentication settings |
| `security.2fa_enable_description` | When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone. |
| `security.2fa_enabled_description` | You will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone. |
| `security.continue_setup` | Continue setup |
| `security.enable_2fa` | Enable 2FA |
| `security.disable_2fa` | Disable 2FA |

---

## Group: `controllers`

### Category: `billing`

| Key | Translation (EN) |
| :--- | :--- |
| `billing.invoice_not_found` | Invoice not found. |
| `billing.cancel_failed` | Could not cancel the subscription. |
| `billing.cancel_success` | Subscription cancelled successfully. |
| `billing.pause_failed` | Could not pause the subscription. |
| `billing.pause_success` | Subscription paused successfully. |

### Category: `child_license`

| Key | Translation (EN) |
| :--- | :--- |
| `child_license.verification_sent` | Verification email sent to |
| `child_license.license_created` | License created successfully. |
| `child_license.code_resent` | Code resent. |
| `child_license.token_invalid` | Invalid verification token. |
| `child_license.link_expired` | The verification link has expired or is invalid. |
| `child_license.email_verified_register` | Email verified. Complete your registration. |
| `child_license.email_verified` | Email verified successfully. |
| `child_license.license_revoked` | License revoked. |

### Category: `dashboard`

| Key | Translation (EN) |
| :--- | :--- |
| `dashboard.no_plan` | No Plan |
| `dashboard.partner_fallback` | Partner |

### Category: `email_verification`

| Key | Translation (EN) |
| :--- | :--- |
| `email_verification.already_verified` | Already verified. |
| `email_verification.throttle` | Please wait before requesting another send. |
| `email_verification.link_sent` | Verification link sent. |
| `email_verification.link_invalid` | Invalid or expired verification link. |

### Category: `onboarding`

| Key | Translation (EN) |
| :--- | :--- |
| `onboarding.checkout_success` | Subscription activated. Welcome to Lemur LMS! |
| `onboarding.checkout_cancelled` | The payment process was cancelled. You can try again when you are ready. |

### Category: `white_label`

| Key | Translation (EN) |
| :--- | :--- |
| `white_label.already_active` | You already have an active request. |
| `white_label.request_sent` | Request sent. We will notify you soon. |

### Category: `admin`

| Key | Translation (EN) |
| :--- | :--- |
| `admin.user_created` | User created successfully. |
| `admin.whitelabel_approved` | Application approved. |
| `admin.whitelabel_rejected` | Application rejected. |

### Category: `branding`

| Key | Translation (EN) |
| :--- | :--- |
| `branding.logo_created` | Logo created successfully. |
| `branding.logo_not_found` | Logo not found. |
| `branding.logo_updated` | Logo updated. |
| `branding.logo_deleted` | Logo deleted. |
| `branding.logo_activated` | Logo activated. Other logos were deactivated. |
| `branding.banner_created` | Banner created successfully. |
| `branding.banner_not_found` | Banner not found. |
| `branding.banner_updated` | Banner updated. |
| `branding.banner_deleted` | Banner deleted. |
| `branding.banner_activated` | Banner activated. |
| `branding.banner_deactivated` | Banner deactivated. |
| `branding.order_updated` | Order updated. |

### Category: `cms`

| Key | Translation (EN) |
| :--- | :--- |
| `cms.cache_cleared` | CMS cache cleared successfully. |
| `cms.template_created` | Template created successfully. |
| `cms.template_error` | Error creating template: |

### Category: `language`

| Key | Translation (EN) |
| :--- | :--- |
| `language.created` | Language created successfully. |
| `language.create_error` | Error creating language: |
| `language.updated` | Language updated successfully. |
| `language.update_error` | Error updating language: |
| `language.deleted` | Language deleted successfully. |
| `language.delete_error` | Error deleting language: |
| `language.translations_updated` | Translations updated successfully. |

### Category: `layout`

| Key | Translation (EN) |
| :--- | :--- |
| `layout.created` | Layout created. |
| `layout.updated` | Layout updated. |
| `layout.deleted` | Layout deleted. |
| `layout.not_found` | Layout not found. |

### Category: `media`

| Key | Translation (EN) |
| :--- | :--- |
| `media.type_not_allowed` | File type not allowed. Images only. |
| `media.file_too_large` | The file exceeds the 8 MB limit. |
| `media.file_not_found` | File not found. |
| `media.file_deleted` | File deleted. |

### Category: `menu`

| Key | Translation (EN) |
| :--- | :--- |
| `menu.menu_not_found` | Menu not found. |
| `menu.item_created` | Item created. |
| `menu.item_updated` | Item updated. |
| `menu.item_deleted` | Item deleted. |
| `menu.menu_created` | Menu created. |
| `menu.menu_deleted` | Menu deleted. |

### Category: `page`

| Key | Translation (EN) |
| :--- | :--- |
| `page.created` | Page created. You can continue editing. |
| `page.not_found` | Page not found. |
| `page.updated` | Page updated. |
| `page.published` | Page published. |
| `page.deleted` | Page deleted. |
| `page.custom_code_saved` | Custom code saved. |
| `page.schema_json_invalid` | The Schema JSON is invalid. |
| `page.seo_saved` | SEO saved successfully. |
| `page.html_required` | The html field is required. |
| `page.html_imported` | HTML imported successfully. |
| `page.html_error` | Error processing the HTML: |

### Category: `cms_settings`

| Key | Translation (EN) |
| :--- | :--- |
| `cms_settings.saved` | Settings saved successfully. |

### Category: `gateway`

| Key | Translation (EN) |
| :--- | :--- |
| `gateway.configured` | Gateway {provider} configured successfully. |
| `gateway.internal_error` | Internal error processing the configuration. |

### Category: `dynamic_module`

| Key | Translation (EN) |
| :--- | :--- |
| `dynamic_module.module_not_found` | Module not found. |
| `dynamic_module.not_authenticated` | Not authenticated. |
| `dynamic_module.profile_not_found` | CMS access profile not found. |
| `dynamic_module.no_permission` | You do not have permission to {action} in the module {module}. |
| `dynamic_module.record_not_found` | Record not found. |
| `dynamic_module.record_created` | Record created successfully. |
| `dynamic_module.record_updated` | Record updated successfully. |
| `dynamic_module.record_deleted` | Record deleted. |

### Category: `module_builder`

| Key | Translation (EN) |
| :--- | :--- |
| `module_builder.created` | Dynamic module created successfully. |
| `module_builder.updated` | Dynamic module updated successfully. |
| `module_builder.deleted` | Dynamic module deleted. |

### Category: `profile`

| Key | Translation (EN) |
| :--- | :--- |
| `profile.updated` | Profile updated. |

### Category: `security`

| Key | Translation (EN) |
| :--- | :--- |
| `security.password_updated` | Password updated. |

### Category: `team`

| Key | Translation (EN) |
| :--- | :--- |
| `team.created` | Team created. |
| `team.updated` | Team updated. |
| `team.deleted` | Team deleted. |

### Category: `team_invitation`

| Key | Translation (EN) |
| :--- | :--- |
| `team_invitation.sent` | Invitation sent. |
| `team_invitation.cancelled` | Invitation cancelled. |

### Category: `team_member`

| Key | Translation (EN) |
| :--- | :--- |
| `team_member.role_updated` | Member role updated. |
| `team_member.owner_cannot_be_removed` | The team owner cannot be removed. |
| `team_member.removed` | Member removed. |
