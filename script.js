// Configuración de EmailJS
const EMAILJS_CONFIG = {
    serviceId: 'TU_SERVICE_ID',  // Reemplazar con tu Service ID
    templateId: 'TU_TEMPLATE_ID', // Reemplazar con tu Template ID
    publicKey: 'TU_PUBLIC_KEY'    // Reemplazar con tu Public Key
};

// Inicializar EmailJS cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS (descomenta cuando tengas las credenciales)
    // emailjs.init(EMAILJS_CONFIG.publicKey);
});

// Función de JS para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault(); // Detener el envío real del formulario

    const form = document.getElementById('freeSampleForm');
    const confirmation = document.getElementById('confirmationMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Mostrar estado de carga
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Recopilación de datos del formulario
    const formData = {
        nombreLocal: document.getElementById('nombreLocal').value,
        nombreContacto: document.getElementById('nombreContacto').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value || 'No proporcionado',
        fecha: new Date().toLocaleDateString('es-ES'),
        hora: new Date().toLocaleTimeString('es-ES')
    };

    // Opción 1: Envío con EmailJS (descomenta cuando configures)
    /*
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: formData.nombreContacto,
        from_email: formData.email,
        business_name: formData.nombreLocal,
        phone: formData.telefono,
        message: `Nueva solicitud de contacto desde ${formData.nombreLocal}`,
        reply_to: formData.email,
        fecha: formData.fecha,
        hora: formData.hora
    })
    .then(function(response) {
        console.log('Email enviado exitosamente:', response);
        showSuccessMessage(form, confirmation);
    })
    .catch(function(error) {
        console.error('Error al enviar email:', error);
        showErrorMessage(submitButton, originalButtonText);
    });
    */

    // Opción 2: Envío simulado (actual - para desarrollo)
    setTimeout(() => {
        console.log('Datos de contacto B2B recopilados:', formData);
        showSuccessMessage(form, confirmation);
        
        // Enviar datos a Google Analytics o similar para tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: 'Froozy B2B Contact Form'
            });
        }
    }, 1500); // Simular delay de red
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(form, confirmation) {
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para mostrar mensaje de error
function showErrorMessage(submitButton, originalButtonText) {
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
    
    // Mostrar mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'mt-4 p-4 rounded-lg bg-red-600 text-white font-semibold';
    errorDiv.textContent = 'Error al enviar el formulario. Por favor, intenta nuevamente.';
    
    submitButton.parentNode.appendChild(errorDiv);
    
    // Remover mensaje de error después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Validación en tiempo real del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('freeSampleForm');
    if (form) {
        // Validación del email
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-sky-500');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-sky-500');
            }
        });

        // Validación del teléfono
        const phoneInput = document.getElementById('telefono');
        phoneInput.addEventListener('input', function() {
            // Permitir solo números, espacios, guiones y paréntesis
            this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, '');
        });
    }
});

// Simulación de la función crypto.randomUUID() para entornos sin soporte completo
if (typeof crypto.randomUUID === 'undefined') {
    window.crypto.randomUUID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// Configuración para tracking y analytics
const __app_id = 'froozy-landing';
const __firebase_config = '{}';
const __initial_auth_token = undefined;