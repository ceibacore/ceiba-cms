import type { ResolvedMedia } from '../../../core';
export type MediaMap = Readonly<Record<string, ResolvedMedia>>;
/**
 * Twin of MediaPropsDecorator.php: {asset} props become the URL ('' when unknown) and image slots ("src",
 * "image") get srcset, width, height and alt next to them. Alt: of this use ("" = decorative), node, library.
 */
export declare const resolveProps: (props: Record<string, unknown>, media: MediaMap, depth?: number) => Record<string, unknown>;
