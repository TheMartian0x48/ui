// Expose Enum values to JS for convenience
window.ToastPosition = {
    TopLeft: "top-left",
    TopCenter: "top-center",
    TopRight: "top-right",
    BottomLeft: "bottom-left",
    BottomCenter: "bottom-center",
    BottomRight: "bottom-right"
};

window.showToast = function(message, type = 'info', title = '', position = 'bottom-right') {
    // Validate position or fallback
    const validPositions = Object.values(window.ToastPosition);
    if (!validPositions.includes(position)) {
        position = window.ToastPosition.BottomRight;
    }

    const containerId = `toast-container-${position}`;
    let container = document.getElementById(containerId);
    
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = `toast-container toast-container--${position}`;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.role = 'alert';
    
    const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--md"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    };

    const iconHtml = `<div class="toast__icon">${icons[type] || icons.info}</div>`;
    const titleHtml = title ? `<div class="toast__title">${title}</div>` : '';
    const messageHtml = `<div class="toast__message">${message}</div>`;
    const closeHtml = `
        <button class="toast__close" onclick="this.closest('.toast').remove()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon icon--sm">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    `;

    toast.innerHTML = `${iconHtml}<div class="toast__content">${titleHtml}${messageHtml}</div>${closeHtml}`;

    if (position.startsWith('top')) {
         container.appendChild(toast);
    } else {
         container.appendChild(toast);
    }

    setTimeout(() => {
        toast.style.opacity = '0';
        if (position.includes('right')) toast.style.transform = 'translateX(100%)';
        else if (position.includes('left')) toast.style.transform = 'translateX(-100%)';
        else if (position.includes('top')) toast.style.transform = 'translateY(-100%)';
        else toast.style.transform = 'translateY(100%)';
        
        setTimeout(() => {
            toast.remove();
            if (container.childNodes.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3000); 
};
