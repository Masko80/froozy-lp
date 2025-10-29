# Froozy Landing Page

Landing page para Froozy - Servicio B2B de vasos con hielo pre-envasados.

## 🚀 Características

- **Diseño responsive** con Tailwind CSS
- **Formulario de contacto funcional** con EmailJS
- **Validación en tiempo real** de campos
- **Separación de archivos** (HTML, CSS, JS)
- **Optimizado para conversión B2B**

## 📧 Configuración del Envío de Emails

### Opción 1: EmailJS (Recomendado - Sin backend)

1. **Crea una cuenta en [EmailJS](https://www.emailjs.com/)**

2. **Configura tu servicio de email:**
   - Ve a "Email Services" y conecta tu proveedor (Gmail, Outlook, etc.)
   - Anota tu `Service ID`

3. **Crea un template de email:**
   - Ve a "Email Templates"
   - Crea un nuevo template con estas variables:
     ```
     {{from_name}} - Nombre del contacto
     {{from_email}} - Email del contacto  
     {{business_name}} - Nombre del negocio
     {{phone}} - Teléfono
     {{message}} - Mensaje automático
     {{fecha}} - Fecha de envío
     {{hora}} - Hora de envío
     ```
   - Anota tu `Template ID`

4. **Obtén tu Public Key:**
   - Ve a "Account" > "General"
   - Copia tu `Public Key`

5. **Actualiza el archivo `script.js`:**
   ```javascript
   const EMAILJS_CONFIG = {
       serviceId: 'tu_service_id_aqui',
       templateId: 'tu_template_id_aqui', 
       publicKey: 'tu_public_key_aqui'
   };
   ```

6. **Descomenta las líneas de EmailJS en `script.js`:**
   - Busca los comentarios `/*` y `*/` alrededor del código de EmailJS
   - Elimina los comentarios para activar el envío real

### Opción 2: Formspree (Alternativa simple)

1. Ve a [Formspree](https://formspree.io/)
2. Crea una cuenta y obtén tu endpoint
3. Cambia el atributo `action` del formulario:
   ```html
   <form action="https://formspree.io/f/TU_FORM_ID" method="POST">
   ```

### Opción 3: Netlify Forms (Si usas Netlify)

1. Agrega `netlify` al formulario:
   ```html
   <form netlify name="contact">
   ```

## 📁 Estructura del Proyecto

```
froozy-lp/
├── index.html      # Página principal
├── styles.css      # Estilos CSS
├── script.js       # JavaScript funcional
├── img/
│   └── img.jpeg    # Imagen del producto
└── README.md       # Este archivo
```

## 🛠️ Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Masko80/froozy-lp.git
   cd froozy-lp
   ```

2. **Configura el envío de emails** (ver sección anterior)

3. **Abre `index.html`** en tu navegador o súbelo a tu hosting

## 🚀 Deployment

### GitHub Pages
1. Ve a Settings > Pages en tu repositorio
2. Selecciona "Deploy from a branch" > "main"
3. Tu sitio estará disponible en: `https://masko80.github.io/froozy-lp/`

### Netlify
1. Conecta tu repositorio de GitHub con Netlify
2. El sitio se desplegará automáticamente

### Vercel
1. Importa tu repositorio en Vercel
2. El sitio se desplegará automáticamente

## 🔧 Personalización

- **Colores:** Edita `styles.css` para cambiar el esquema de colores
- **Contenido:** Modifica `index.html` para actualizar textos e imágenes
- **Funcionalidad:** Ajusta `script.js` para agregar nuevas características

## 📊 Analytics y Tracking

El código incluye preparación para Google Analytics. Agrega tu código de tracking en el `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📝 Notas

- El formulario actualmente funciona en modo simulado
- Para activar el envío real, configura EmailJS según las instrucciones
- Todos los estilos usan Tailwind CSS desde CDN
- Compatible con todos los navegadores modernos

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

Para preguntas sobre el proyecto, contacta a través del formulario en el sitio web.