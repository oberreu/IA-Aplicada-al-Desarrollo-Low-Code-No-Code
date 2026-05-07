# CSA LATAM AICM Evaluator 2.0

Prototipo funcional para la tarea del Módulo 4 de Low-Code / No-Code.

La herramienta permite ejecutar un assessment reducido basado en el CSA AI Controls Matrix (AICM v1.0.3), registrar evidencia con análisis simulado de IA, calcular madurez SCF C|P-CMM y exportar resultados en JSON.

## Alcance

- App estática desplegada en GitHub Pages.
- 10 controles oficiales del AICM v1.0.3 en español.
- 6 dominios: GRC, AIS, DSP, LOG, MDS, A&A.
- IDs de control alineados al framework oficial CSA.
- Respuestas: Sí, Parcial, No y N/A.
- Modelo de madurez **SCF C|P-CMM** (L0–L4) por control.
- Validaciones de coherencia: compliance ↔ madurez, compliance ↔ evidencia.
- Registro de tipo, estado y descripción de evidencia por control.
- **Análisis simulado de IA** sobre evidencia adjunta (.txt): evalúa cobertura de keywords, genera veredicto y auto-asigna estado de evidencia.
- Archivo de prueba descargable por control (contiene keywords para pasar el análisis).
- Validación: si se selecciona tipo de evidencia, se requiere archivo adjunto.
- **Firebase Integration**:
  - Autenticación con email/password (registro, login, recuperación de contraseña).
  - Persistencia en Firestore (sincronización cloud).
  - Subida de archivos a Firebase Storage (máx. 1 MB, solo .txt para prototipo).
- Guardado automático local (`localStorage`) como fallback.
- Modo local automático si Firebase SDK no está disponible.
- Dashboard con score de compliance %, nivel de madurez SCF, score por dominio, radar de madurez, brechas y roadmap 30/60/90.
- Exportación JSON y PDF.
- Notificación de cierre simulada con resumen ejecutivo del assessment.

## Demo

```text
https://oberreu.github.io/IA-Aplicada-al-Desarrollo-Low-Code-No-Code/
```

## Uso local

Abre `index.html` en el navegador.

También puedes servirlo localmente con cualquier servidor estático:

```bash
python3 -m http.server 8080
```

Luego abre:

```text
http://localhost:8080
```

## Publicación con GitHub Pages

Configuración actual en GitHub:

- Repository visibility: Public
- Pages source: Deploy from a branch
- Branch: `gh-pages`
- Folder: `/root`

## Firebase (configuración)

El proyecto utiliza Firebase (plan Spark/Blaze) con los siguientes servicios:

| Servicio | Uso |
|----------|-----|
| Authentication | Email/password: registro, login, recuperación |
| Firestore | Persistencia del estado del assessment por usuario |
| Storage | Almacenamiento de archivos de evidencia (.txt) |

Para habilitar en un proyecto propio:
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Authentication → Email/Password
3. Crear Firestore Database (test mode)
4. Crear Storage (test mode)
5. Actualizar `firebaseConfig` en `app.js`

## Flujo principal

1. Ver página de inicio con descripción de dominios y modelo de madurez.
2. Click "Iniciar assessment" → panel de configuración.
3. Completar datos de la organización (nombre, sector, país, responsable).
4. (Opcional) Registrarse/login para sincronización cloud.
5. Iniciar evaluación de controles.
6. Por cada control: responder, asignar madurez, clasificar evidencia, adjuntar archivo.
7. El análisis IA simulado evalúa el archivo y auto-asigna estado de evidencia.
8. Revisar dashboard ejecutivo con compliance %, madurez SCF, radar por dominio, brechas y roadmap.
9. Exportar resultados en JSON/PDF o generar notificación simulada de cierre.

## Análisis de evidencia (IA simulado)

Al subir un archivo `.txt` con tipo de evidencia seleccionado, el sistema:

1. Extrae keywords del `evidenceHint` y `title` del control.
2. Compara los conceptos clave contra el contenido del documento.
3. Evalúa cobertura semántica + extensión del texto.
4. Genera un veredicto con score 0-100:
   - **≥75**: Evidencia suficiente (verde) → Estado: Suficiente
   - **40-74**: Evidencia parcial (ámbar) → Estado: Parcial
   - **<40**: Evidencia insuficiente (rojo) → Estado: Pendiente
5. Muestra observaciones y sugerencias de mejora.

## Persistencia

La app guarda el progreso con la siguiente prioridad:

1. **Firestore** (si el usuario está autenticado): `assessments/{uid}`
2. **localStorage** (fallback): clave `csaLatamAicmModulo4State`

El botón `Reiniciar` elimina el estado local y comienza una nueva evaluación.

## Stack técnico

- HTML/CSS/JS puro (sin frameworks ni bundler)
- Firebase SDK v10.12.0 (compat)
- GitHub Pages (despliegue estático)

## Entregable académico

Esta versión evidencia funcionalidad real dentro de un alcance acotado:

- Formularios operativos con validaciones de coherencia
- Modelo de madurez SCF C|P-CMM (L0–L4)
- Análisis simulado de IA sobre evidencia
- Autenticación y persistencia cloud (Firebase)
- Cálculo automático de compliance y madurez
- Radar de madurez por dominio y reporte PDF
- Notificación simulada de cierre del assessment
- Recomendaciones de implementación por control
- Reporte completo de brechas sin límite
- Exportación de resultados en JSON y PDF

No reemplaza auditorías formales ni certificaciones CSA. Es una herramienta de diagnóstico y preparación.
