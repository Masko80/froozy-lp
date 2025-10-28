// Función de JS para manejar el envío del formulario (simulado)
function handleFormSubmit(event) {
    event.preventDefault(); // Detener el envío real del formulario

    const form = document.getElementById('freeSampleForm');
    const confirmation = document.getElementById('confirmationMessage');
    
    // Simulación de la recopilación de datos B2B
    const data = {
        nombreLocal: document.getElementById('nombreLocal').value,
        nombreContacto: document.getElementById('nombreContacto').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
    };

    // Aquí iría la lógica real para enviar los datos a un servidor (Firebase, CRM, etc.)

    // Mostrar el mensaje de confirmación
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');

    // Opcional: Desplazar la pantalla hacia el mensaje
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });

    console.log('Datos de contacto B2B recopilados (simulado):', data);
}

// Simulación de la función crypto.randomUUID() para entornos sin soporte completo
if (typeof crypto.randomUUID === 'undefined') {
    window.crypto.randomUUID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// Simulación de los globals de Firebase que se usarían en un entorno real
const __app_id = 'froozy-landing';
const __firebase_config = '{}';
const __initial_auth_token = undefined;