# Documento Ejecutivo — CSA LATAM AICM Evaluator 2.0

**Autor:** Carlos Oberreuter · CSA LATAM Chapter  
**Fecha:** Mayo 2026 · NTICmaster UCM — Módulo 4 Low-Code / No-Code

---

## 1.1 Definición del problema o necesidad del usuario

**Contexto:** El AI Controls Matrix (AICM) v1.0.3 de la Cloud Security Alliance define 243 controles en 18 dominios para gobernar y asegurar sistemas de inteligencia artificial. Este framework se encuentra en fase temprana de adopción y no existen herramientas accesibles para su operacionalización en la región.

**Usuarios:** Líderes de GRC, CISO, arquitectos de IA/Cloud y consultores de seguridad en organizaciones medianas y grandes de LATAM que adoptan IA sobre entornos cloud (banca, salud, telecomunicaciones, gobierno).

**Necesidad principal:** Evaluar de forma estructurada la postura de seguridad en IA de una organización contra un framework reconocido, sin depender de consultoría especializada de alto costo (USD 4.000–15.000 por assessment manual).

**Situación actual:** Las organizaciones adoptan IA aceleradamente pero sin capacidad consolidada para evaluar, gobernar y demostrar cumplimiento de controles de AI Security. Los assessments manuales toman 40–120 horas, son fragmentados y no generan resultados comparables ni repetibles.

---

## 1.2 Objetivos de la herramienta

La herramienta permite a un usuario completar un assessment de seguridad de IA en una sesión de trabajo, sin experiencia previa en AICM.

- **Tarea que facilita:** Evaluación de controles AICM con registro de evidencia y generación automática de resultados.
- **Proceso que mejora:** Diagnóstico de madurez en AI Security, que pasa de semanas de trabajo manual a horas.
- **Resultado esperado:** Score global, score por dominio, identificación de brechas críticas y roadmap priorizado 30/60/90 días.
- **Indicadores de utilidad:**
  - Tiempo de completar el flujo completo: < 30 minutos (prototipo de 19 controles).
  - 100% de controles evaluados generan score y recomendaciones sin intervención manual.
  - Exportación JSON lista para auditoría o reporting ejecutivo.

---

## 1.3 Justificación del uso de low-code/no-code

La herramienta fue construida mediante **Vibe Coding con IA generativa** (GitHub Copilot en VS Code), un enfoque que califica como desarrollo asistido de tipo low-code porque:

- **Rapidez:** Prototipo funcional completo en horas, no semanas.
- **Validación temprana:** Permite comprobar la viabilidad del caso de uso antes de invertir en arquitectura compleja.
- **Reducción de costos:** Sin infraestructura, sin backend, sin licencias de plataforma.
- **Iteración rápida:** Cambios en controles, dominios y lógica de scoring se aplican inmediatamente.
- **Sin programación avanzada requerida:** El modelo genera la lógica; el profesional de seguridad define qué construir, no cómo.

No tendría sentido un desarrollo tradicional completo en esta fase porque el objetivo es validar que la idea funciona y que el flujo de assessment es coherente, antes de escalar a los 243 controles del AICM completo.

---

## 1.4 Alcance y limitaciones

**Qué se ha construido:**
- App web estática funcional publicada en GitHub Pages.
- 19 controles oficiales AICM v1.0.3 en 6 dominios (GRC, AIS, DSP, LOG, MDS, A&A).
- Formulario de configuración con validación.
- Navegación tipo wizard (Inicio → Configuración → Evaluación → Resultados).
- Registro de evidencia por control (tipo, estado, descripción).
- Cálculo automático de score global y por dominio.
- Identificación de brechas priorizadas con roadmap.
- Persistencia en localStorage y exportación JSON.
- Caso de referencia precargable.

**Flujo principal que funciona:** Configurar organización → Evaluar 19 controles → Registrar evidencia → Ver dashboard con scores y brechas → Exportar JSON.

**No incluido:**
- Los 243 controles completos del AICM (solo 19 priorizados).
- Agente/Copiloto IA para análisis automático de evidencia.
- Integración con sistemas corporativos o tenants cloud.
- Autenticación de usuarios o multi-tenancy.
- Validación automática de evidencia documental.

**Limitaciones:**
- Sin backend ni base de datos persistente (solo localStorage del navegador).
- No reemplaza auditoría formal ni juicio experto de evaluadores certificados.
- Alcance reducido para demostrar viabilidad, no para producción.
