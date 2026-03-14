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
            this.files = Array.from(e.dataTransfer.files);

            if (this.$refs.fileInput) {
                const dt = new DataTransfer();
                this.files.forEach(file => dt.items.add(file));
                this.$refs.fileInput.files = dt.files;
                this.$refs.fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        },

        handleFiles(e) {
            this.files = Array.from(e.target.files);
        },

        formatSize(size) {
            if (size === 0) return '0 B';
            if (size < 1024) return size + ' B';
            if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
            if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + ' MB';
            return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
        }
    };
};
