# Reflexión Individual — Módulo 4 Low-Code / No-Code

**Carlos Oberreuter** · Mayo 2026

---

## 4.1 Aprendizajes obtenidos

El desarrollo de esta herramienta demostró que el enfoque de Vibe Coding con IA generativa permite a un profesional de ciberseguridad —sin experiencia en desarrollo frontend— construir una aplicación funcional completa en pocas horas. La diferencia fundamental con el desarrollo tradicional es que el esfuerzo se concentra en **definir qué construir** (controles, lógica de scoring, flujo de usuario) en lugar de **cómo implementarlo** (DOM, CSS, event handlers).

Aprendí que la clave para un buen resultado no es la herramienta de IA en sí, sino la calidad del contexto que se le proporciona. Definir con precisión los controles AICM, sus dominios y la lógica de evaluación antes de generar código produce resultados muy superiores a iterar sin dirección. El proceso de construcción fue iterativo: generar, probar en el navegador, identificar brechas funcionales y solicitar correcciones específicas.

También descubrí que la conexión entre datos, lógica y visualización en una SPA sin framework es sorprendentemente manejable cuando la IA genera el scaffolding correcto. localStorage como mecanismo de persistencia es suficiente para un prototipo y elimina toda la complejidad de backend.

---

## 4.2 Limitaciones encontradas

- **Persistencia limitada:** localStorage no permite compartir datos entre dispositivos ni colaborar entre usuarios. Un prototipo más avanzado requeriría backend o al menos sincronización cloud.
- **Escalabilidad del UI:** Con 19 controles la interfaz funciona bien; con los 243 controles completos del AICM se requeriría paginación, filtros avanzados y búsqueda.
- **Sin validación semántica de evidencia:** El usuario describe evidencia en texto libre, pero no hay verificación automática de si la evidencia realmente sustenta la respuesta seleccionada.
- **Limitaciones del Vibe Coding:** Cuando el código generado tiene bugs sutiles (ej. race conditions en renders), diagnosticar requiere entender el código generado. No es completamente "no-code" en la práctica.
- **Sin autenticación:** No se implementó login porque complica significativamente una app estática sin backend.

---

## 4.3 Opinión personal sobre el valor actual de estas herramientas

Las herramientas low-code/no-code con IA generativa tienen **valor real e inmediato** para:

- **Prototipos funcionales rápidos:** Validar una idea de producto antes de invertir en desarrollo completo. Este caso es un ejemplo claro: la viabilidad del AICM Evaluator quedó demostrada en horas.
- **Herramientas internas:** Dashboards, formularios, calculadoras y utilities que resuelven problemas operativos sin pasar por un ciclo de desarrollo formal.
- **Profesionales no-dev:** Permite a expertos de dominio (seguridad, GRC, auditoría) construir sus propias herramientas de trabajo.

**Riesgos y limitaciones:**

- **Mantenibilidad:** El código generado por IA puede ser difícil de mantener si no se entiende su estructura.
- **Seguridad:** Se requiere revisión explícita para evitar vulnerabilidades (XSS, inyección, exposición de datos).
- **Dependencia de contexto:** La calidad del output depende críticamente de qué tan bien se describe el problema.
- **No reemplaza desarrollo serio:** Para productos en producción, con múltiples usuarios, integraciones complejas y requisitos de compliance, el desarrollo tradicional sigue siendo necesario.

**Recomendación:** Usar low-code/no-code con IA para la fase 0→1 (validación) y luego decidir si escalar con desarrollo tradicional. En este proyecto, la herramienta validó el caso de uso del AICM Evaluator y ahora la decisión de escalar a producción puede tomarse con evidencia, no con especulación.
