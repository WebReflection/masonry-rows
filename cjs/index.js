'use strict';
let injectCSS = true;

const {filter} = [];

const patched = new WeakMap;

const computed = self => {
  const {ownerDocument: {defaultView}} = self;
  return defaultView.getComputedStyle(self);
};

const listener = (method, self) => {
  const {ownerDocument: {defaultView}} = self;
  defaultView[method + 'EventListener']('resize', patched.get(self));
};

const notColumnEnd = child => computed(child).gridColumnEnd != -1;

const setProperty = (self, property, value) => {
  if (value != null) {
    const gap = typeof value === 'number' ? (value + 'px') : value;
    self.style.setProperty(property, gap);
  }
  else
    self.style.removeProperty(property);
  if (patched.has(self))
    patched.get(self)();
};

customElements.define('masonry-rows', class extends HTMLElement {
  static get observedAttributes() {
    return ['gap', 'min-width'];
  }
  get gap() {
    return this.style.getPropertyValue('--gap') || '.5em';
  }
  set gap(value) {
    setProperty(this, '--gap', value);
  }
  get items() {
    return filter.call(this.children, notColumnEnd);
  }
  get minWidth() {
    return this.style.getPropertyValue('--min-width') || '20em';
  }
  set minWidth(value) {
    setProperty(this, '--min-width', value);
  }
  attributeChangedCallback(name, _, value) {
    this[name === 'gap' ? name : 'minWidth'] = value;
  }
  connectedCallback() {
    const {ownerDocument} = this;
    if (injectCSS) {
      injectCSS = false;
      ownerDocument.head.appendChild(
        ownerDocument.createElement('style')
      ).textContent = `@supports (display: grid) {
        masonry-rows, .masonry-rows {
          --gap: .5em;
          --min-width: 20em;
          --width: minmax(min(var(--min-width), 100%), 1fr);
          box-sizing: inherit;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, var(--width));
          grid-template-rows: masonry;
          justify-content: center;
          grid-gap: var(--gap);
          padding: var(--gap);
        }
        masonry-rows > *, .masonry-rows > * { align-self: start }
      }`;
    }
    let addListener = patched.has(this);
    const {display, gridTemplateRows} = computed(this);
    if (!addListener && display === 'grid' && gridTemplateRows !== 'masonry') {
      addListener = !addListener;
      patched.set(this, () => {
        let mod = false;
        const {gridRowGap, gridTemplateColumns} = computed(this);
        const columns = gridTemplateColumns.split(/\s+/).length;
        const {items} = this, {length} = items;
        for (let i = 0; i < length; i++) {
          const child = items[i];
          const {height} = child.getBoundingClientRect();
          if (height != child.dataset.height) {
            child.dataset.height = height;
            mod = true;
          }
        }
        if (mod || this.dataset.columns != columns) {
          this.dataset.columns = columns;
          for (let i = 0; i < length; i++) {
            const child = items[i];
            child.style.removeProperty('margin-top');
          }
          if (1 < columns) {
            const gap = parseFloat(gridRowGap);
            for (let i = columns; i < length; i++) {
              const {bottom} = items[i - columns].getBoundingClientRect();
              const {top} = items[i].getBoundingClientRect();
              items[i].style.marginTop = (bottom + gap - top) + 'px';
            }
          }
        }
      });
      new MutationObserver(patched.get(this))
        .observe(this, {subtree: true, childList: true});
    }
    if (addListener) {
      listener('add', this);
      patched.get(this)();
    }
  }
  disconnectedCallback() {
    if (patched.has(this))
      listener('remove', this);
  }
});
