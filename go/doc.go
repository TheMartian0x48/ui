// Package ui provides a standardized, type-safe Go/Templ component library
// designed for high performance and "Elite" AI-friendliness.
//
// Key Architectural Principles:
//
// 1. Property Standardization (BaseProp)
// All component property structs embed BaseProp. When using these structs
// in literals, Id, Class, and Attributes MUST be nested within the BaseProp field.
// Usage Example:
//
//	@ui.Button(ui.ButtonProp{
//	  BaseProp: ui.BaseProp{Id: "btn-1", Class: "custom-class"},
//	  Variant: ui.ButtonPrimary,
//	}) { Click }
//
// 2. ID Generation & ARIA Compliance
// Components should use the GetID(id, prefix) helper from utils.go for internal
// element IDs. This ensures unique, stable IDs for ARIA attributes (aria-labelledby,
// aria-describedby) even when the user doesn't provide an explicit ID.
//
// 3. Alpine.js Modularity
// Complex interactivity is handled via Alpine.js. Logic is extracted to
// js/components/*.js and isolated using IIFEs and window.uiUtils to prevent
// global scope collisions.
//
// 4. Design System (CSS Variables)
// The library uses a standardized set of CSS variables defined in
// css/base/variables.css. Always prefer these variables over hardcoded values:
// - Spacing: var(--spacing-4), var(--spacing-2), etc.
// - Borders: var(--border-width-thin), var(--border-radius-md)
// - Colors: var(--color-primary), var(--color-success), etc.
//
// 5. Documentation for AI Agents
// Every exported component includes a "Usage:" block in its Go-doc header.
// These blocks act as "few-shot" prompts for AI coding assistants, ensuring
// accurate code generation and proper API usage.
package ui
