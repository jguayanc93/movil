// Toast Notification System
class Toast {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm pointer-events-none sm:top-6 sm:right-6';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        const bgColor = {
            'success': 'bg-green-50 border-green-200',
            'error': 'bg-red-50 border-red-200',
            'warning': 'bg-yellow-50 border-yellow-200',
            'info': 'bg-blue-50 border-blue-200'
        }[type] || 'bg-blue-50 border-blue-200';

        const textColor = {
            'success': 'text-green-800',
            'error': 'text-red-800',
            'warning': 'text-yellow-800',
            'info': 'text-blue-800'
        }[type] || 'text-blue-800';

        const iconColor = {
            'success': 'text-green-400',
            'error': 'text-red-400',
            'warning': 'text-yellow-400',
            'info': 'text-blue-400'
        }[type] || 'text-blue-400';

        const icons = {
            'success': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
            'error': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
            'warning': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0z" />',
            'info': '<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
        };

        toast.className = `pointer-events-auto flex gap-3 rounded-lg border ${bgColor} p-4 shadow-lg animate-slideInRight`;
        toast.innerHTML = `
            <svg class="h-5 w-5 flex-shrink-0 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                ${icons[type] || icons['info']}
            </svg>
            <div class="flex-1">
                <p class="font-medium ${textColor}">${message}</p>
            </div>
            <button class="ml-2 inline-flex text-gray-400 hover:text-gray-500" onclick="this.closest('[role=alert]').remove()">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        `;
        toast.setAttribute('role', 'alert');
        this.container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => {
                toast.classList.add('animate-slideOutRight');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        return toast;
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    loading(message) {
        const toast = document.createElement('div');
        toast.className = 'pointer-events-auto flex gap-3 rounded-lg border bg-blue-50 border-blue-200 p-4 shadow-lg';
        toast.setAttribute('role', 'status');
        toast.innerHTML = `
            <div class="h-5 w-5 flex-shrink-0 animate-spin rounded-full border-2 border-blue-400 border-t-blue-600"></div>
            <div class="flex-1">
                <p class="font-medium text-blue-800">${message}</p>
            </div>
        `;
        this.container.appendChild(toast);
        return toast;
    }
}

// Global instance
const toast = new Toast();
