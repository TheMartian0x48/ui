/**
 * Autocomplete Component Logic
 */
window.autocomplete = function(options = {}) {
    return {
        open: false,
        search: options.initialValue || '',
        options: options.options || [],
        highlightedIndex: 0,
        _filtered: null,

        getFiltered() {
            if (this._filtered !== null) return this._filtered;
            
            if (this.search === '') {
                this._filtered = this.options;
            } else {
                const term = this.search.toLowerCase();
                this._filtered = this.options.filter(opt => 
                    opt.label.toLowerCase().includes(term)
                );
            }
            return this._filtered;
        },

        navigateDown() {
            const filtered = this.getFiltered();
            if (this.open) {
                this.highlightedIndex = Math.min(this.highlightedIndex + 1, filtered.length - 1);
            } else {
                this.open = true;
                this.highlightedIndex = 0;
            }
        },

        navigateUp() {
            if (this.open) {
                this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
            }
        },

        selectHighlighted() {
            const filtered = this.getFiltered();
            if (this.open && filtered.length > 0) {
                this.selectOption(filtered[this.highlightedIndex]);
            }
        },

        selectOption(option) {
            if (!option) return;
            this.search = option.label;
            this.open = false;
            this._filtered = null;
            this.$refs.input.focus();
            this.$dispatch('autocomplete-select', { 
                value: option.value, 
                label: option.label 
            });
        },

        init() {
            this.$watch('search', () => {
                this._filtered = null;
                if (this.open) {
                    this.highlightedIndex = 0;
                }
            });
        }
    };
};
