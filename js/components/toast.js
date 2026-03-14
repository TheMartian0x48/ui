/**
 * Toast Notification System
 */
(function() {
    // Position enum for consistent positioning
    window.ToastPosition = Object.freeze({
        TopLeft: "top-left",
        TopCenter: "top-center",
        TopRight: "top-right",
        BottomLeft: "bottom-left",
        BottomCenter: "bottom-center",
        BottomRight: "bottom-right"
    });

    // Type enum for type safety
    window.ToastType = Object.freeze({
        Info: "info",
        Success: "success",
        Warning: "warning",
        Error: "error"
    });

    // Transition duration (matches CSS --transition-base)
    const getTransitionDuration = () => (window.uiUtils?.prefersReducedMotion ? 0 : 250);

    // SVG icons for each toast type - defined once and cloned
    const TOAST_ICON_TEMPLATES = {
        success: createIconTemplate('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'),
        error: createIconTemplate('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'),
        warning: createIconTemplate('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>'),
        info: createIconTemplate('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'),
        close: createIconTemplate('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>', 'icon--sm')
    };

    function createIconTemplate(path, sizeClass = 'icon--md') {
        const template = document.createElement('template');
        template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon ${sizeClass}">${path}</svg>`;
        return template;
    }

    function getIcon(type) {
        const template = TOAST_ICON_TEMPLATES[type] || TOAST_ICON_TEMPLATES.info;
        return template.content.cloneNode(true);
    }

    /**
     * Get or create toast container for a position
     */
    function getToastContainer(position) {
        const containerId = `toast-container-${position}`;
        let container = document.getElementById(containerId);

        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.className = `toast-container toast-container--${position}`;
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
        }

        return container;
    }

    /**
     * Dismiss a toast with animation
     */
    function dismissToast(toast, position) {
        toast.style.opacity = '0';

        // Determine exit direction based on position
        if (position.includes('right')) {
            toast.style.transform = 'translateX(100%)';
        } else if (position.includes('left')) {
            toast.style.transform = 'translateX(-100%)';
        } else if (position.includes('top')) {
            toast.style.transform = 'translateY(-100%)';
        } else {
            toast.style.transform = 'translateY(100%)';
        }

        setTimeout(() => {
            const container = toast.parentElement;
            toast.remove();
            // Clean up empty container
            if (container && container.childNodes.length === 0) {
                container.remove();
            }
        }, getTransitionDuration());
    }

    /**
     * Show a toast notification
     */
    window.showToast = function(message, type = 'info', title = '', position = 'bottom-right', options = {}) {
        const {
            duration = 3000,
            ariaLive = null
        } = options;

        const escape = window.uiUtils?.escapeHtml || (t => t);

        // Validate position
        const validPositions = Object.values(window.ToastPosition);
        if (!validPositions.includes(position)) {
            position = window.ToastPosition.BottomRight;
        }

        // Validate type
        const validTypes = Object.values(window.ToastType);
        if (!validTypes.includes(type)) {
            type = window.ToastType.Info;
        }

        const container = getToastContainer(position);

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-atomic', 'true');

        // Set aria-live based on type (errors/warnings are assertive)
        const liveValue = ariaLive || (type === 'error' || type === 'warning' ? 'assertive' : 'polite');
        toast.setAttribute('aria-live', liveValue);

        // Build toast content
        const iconContainer = document.createElement('div');
        iconContainer.className = 'toast__icon';
        iconContainer.appendChild(getIcon(type));

        const content = document.createElement('div');
        content.className = 'toast__content';
        if (title) {
            const titleEl = document.createElement('div');
            titleEl.className = 'toast__title';
            titleEl.textContent = title;
            content.appendChild(titleEl);
        }
        const messageEl = document.createElement('div');
        messageEl.className = 'toast__message';
        messageEl.textContent = message;
        content.appendChild(messageEl);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast__close';
        closeBtn.setAttribute('aria-label', 'Close notification');
        closeBtn.appendChild(getIcon('close'));

        toast.appendChild(iconContainer);
        toast.appendChild(content);
        toast.appendChild(closeBtn);

        // Add close button handler
        closeBtn.addEventListener('click', () => dismissToast(toast, position));

        // Add keyboard handler (Escape to dismiss)
        toast.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dismissToast(toast, position);
            }
        });

        // Make toast focusable for keyboard users
        toast.setAttribute('tabindex', '0');

        container.appendChild(toast);

        // Auto-dismiss (0 = persistent)
        if (duration > 0) {
            setTimeout(() => {
                if (toast.parentElement) {
                    dismissToast(toast, position);
                }
            }, duration);
        }

        return toast;
    };
})();
