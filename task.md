# UI Component Library Expansion Plan

This document outlines the tasks required to add advanced components to our existing UI component library.

## Goal
Expand our core building blocks with high-priority form essentials, advanced interactions, and rich layout components. Keep styling consistent with existing components, using CSS variables and adhering to the "premium" aesthetic.

## Task Breakdown

### 2. Drawer (Slide-over)
* **Task:** Implement a `Drawer` component that slides in from the edge of the screen, useful for contextual actions or settings without losing page context.
* **Requirements:**
  * Create `go/drawer.templ` and `css/components/drawer.css`.
  * Utilize Alpine.js (`x-data`, `x-show`, `x-transition`) for open/close states and animations.
  * Implement a Backdrop/Overlay that closes the drawer on click.
  * Support positioning: `DrawerLeft`, `DrawerRight`.
  * Support sizing (e.g., width boundaries).
  * Add a comprehensive demo at `showcase/demo_drawer.templ` tying the drawer trigger to a button.
  * Update `css/main.css` and `showcase/page.templ` to register it.

### 3. Divider / Separator
* **Task:** Implement a structured `Divider` component.
* **Requirements:**
  * Create `go/divider.templ` and `css/components/divider.css`.
  * Style basic horizontal (`<hr>`) dividers.
  * Implement support for "Labelled Dividers" (text centered horizontally across the line).
  * Implement vertical divider variants.
  * Add demo showcase at `showcase/demo_divider.templ`.
  * Update `css/main.css` and `showcase/page.templ` to register it.

### 4. Stepper
* **Task:** Implement a `Stepper` component to indicate progress through a multi-step workflow.
* **Requirements:**
  * Create `go/stepper.templ` and `css/components/stepper.css`.
  * Accept a list of steps and an `ActiveStep` index.
  * Visually distinguish between "Completed" (e.g., checkmarks), "Current" (highlighted), and "Upcoming" (muted) states.
  * Style connecting lines between step items.
  * Add a demo showcase at `showcase/demo_stepper.templ`.
  * Update `css/main.css` and `showcase/page.templ` to register it.

### 5. File Upload Dropzone
* **Task:** Implement a styled `Dropzone` for file uploads, improving upon native `<input type="file">`.
* **Requirements:**
  * Create `go/dropzone.templ` and `css/components/dropzone.css`.
  * Design a large, dashed-border drop area.
  * Hide native file input inside a `<label>`.
  * Use Alpine.js to handle visual states (`@dragover` to highlight, `@dragleave`/`@drop` to revert).
  * Provide feedback states (e.g., indicating a file was selected).
  * Add demo showcase at `showcase/demo_dropzone.templ`.
  * Update `css/main.css` and `showcase/page.templ` to register it.

### 6. Autocomplete (Combobox)
* **Task:** Implement an `Autocomplete` combobox combining the features of a text input and a searchable dropdown.
* **Requirements:**
  * Create `go/autocomplete.templ` and `css/components/autocomplete.css`.
  * Integrate tightly with Alpine.js to manage search queries (`x-model`) and dropdown visibility.
  * Filter dropdown options dynamically based on text input.
  * Ensure keyboard navigation accessibility (arrows to navigate options, enter to select).
  * Add demo showcase at `showcase/demo_autocomplete.templ`.
  * Update `css/main.css` and `showcase/page.templ` to register it.
