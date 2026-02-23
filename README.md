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
