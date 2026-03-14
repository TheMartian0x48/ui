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
            this.updateFiles(Array.from(e.dataTransfer.files));
        },

        handleFiles(e) {
            this.files = Array.from(e.target.files);
        },

        handlePaste(e) {
            if (this.disabled) return;
            const items = (e.clipboardData || e.originalEvent.clipboardData).items;
            const pastedFiles = [];
            for (const item of items) {
                if (item.kind === 'file') {
                    pastedFiles.push(item.getAsFile());
                }
            }
            if (pastedFiles.length > 0) {
                this.updateFiles(pastedFiles);
            }
        },

        removeFile(index) {
            if (this.disabled) return;
            const newFiles = [...this.files];
            newFiles.splice(index, 1);
            this.updateFiles(newFiles);
        },

        updateFiles(fileList) {
            this.files = fileList;
            if (this.$refs.fileInput) {
                const dt = new DataTransfer();
                this.files.forEach(file => dt.items.add(file));
                this.$refs.fileInput.files = dt.files;
                this.$refs.fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
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
