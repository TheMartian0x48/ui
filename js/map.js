document.addEventListener('alpine:init', () => {
    Alpine.data('mapComponent', (config) => ({
        map: null,
        marker: null,

        async initMap() {
            // Ensure Leaflet is loaded
            if (typeof L === 'undefined') {
                await this.loadLeaflet();
            }

            // Default to India center if 0,0 provided
            const lat = config.lat || 20.5937;
            const long = config.long || 78.9629;
            const zoom = config.zoom || 5;

            this.map = L.map(this.$el).setView([lat, long], zoom);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(this.map);

            // Add marker if initial coordinates are provided and valid (not 0,0 or default)
            if (config.lat && config.long) {
                this.updateMarker(lat, long);
            }

            this.map.on('click', (e) => {
                this.updateMarker(e.latlng.lat, e.latlng.lng);
                this.updateInputs(e.latlng.lat, e.latlng.lng);
            });

            // Listen for external events to update map center/marker
            window.addEventListener(`update-map-${config.id}`, (e) => {
                const { lat, lng } = e.detail;
                this.map.setView([lat, lng], 15);
                this.updateMarker(lat, lng);
                this.updateInputs(lat, lng);
            });

            // Listen for locate event
            window.addEventListener(`locate-map-${config.id}`, () => {
                this.useCurrentLocation();
            });
        },

        updateMarker(lat, lng) {
            if (this.marker) {
                this.marker.setLatLng([lat, lng]);
            } else {
                this.marker = L.marker([lat, lng]).addTo(this.map);
            }
        },

        updateInputs(lat, lng) {
            // Update the hidden/visible inputs
            const latInput = document.getElementById(config.targetLat);
            const longInput = document.getElementById(config.targetLong);

            if (latInput) latInput.value = lat.toFixed(6);
            if (longInput) longInput.value = lng.toFixed(6);

            // Trigger input event for any listeners
            if (latInput) latInput.dispatchEvent(new Event('input'));
            if (longInput) longInput.dispatchEvent(new Event('input'));
        },

        useCurrentLocation() {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    this.map.setView([lat, lng], 15);
                    this.updateMarker(lat, lng);
                    this.updateInputs(lat, lng);
                },
                () => {
                }
            );
        },

        loadLeaflet() {
            return new Promise((resolve, reject) => {
                // Load CSS
                if (!document.querySelector('link[href*="leaflet.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    document.head.appendChild(link);
                }

                // Load JS
                if (typeof L !== 'undefined') {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
    }));
});
