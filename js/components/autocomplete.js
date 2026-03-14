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
                this._filtered = this.options.filter(opt => {
                    const label = String(opt?.label || '');
                    return label.toLowerCase().includes(term);
                });
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
            this.$refs?.input?.focus();
            this.$dispatch('autocomplete-select', { 
                value: option.value, 
                label: option.label 
            });
        },

        init() {
            // Visually hidden live region so screen readers announce result counts
            this._announcer = document.createElement('div');
            this._announcer.setAttribute('aria-live', 'polite');
            this._announcer.setAttribute('aria-atomic', 'true');
            this._announcer.className = 'visually-hidden';
            this.$el.appendChild(this._announcer);

            this.$watch('search', () => {
                this._filtered = null;
                if (this.open) {
                    this.highlightedIndex = 0;
                }
            });

            this.$watch('options', () => {
                this._filtered = null;
                if (this.open) {
                    this.highlightedIndex = 0;
                }
            });

            this.$watch('open', (isOpen) => {
                if (isOpen) {
                    const count = this.getFiltered().length;
                    this._announcer.textContent = count === 0
                        ? 'No results found.'
                        : `${count} result${count === 1 ? '' : 's'} available.`;
                }
            });
        }
    };
};
