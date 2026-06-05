<?php
$tag   = $props['tag']   ?? 'div';
$class = $props['class'] ?? '';
$role  = $props['role']  ?? '';

$attrs = '';
if ($class !== '') {
    $attrs .= ' class="' . htmlspecialchars($class, ENT_QUOTES, 'UTF-8') . '"';
}
if ($role  !== '') {
    $attrs .= ' role="'  . htmlspecialchars($role,  ENT_QUOTES, 'UTF-8') . '"';
}
echo "<{$tag}{$attrs}>{$slot}</{$tag}>";
