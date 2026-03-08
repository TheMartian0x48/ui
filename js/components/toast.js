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

    // SVG icons for each toast type
    const TOAST_ICONS = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    };

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
        const iconHtml = `<div class="toast__icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</div>`;
        const titleHtml = title ? `<div class="toast__title">${escape(title)}</div>` : '';
        const messageHtml = `<div class="toast__message">${escape(message)}</div>`;
        const closeHtml = `
            <button class="toast__close" aria-label="Close notification">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--sm">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        `;

        toast.innerHTML = `${iconHtml}<div class="toast__content">${titleHtml}${messageHtml}</div>${closeHtml}`;

        // Add close button handler
        const closeBtn = toast.querySelector('.toast__close');
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
