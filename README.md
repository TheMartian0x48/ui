# UI Component Library

A modern, accessible UI component library built with Go and Templ.

## Quick Start

### 1. Install the Package

```bash
go get github.com/themartian0x48/ui
```

### 2. Include Required Assets

Add to your HTML `<head>`:
- **CSS**: `/css/main.css` (required for all components)
- **Alpine.js**: Required for interactive components
- **Toast JS**: `/js/components/toast.js` (only if using toasts)

### 3. Basic Usage

```go
import ui "github.com/themartian0x48/ui/go"

@ui.Button(ui.ButtonProp{Variant: ui.ButtonPrimary}) {
    Click me
}
```

## External Dependencies

| Dependency | Version | Purpose | Required |
|------------|---------|---------|----------|
| Alpine.js | 3.x | Interactive components | Yes* |
| toast.js | - | Toast notifications | Only for toasts |

*Alpine.js is required for: Alert, Autocomplete, Badge (dismissible), Drawer, Dropdown, Dropzone, Slider

## Asset Setup

### Option A: Mirror the directory structure

```
/css/main.css           → All component styles
/js/components/toast.js → Toast functionality
```

### Option B: Custom paths

Manually include assets with your own paths:

```html
<link rel="stylesheet" href="/your/path/main.css"/>
<script src="https://unpkg.com/alpinejs@3.x/dist/cdn.min.js" defer></script>
```

## Theming

### Dark Mode

Set `data-theme="dark"` on `<html>` or `<body>`:

```html
<html data-theme="dark">
```

### System Preference

Dark mode auto-applies based on OS preference via `prefers-color-scheme`.
Override with `data-theme="light"` to force light mode.

### Customization

Override CSS variables in `:root` to customize colors, spacing, etc.

## Available Components

35+ components including: Accordion, Alert, Autocomplete, Badge,
Breadcrumb, Button, Card, Checkbox, Dialog, Divider, Drawer,
Dropdown, Dropzone, FormField, Icon, Input, Label, Link, List,
Pagination, Progress, Radio, Select, Skeleton, Slider, Stepper,
Switch, Table, Tabs, Textarea, Timeline, Toast, Tooltip

## Accessibility

- ARIA attributes on all interactive components
- Keyboard navigation support
- Screen reader compatible
- Respects `prefers-reduced-motion`
- Focus visible states

## Development

### Regenerate Templ Files

```bash
templ generate
```

### Run Showcase

```bash
cd showcase && go run .
```

The showcase will be available at `http://localhost:8080`.

## Project Structure

- `go/`: Go and Templ component definitions
- `css/`: Component and base styles
- `js/`: JavaScript logic for interactive components
- `showcase/`: Application to preview and document components
