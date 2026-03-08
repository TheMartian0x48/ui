/**
 * UI Library Base Utilities
 */
(function() {
    // Shared media query for reduced motion
    const motionQuery = window.matchMedia('(prefers-color-scheme: dark)'); // Wait, that's dark mode
    
    // Correct query for reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    window.uiUtils = {
        prefersReducedMotion: reducedMotionQuery.matches,
        
        // Helper to escape HTML strings
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };

    // Update value if it changes
    reducedMotionQuery.addEventListener('change', e => {
        window.uiUtils.prefersReducedMotion = e.matches;
    });
})();
