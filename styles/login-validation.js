/* ==========================================
   LOGIN VALIDATION - Validación interactiva
   ========================================== */

class LoginValidator {
    constructor() {
        this.userInput = document.getElementById('user');
        this.passInput = document.getElementById('pass');
        this.form = document.getElementById('cdk-logeo');
        this.submitBtn = document.getElementById('loggin');
        this.responseDiv = document.getElementById('respuesta');
        
        this.init();
    }

    init() {
        // Validación en tiempo real
        this.userInput.addEventListener('blur', () => this.validateUser());
        this.userInput.addEventListener('input', () => this.validateUser());
        
        this.passInput.addEventListener('blur', () => this.validatePassword());
        this.passInput.addEventListener('input', () => this.validatePassword());

        // Toggle contraseña
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', (e) => this.togglePassword(e));
        });

        // Submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateAll()) {
                this.handleSubmit();
            }
        });

        // Limpiar error al enfocar
        this.userInput.addEventListener('focus', () => this.clearFieldError(this.userInput));
        this.passInput.addEventListener('focus', () => this.clearFieldError(this.passInput));
    }

    validateUser() {
        const value = this.userInput.value.trim();
        const isValid = value.length >= 3;

        if (isValid) {
            this.setFieldValid(this.userInput);
        } else if (value.length > 0) {
            this.setFieldInvalid(this.userInput, 'El usuario debe tener al menos 3 caracteres');
        } else {
            this.clearFieldError(this.userInput);
        }

        return isValid;
    }

    validatePassword() {
        const value = this.passInput.value;
        const isValid = value.length >= 6;

        if (isValid) {
            this.setFieldValid(this.passInput);
        } else if (value.length > 0) {
            this.setFieldInvalid(this.passInput, 'La contraseña debe tener al menos 6 caracteres');
        } else {
            this.clearFieldError(this.passInput);
        }

        return isValid;
    }

    validateAll() {
        const userValid = this.validateUser();
        const passValid = this.validatePassword();

        return userValid && passValid;
    }

    setFieldValid(field) {
        field.classList.remove('input-invalid');
        field.classList.add('input-valid');
        
        const feedback = field.nextElementSibling.querySelector('.input-feedback');
        if (feedback) {
            feedback.classList.add('success');
            feedback.classList.remove('error');
            feedback.classList.remove('hidden');
        }

        const errorMsg = field.parentElement.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('input-error')) {
            errorMsg.classList.remove('show');
        }
    }

    setFieldInvalid(field, message) {
        field.classList.remove('input-valid');
        field.classList.add('input-invalid');
        
        const feedback = field.nextElementSibling.querySelector('.input-feedback');
        if (feedback) {
            feedback.classList.add('error');
            feedback.classList.remove('success');
            feedback.classList.remove('hidden');
        }

        const errorMsg = field.parentElement.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('input-error')) {
            errorMsg.textContent = message;
            errorMsg.classList.add('show');
        }
    }

    clearFieldError(field) {
        field.classList.remove('input-invalid', 'input-valid');
        
        const feedback = field.nextElementSibling.querySelector('.input-feedback');
        if (feedback) {
            feedback.classList.add('hidden');
        }

        const errorMsg = field.parentElement.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('input-error')) {
            errorMsg.classList.remove('show');
            errorMsg.textContent = '';
        }
    }

    togglePassword(e) {
        e.preventDefault();
        const input = this.passInput;
        const icon = e.currentTarget.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    handleSubmit() {
        this.submitBtn.disabled = true;
        this.showLoader();

        // Aquí se integra con el login.js existente
        // Simular petición (el login.js hará la petición real)
        setTimeout(() => {
            this.submitBtn.disabled = false;
            this.hideLoader();
        }, 3000);
    }

    showLoader() {
        const textSpan = this.submitBtn.querySelector('.button-text');
        const loader = this.submitBtn.querySelector('.button-loader');
        
        textSpan.classList.add('hidden');
        loader.classList.remove('hidden');
    }

    hideLoader() {
        const textSpan = this.submitBtn.querySelector('.button-text');
        const loader = this.submitBtn.querySelector('.button-loader');
        
        textSpan.classList.remove('hidden');
        loader.classList.add('hidden');
    }

    showMessage(message, type = 'success') {
        this.responseDiv.textContent = message;
        this.responseDiv.className = 'hidden p-4 rounded-lg text-sm font-medium ' + type;
        
        // Forzar reflow para animar
        void this.responseDiv.offsetWidth;
        
        this.responseDiv.classList.remove('hidden');
        this.responseDiv.classList.add('!block');
    }

    hideMessage() {
        this.responseDiv.classList.remove('!block');
        this.responseDiv.classList.add('hidden');
    }
}

// Inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new LoginValidator();
});
