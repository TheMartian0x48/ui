# UI Framework — Improvement Tasks

## High Priority

### Security

- [x] `dialog.templ:133` — Replace inline `onclick` string interpolation in `DialogTrigger` with Alpine.js or `addEventListener` to prevent XSS risk
- [x] `alert.templ:112` — Escape quotes in event dispatch string (`action.EventName`, `action.EventData`) to prevent breakage
- [x] `image_preview.templ:36` — Sanitize `prop.AspectRatio` before injecting into inline `style` attribute

### Bugs (JS)

- [x] `dropzone.js:25` — Fix read-only `FileList` assignment (`this.$refs.fileInput.files = this.files` silently fails)
- [x] `dropzone.js:36` — `formatSize()` doesn't handle 0 bytes or files > 1MB; add MB/GB support
- [x] `autocomplete.js:54` — Add `$refs` null check before accessing `.input`

### Accessibility

- [x] `checkbox.templ`, `radio.templ`, `select.templ`, `switch.templ` — Add `aria-required="true"` on required fields (Input and Textarea already have it)
- [x] `checkbox.templ:29` — Wrap control in `<label>` element like Radio does for better semantic structure
- [x] `toast.templ:69` — Add `type="button"` to close button
- [x] `autocomplete.js` — Add ARIA attributes for highlighted state (`aria-selected`, `aria-expanded`) and screen reader announcements

## Medium Priority

### Consistency (Go Templ)

- [ ] `accordion.templ:54-56` — Replace custom `generateTitleId()`/`generateContentId()` with shared `GetID()` pattern
- [ ] `card.templ:73-89` — Replace string concatenation (`+`) with `strings.Builder` to match other components
- [ ] `button.templ:93-135` / `link.templ:60-102` — Extract shared class-building logic to reduce duplication

### CSS

- [ ] `variables.css` — Remove redundant `--font-size-md` (duplicate of `--font-size-base`, both `1rem`)
- [ ] `dialog.css` — Add mobile-responsive `max-width` (currently no adjustment for small screens)
- [ ] `toast.css` — Prevent overflow on screens < 320px (fixed widths 300-400px)

### JS

- [ ] `dropzone.js` — Add keyboard support for drag-and-drop interactions
- [ ] `autocomplete.js:10` — Invalidate `_filtered` cache when `options` change externally
- [ ] `autocomplete.js:19-21` — Add type validation for option objects (assumes `opt.label` is always a string)

## Low Priority

### Code Quality

- [ ] `pagination.templ:68-70`, `timeline.templ:73-75` — Replace inline SVGs with reusable `Icon` component
- [ ] `dropdown.templ:9` — Remove unused `Values` field from `DropdownProp`
- [ ] `toast.js:27` — Use template cloning for icon SVGs instead of embedding repeatedly
- [ ] `drawer.templ:162` — Replace `fmt.Sprintf()` inline event dispatch with Alpine.js pattern

### CSS Enhancements

- [ ] Add CSS logical properties (`inset-inline`, `margin-inline`, etc.) for RTL support
- [ ] Consider `@container` queries for component-scoped responsive design
- [ ] Consider `:has()` selector for adjacent sibling styling patterns
- [ ] Add responsive styles to Badge component (no mobile sizing adjustments)
