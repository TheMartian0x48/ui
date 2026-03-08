package main

import (
	"fmt"
	"log"
	"net/http"

	"os"

	"github.com/a-h/templ"
	"github.com/themartian0x48/ui/showcase/view"
)

func main() {
	// Use absolute paths for static assets
	baseDir, _ := os.Getwd()
	fmt.Println("baseDir : " + baseDir)

	cssDir := baseDir + "/css"
	jsDir := baseDir + "/js"
	staticDir := baseDir + "/showcase/static"

	// Serve framework CSS and JS
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir(cssDir))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir(jsDir))))

	// Serve showcase-specific static assets
	http.Handle("/showcase-static/", http.StripPrefix("/showcase-static/", http.FileServer(http.Dir(staticDir))))

	// Serve the showcase page on index
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		component := r.URL.Query().Get("component")
		if component == "" {
			component = "getting-started" // Default
		}
		templ.Handler(view.Showcase(component)).ServeHTTP(w, r)
	})

	port := ":3000"
	fmt.Printf("Displaying showcase on http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
