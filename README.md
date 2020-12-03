# masonry-rows

A *Custom Element* fully inspired by [A Lightweight Masonry Solution](https://css-tricks.com/a-lightweight-masonry-solution/) article.

**[Live Demo](https://codepen.io/WebReflection/pen/RwGravV?editors=0100)**

```html
<script async src="//unpkg.com/masonry-rows"></script>
<!--
  <masonry-rows gap=".5em" min-width="20em">
  Both gap and min-width are by default .5em and 20em
  and exposed as gap or minWidth accessors, reflected
  through el.setAttribute('gap' or 'min-width') too.
  If set as numbers, will be converted as (num + 'px').
-->
<masonry-rows>
  <p>
    Any content is shown as a grid with masonry rows.
  </p>
  <p>
    From paragraphs to images.
  </p>
</masonry-rows>
```
