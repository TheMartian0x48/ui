/**
 * Dropzone Component Logic
 */
window.dropzone = function(options = {}) {
    return {
        isDragging: false,
        files: null,
        disabled: options.disabled || false,

        handleDragOver(e) {
            if (this.disabled) return;
            this.isDragging = true;
        },

        handleDragLeave() {
            this.isDragging = false;
        },

        handleDrop(e) {
            if (this.disabled) return;
            this.isDragging = false;
            this.files = e.dataTransfer.files;
            
            if (this.$refs.fileInput) {
                this.$refs.fileInput.files = this.files;
                // Manually trigger change event to sync state if needed
                this.$refs.fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        },

        handleFiles(e) {
            this.files = e.target.files;
        },

        formatSize(size) {
            return (size / 1024).toFixed(1) + ' KB';
        }
    };
};
