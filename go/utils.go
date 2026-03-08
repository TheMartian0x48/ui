package ui

import (
	"fmt"
	"sync/atomic"

	"github.com/a-h/templ"
)

var idCounter atomic.Uint64

// BaseProp defines the standard fields that every component should support.
// Embedding this struct ensures naming consistency for standard attributes.
type BaseProp struct {
	Id         string           // Unique identifier for the element
	Class      string           // Custom CSS classes
	Attributes templ.Attributes // Additional HTML attributes (e.g. data-*, @click)
}

// GetID returns the provided ID if not empty, otherwise generates a unique one with prefix.
func GetID(id string, prefix string) string {
	if id != "" {
		return id
	}
	return fmt.Sprintf("%s-%d", prefix, idCounter.Add(1))
}

// boolToString converts a boolean to its string representation.
func boolToString(b bool) string {
	if b {
		return "true"
	}
	return "false"
}
