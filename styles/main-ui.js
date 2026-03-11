/* ==========================================
   MAIN UI - Interacciones del panel
   ========================================== */

class MainUI {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.toggleBtn = document.getElementById('toggle-sidebar');
        this.userMenuBtn = document.getElementById('user-menu-btn');
        this.userDropdown = document.getElementById('user-dropdown');
        this.init();
    }

    init() {
        this.setupSidebarToggle();
        this.setupUserMenu();
        this.setupResponsive();
    }

    setupSidebarToggle() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.sidebar.classList.toggle('hidden');
            });

            // Cerrar sidebar al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!this.sidebar.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                    this.sidebar.classList.add('hidden');
                }
            });

            // Cerrar sidebar al hacer clic en un módulo
            const moduleLinks = document.querySelectorAll('#sidebar-modules a');
            moduleLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.sidebar.classList.add('hidden');
                });
            });
        }
    }

    setupUserMenu() {
        if (this.userMenuBtn) {
            this.userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.userDropdown.classList.toggle('hidden');
            });

            // Cerrar al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!this.userDropdown.contains(e.target) && !this.userMenuBtn.contains(e.target)) {
                    this.userDropdown.classList.add('hidden');
                }
            });

            // Cerrar al hacer click en una opción
            this.userDropdown.querySelectorAll('a, button').forEach(item => {
                item.addEventListener('click', () => {
                    this.userDropdown.classList.add('hidden');
                });
            });
        }
    }

    setupResponsive() {
        // Detectar cambios de tamaño de pantalla
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.sidebar.classList.remove('hidden');
            } else {
                this.sidebar.classList.add('hidden');
            }
        });
    }
}

/* ==========================================
   TOAST NOTIFICATIONS
   ========================================== */

class Toast {
    static show(message, type = 'success', duration = 3000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');

        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        toast.className = `
            ${colors[type] || colors.info}
            text-white px-6 py-4 rounded-lg shadow-lg
            animate-fadeIn flex items-center space-x-3
            pointer-events-auto mb-3
        `;

        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Auto-remove
        setTimeout(() => {
            toast.classList.remove('animate-fadeIn');
            toast.classList.add('animate-fadeOut');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    static success(message) {
        this.show(message, 'success');
    }

    static error(message) {
        this.show(message, 'error');
    }

    static warning(message) {
        this.show(message, 'warning');
    }

    static info(message) {
        this.show(message, 'info');
    }
}

// Inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new MainUI();
});

// Exportar para uso global
window.Toast = Toast;
