/** Texts of the content components (plan 05-B), merged into es.ts and en.ts. */
export const componentsEs = {
  'canvas.empty': '{type}: nada que mostrar todavía',
  'canvas.menu': 'Menú «{slug}» (los enlaces se ven en la página publicada)',
  'gallery.add': 'Añadir imagen',
  'gallery.empty': 'Sin imágenes.',
  'gallery.item': 'Imagen {n}',
  'gallery.caption': 'Pie de foto',
  'gallery.up': 'Subir imagen {n}',
  'gallery.down': 'Bajar imagen {n}',
  'gallery.remove': 'Quitar imagen {n}',
} as const;

export const componentsEn: Record<keyof typeof componentsEs, string> = {
  'canvas.empty': '{type}: nothing to show yet',
  'canvas.menu': 'Menu «{slug}» (links show on the published page)',
  'gallery.add': 'Add image',
  'gallery.empty': 'No images.',
  'gallery.item': 'Image {n}',
  'gallery.caption': 'Caption',
  'gallery.up': 'Move image {n} up',
  'gallery.down': 'Move image {n} down',
  'gallery.remove': 'Remove image {n}',
};
