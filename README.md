# UI Component Library

A modern, accessible UI component library built with Go, Templ, and Vanilla CSS.

## Project Structure

- `go/`: Go and Templ component definitions.
- `css/`: Framework-specific component and base styles.
- `js/`: Framework-specific JavaScript logic.
- `showcase/`: A standalone application to preview and document the components.

## Dependencies

We aim for minimal dependencies, relying on the Go ecosystem and native web technologies.

### Back-end / Build Tools
- **Go 1.24.3**: The core programming language.
- **Templ v0.3.977**: A type-safe HTML templating engine for Go.
  - Install with: `go install github.com/a-h/templ/cmd/templ@latest`

### Front-end
- **Alpine.js v3.x**: Used for lightweight client-side interactivity (e.g., dismissible alerts, interactive toggles).
  - Included via CDN in the showcase.
- **Vanilla CSS**: All styles are written in pure CSS using modern features like CSS variables and BEM naming convention.

## Asset Handling (JavaScript & CSS)

Components in this library rely on external `.css` and `.js` files instead of inline scripts (avoiding legacy Templ `<script>` features).

For example, the `ToastContainer()` component relies on an external JavaScript script:
`<script src="/js/components/toast.js" defer></script>`

**Important:** If you use this library in another project, you must ensure that:
1. You either replicate this exact asset routing structure (`/css/...` and `/js/...`) on your server to match the hardcoded paths in the components.
2. **Or**, bypass the built-in helper components (like `ToastContainer()`) and manually include the `<script>` and `<link>` tags in your own project's `head`, pointing to wherever you decide to store those static assets. If the script cannot be loaded from the specified path, client-side functionality will fail.

## Development

### Regenerate Templ Files
```bash
templ generate
```

### Run Showcase
```bash
cd showcase
go run .
```
The showcase will be available at `http://localhost:8080`.
