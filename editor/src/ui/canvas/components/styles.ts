// Mirror of src/PageBuilder/Frameworks/Bootstrap5/behaviors/components.css (tests/canvas/components.test.ts compares them).
export const COMPONENT_CSS = `/* ceiba-cms component styles (plan 05-C); the site design and custom CSS come after and may override them. */
.cms-accordion-item{border:1px solid var(--bs-border-color,#dee2e6);border-radius:.375rem;margin-bottom:.5rem}
.cms-accordion-title{cursor:pointer;font-weight:600;padding:.75rem 1rem}
.cms-accordion-body{padding:0 1rem 1rem}
.cms-carousel{position:relative}
.cms-carousel-track{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory}
.cms-carousel-slide{flex:0 0 100%;scroll-snap-align:start}
.cms-carousel[data-ready] .cms-carousel-track{overflow:hidden}
.cms-carousel-controls{display:flex;gap:.5rem;justify-content:center;margin-top:.5rem}
.cms-video-frame{background:#111 center/cover no-repeat}
.cms-video-frame>.cms-video-play{top:50%;left:50%;width:auto;height:auto;transform:translate(-50%,-50%)}
@media (prefers-reduced-motion:no-preference){.cms-carousel-track{scroll-behavior:smooth}}`;
