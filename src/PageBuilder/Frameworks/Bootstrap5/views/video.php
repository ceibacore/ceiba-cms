<?php
// Video (plan 05 D-2): YouTube (no-cookie) or Vimeo, loaded only when the visitor presses play (scripts/video.js).
// Without JavaScript the caption links to the video on its site. Nothing is drawn for other URLs.
use CeibaCms\Media\Domain\VideoEmbed;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$video = VideoEmbed::parse($props['url'] ?? null);
if ($video === null) {
    return;
}
$title = is_string($props['title'] ?? null) && trim($props['title']) !== '' ? trim($props['title']) : 'Video';
$play = is_string($props['playLabel'] ?? null) && trim($props['playLabel']) !== '' ? trim($props['playLabel']) : 'Play video';
$class = trim('cms-video ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<figure' . Html::attrs(['class' => $class]) . '>';
echo '<div' . Html::attrs(['class' => 'ratio ratio-16x9 cms-video-frame', 'data-cms-video' => $video->embed,
    'data-cms-video-title' => $title, 'style' => Html::backgroundImage($props['poster'] ?? null)]) . '>';
echo '<button type="button" class="cms-video-play btn btn-dark">' . Html::e($play) . '<span class="visually-hidden">: ' . Html::e($title) . '</span></button>';
echo '</div><figcaption class="small mt-1"><a' . Html::attrs(['href' => $video->watch, 'rel' => 'noopener', 'target' => '_blank']) . '>' . Html::e($title) . '</a></figcaption></figure>';
