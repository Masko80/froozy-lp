// Función para obtener la configuración de EmailJS dinámicamente
function getEmailJSConfig() {
    return {
        serviceId: window.EMAIL_CONFIG?.serviceId || 'TU_SERVICE_ID',
        templateId: window.EMAIL_CONFIG?.templateId || 'TU_TEMPLATE_ID',
        publicKey: window.EMAIL_CONFIG?.publicKey || 'TU_PUBLIC_KEY'
    };
}

// Verificar si las credenciales están configuradas
function areCredentialsConfigured() {
    const config = getEmailJSConfig();
    const isConfigured = config.serviceId !== 'TU_SERVICE_ID' &&
        config.templateId !== 'TU_TEMPLATE_ID' &&
        config.publicKey !== 'TU_PUBLIC_KEY' &&
        config.serviceId !== undefined &&
        config.templateId !== undefined &&
        config.publicKey !== undefined;

    console.log('Credenciales configuradas:', isConfigured);
    console.log('Service ID:', config.serviceId);
    console.log('Template ID:', config.templateId);
    console.log('Public Key:', config.publicKey ? '***' + config.publicKey.slice(-4) : 'No configurada');

    return isConfigured;
}

// Inicializar EmailJS cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    // Pequeño delay para asegurar que config.js se haya cargado
    setTimeout(function () {
        console.log('=== INICIO DIAGNÓSTICO EMAILJS ===');
        console.log('window.EMAIL_CONFIG existe?', typeof window.EMAIL_CONFIG !== 'undefined');
        console.log('window.EMAIL_CONFIG:', window.EMAIL_CONFIG);
        console.log('emailjs disponible?', typeof emailjs !== 'undefined');

        // Inicializar EmailJS solo si las credenciales están configuradas
        if (areCredentialsConfigured()) {
            try {
                const config = getEmailJSConfig();
                emailjs.init(config.publicKey);
                console.log('✅ EmailJS inicializado correctamente');
            } catch (error) {
                console.error('❌ Error al inicializar EmailJS:', error);
            }
        } else {
            console.warn('⚠️ EmailJS no configurado - funcionando en modo simulado');
            console.warn('Verifica que config.js esté cargado con las credenciales correctas');
        }
        console.log('=== FIN DIAGNÓSTICO ===');
    }, 100);
});// Función de JS para manejar el envío del formulario
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

    // Opción 1: Envío con EmailJS (solo si las credenciales están configuradas)
    if (areCredentialsConfigured()) {
        const config = getEmailJSConfig();
        console.log('Enviando email con EmailJS...');
        console.log('Configuración:', {
            serviceId: config.serviceId,
            templateId: config.templateId,
            publicKey: '***' + config.publicKey.slice(-4)
        });
        console.log('Datos del formulario:', formData);

        emailjs.send(config.serviceId, config.templateId, {
            from_name: formData.nombreContacto,
            from_email: formData.email,
            business_name: formData.nombreLocal,
            phone: formData.telefono,
            message: `Nueva solicitud de contacto desde ${formData.nombreLocal}`,
            reply_to: formData.email,
            fecha: formData.fecha,
            hora: formData.hora
        })
            .then(function (response) {
                console.log('✅ Email enviado exitosamente:', response);
                console.log('Status:', response.status);
                console.log('Text:', response.text);
                showSuccessMessage(form, confirmation);
            })
            .catch(function (error) {
                console.error('❌ Error al enviar email:', error);
                console.error('Tipo de error:', typeof error);
                console.error('Error completo:', JSON.stringify(error, null, 2));
                console.error('Detalles del error:', {
                    text: error.text,
                    message: error.message,
                    status: error.status,
                    name: error.name,
                    stack: error.stack
                });

                // Mostrar error más descriptivo
                let errorMessage = '';
                if (error.text) {
                    if (error.text.includes('The public key is invalid') || error.text.includes('invalid')) {
                        errorMessage = 'Error: La Public Key de EmailJS es inválida. Verifica tu configuración.';
                    } else if (error.text.includes('Template not found')) {
                        errorMessage = 'Error: El Template ID no existe. Verifica tu configuración.';
                    } else if (error.text.includes('Service not found')) {
                        errorMessage = 'Error: El Service ID no existe. Verifica tu configuración.';
                    } else if (error.text.includes('recipients address is empty')) {
                        errorMessage = 'Error: Falta configurar el destinatario (To Email) en la plantilla de EmailJS.';
                    } else if (error.status === 412) {
                        errorMessage = 'Error 412: Permisos insuficientes. Reconecta Gmail en EmailJS autorizando todos los permisos.';
                    } else {
                        errorMessage = `Error: ${error.text}`;
                    }
                } else {
                    errorMessage = `Error: ${error.message || 'No se pudo enviar el email. Revisa la consola para más detalles.'}`;
                }

                showErrorMessage(submitButton, originalButtonText, errorMessage);
            });
    } else {
        // Fallback: Modo simulado si no hay credenciales configuradas
        console.warn('⚠️ EmailJS no configurado - usando modo simulado');
        console.log('Para enviar emails reales, configura tus credenciales en config.js');
        setTimeout(() => {
            console.log('Datos de contacto B2B recopilados (modo simulado):', formData);
            showSuccessMessage(form, confirmation);
        }, 1500);
    }
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(form, confirmation) {
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para mostrar mensaje de error
function showErrorMessage(submitButton, originalButtonText, customMessage = null) {
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;

    // Remover mensaje de error previo si existe
    const prevError = submitButton.parentNode.querySelector('.error-message');
    if (prevError) {
        prevError.remove();
    }

    // Mostrar mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message mt-4 p-4 rounded-lg bg-red-600 text-white font-semibold';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <strong>Error al enviar el formulario</strong>
                <p class="text-sm mt-1">${customMessage || 'No se pudo enviar el formulario. Por favor, intenta nuevamente o contáctanos directamente.'}</p>
            </div>
        </div>
    `;

    submitButton.parentNode.appendChild(errorDiv);

    // Remover mensaje de error después de 8 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 8000);
}

// Validación en tiempo real del formulario
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('freeSampleForm');
    if (form) {
        // Validación del email
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', function () {
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
        phoneInput.addEventListener('input', function () {
            // Permitir solo números, espacios, guiones y paréntesis
            this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, '');
        });
    }
});

// Simulación de la función crypto.randomUUID() para entornos sin soporte completo
if (typeof crypto.randomUUID === 'undefined') {
    window.crypto.randomUUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// Configuración para tracking y analytics
const __app_id = 'froozy-landing';
const __firebase_config = '{}';
const __initial_auth_token = undefined;