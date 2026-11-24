/** A YouTube or Vimeo video (plan 05 D-2), played from its no-cookie / dnt URL only after a click. */
export interface VideoEmbed {
    readonly provider: 'youtube' | 'vimeo';
    readonly id: string;
    readonly embed: string;
    readonly watch: string;
}
/** Same parser as src/Media/Domain/VideoEmbed.php; null for any other URL. */
export declare const parseVideo: (url: unknown) => VideoEmbed | null;
