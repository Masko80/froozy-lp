# 📧 Configuración de EmailJS para Froozy Landing Page

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error: "The recipients address is empty"

**Causa**: El template de EmailJS no tiene configurado el destinatario (To Email)
**Solución**:

1. Ve a tu template en EmailJS
2. En "Settings" → "To Email", pon tu email: `tu-email@ejemplo.com`
3. O configura el campo `toEmail` en `config.js`

### Error: "412 Insufficient Authentication Scopes"

**Causa**: Gmail no tiene permisos suficientes en OAuth
**Solución**: Reconecta Gmail autorizando todos los permisos (ver abajo)

---

## 🔧 Solución al Error 412

### Opción 1: Reconectar Gmail con permisos completos (RECOMENDADO)

1. **Ve a tu dashboard de EmailJS**: https://dashboard.emailjs.com/
2. **Elimina el servicio actual de Gmail**:
   - Ve a "Email Services"
   - Encuentra tu servicio de Gmail
   - Click en los 3 puntos → "Delete"
3. **Vuelve a conectar Gmail**:
   - Click en "Add New Service"
   - Selecciona "Gmail"
   - **IMPORTANTE**: Cuando Google te pida permisos, asegúrate de:
     - ✅ Autorizar TODOS los permisos que solicita
     - ✅ No desmarcar ninguna casilla
     - ✅ Click en "Permitir" o "Allow"
4. **Copia el nuevo Service ID** y actualízalo en `config.js`

### Opción 2: Usar otro proveedor de email

Si Gmail sigue dando problemas, puedes usar:

- **Outlook/Hotmail** (más fácil de configurar)
- **Yahoo Mail**
- **SMTP personalizado**

---

## 📋 Configuración Completa Paso a Paso

### Paso 1: Crear cuenta en EmailJS

1. Ve a https://dashboard.emailjs.com/
2. Crea una cuenta gratuita (100 emails/mes)
3. Verifica tu email

### Paso 2: Configurar el Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Click en **"Add New Service"**
3. Selecciona tu proveedor:
   - **Gmail** (recomendado pero requiere permisos OAuth)
   - **Outlook** (más sencillo)
4. Conecta tu cuenta y **AUTORIZA TODOS LOS PERMISOS**
5. Copia el **Service ID** (ejemplo: `service_abc1234`)

### Paso 3: Crear el Template de Email

1. Ve a **"Email Templates"**
2. Click en **"Create New Template"**
3. Configura el template así:

**Template Name:** Froozy Contact Form

**Subject:**

```
Nueva solicitud de contacto desde {{business_name}}
```

**Body (Content):**

```
Hola equipo Froozy,

Han recibido una nueva solicitud de contacto desde la landing page:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 DATOS DEL NEGOCIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏪 Nombre del Local: {{business_name}}
👤 Contacto: {{from_name}}
📧 Email: {{from_email}}
📱 Teléfono: {{phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 INFORMACIÓN DEL ENVÍO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Fecha: {{fecha}}
🕐 Hora: {{hora}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Saludos,
Sistema Automático Froozy LP
```

**To Email:** (tu email donde quieres recibir los contactos)

4. **IMPORTANTE**: Ve a la pestaña **"Settings"** del template
5. Habilita estas opciones:
   - ✅ Auto-Reply (opcional)
   - ✅ Template is active
6. Guarda y copia el **Template ID** (ejemplo: `template_xyz5678`)

### Paso 4: Obtener la Public Key

1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key** (ejemplo: `abcd1234efgh5678`)

### Paso 5: Actualizar config.js

Abre el archivo `config.js` y actualiza con tus valores:

```javascript
window.EMAIL_CONFIG = {
  serviceId: "service_abc1234", // Reemplaza con tu Service ID
  templateId: "template_xyz5678", // Reemplaza con tu Template ID
  publicKey: "abcd1234efgh5678", // Reemplaza con tu Public Key
};
```

---

## 🧪 Cómo Probar que Funciona

1. Abre `index.html` en tu navegador
2. Abre la **Consola del Navegador** (F12 → Console)
3. Deberías ver:
   ```
   EmailJS inicializado correctamente
   Credenciales configuradas: true
   Service ID: service_abc1234
   Template ID: template_xyz5678
   Public Key: ***5678
   ```
4. Llena el formulario y envía
5. En la consola deberías ver:
   ```
   ✅ Email enviado exitosamente
   ```

---

## ❌ Errores Comunes y Soluciones

### Error: "The public key is invalid"

- **Causa**: La Public Key está mal copiada
- **Solución**: Copia nuevamente desde Account → General

### Error: "Template not found"

- **Causa**: El Template ID no existe o está mal copiado
- **Solución**: Verifica que el template esté activo y copia el ID correcto

### Error: "Service not found"

- **Causa**: El Service ID no existe o está mal copiado
- **Solución**: Verifica el Service ID en Email Services

### Error: "412 Insufficient Authentication Scopes" (Gmail API)

- **Causa**: Gmail no tiene permisos suficientes en OAuth
- **Solución**:
  1. Elimina el servicio de Gmail en EmailJS
  2. Vuelve a conectarlo autorizando TODOS los permisos
  3. O usa Outlook en su lugar

### Error: "429 Too Many Requests"

- **Causa**: Superaste el límite de emails del plan gratuito (100/mes)
- **Solución**: Espera al próximo mes o actualiza tu plan

---

## 🔒 Seguridad

- ✅ El archivo `config.js` está en `.gitignore` (no se sube a GitHub)
- ✅ Las credenciales solo funcionan desde tu dominio configurado en EmailJS
- ✅ EmailJS valida el origen de las peticiones
- ⚠️ **NUNCA** compartas tu Public Key públicamente

---

## 📞 Soporte

Si sigues teniendo problemas:

1. Revisa la consola del navegador (F12)
2. Verifica que todos los IDs estén correctos
3. Asegúrate de que el servicio de email esté conectado
4. Consulta la documentación oficial: https://www.emailjs.com/docs/

---

## ✅ Checklist de Configuración

- [ ] Cuenta de EmailJS creada
- [ ] Servicio de email conectado (Gmail/Outlook)
- [ ] Template de email creado con las variables correctas
- [ ] Service ID copiado en config.js
- [ ] Template ID copiado en config.js
- [ ] Public Key copiada en config.js
- [ ] Probado el envío del formulario
- [ ] Email de prueba recibido correctamente

¡Una vez completado todo esto, tu formulario estará enviando emails reales! 🎉
