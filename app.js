const STORAGE_KEY = "csaLatamAicmModulo4State";

const controls = [
  // --- Governance, Risk and Compliance (GRC) ---
  {
    id: "GRC-01",
    domain: "Governance, Risk and Compliance",
    title: "Governance Program Policy and Procedures",
    question: "¿La organización ha establecido, documentado, aprobado y comunicado políticas y procedimientos para un programa de gobierno de la información que incluya sistemas de IA, con revisión al menos anual?",
    evidenceHint: "Política de gobierno de IA aprobada, acta de aprobación, matriz RACI, estándar interno publicado, registro de revisiones.",
    auditingGuidelines: [
      "Verificar que existe una estrategia integral de gobierno de la información que incluya liderazgo sponsor y uso responsable de IA.",
      "Confirmar que las políticas se revisan y actualizan al menos anualmente con evidencia documentada del proceso y aprobación.",
      "Verificar que las políticas requieren revisión de evidencia de cumplimiento de proveedores antes de integrar servicios de IA.",
      "Confirmar que las actualizaciones incluyen responsabilidades de monitoreo de cumplimiento de proveedores."
    ],
    weight: 1
  },
  {
    id: "GRC-02",
    domain: "Governance, Risk and Compliance",
    title: "Risk Management Program",
    question: "¿Existe un programa formal y documentado de gestión de riesgos de IA (AIRM) patrocinado por la dirección, que incluya identificación, evaluación, tratamiento y aceptación de riesgos?",
    evidenceHint: "Programa AIRM documentado, registro de riesgos, criterios de aceptación, aprobaciones de riesgo, owner por riesgo.",
    auditingGuidelines: [
      "Verificar que existe un programa AIRM formal, documentado y aprobado por la dirección ejecutiva.",
      "Confirmar que incluye procedimientos para identificar, evaluar, asignar ownership, tratar y aceptar riesgos de servicios de IA de terceros.",
      "Verificar que considera riesgos como mal uso del modelo, falta de explicabilidad, residencia de datos y dependencia de modelos opacos.",
      "Evaluar si el programa AIRM se alinea con el framework de gobierno de IA y la estrategia de riesgo empresarial."
    ],
    weight: 1.2
  },
  {
    id: "GRC-10",
    domain: "Governance, Risk and Compliance",
    title: "AI Impact Assessment",
    question: "¿Se ha establecido y comunicado un proceso de AI Impact Assessment con criterios para evaluar regularmente los impactos éticos, sociales, operativos, legales y de seguridad del sistema de IA a lo largo de su ciclo de vida?",
    evidenceHint: "Proceso de AI Impact Assessment documentado, criterios de evaluación, reportes de impacto, registros de stakeholders notificados.",
    auditingGuidelines: [
      "Verificar que existe un proceso de AI Impact Assessment documentado y alineado con la tolerancia al riesgo organizacional.",
      "Verificar los criterios de evaluación y mecanismo de scoring para dimensiones de riesgo: ético, social, legal, operativo y de seguridad.",
      "Evaluar cómo la metodología de impacto evalúa efectos diferenciales en distintas aplicaciones downstream.",
      "Verificar el proceso para identificar stakeholders y cómo se comunican los resultados e incorpora su feedback."
    ],
    weight: 1.2
  },
  {
    id: "GRC-15",
    domain: "Governance, Risk and Compliance",
    title: "Human Supervision",
    question: "¿Existen procesos, procedimientos y medidas técnicas para asegurar la supervisión y control humano del sistema de IA en cumplimiento con requisitos regulatorios y gestión de riesgos organizacional?",
    evidenceHint: "Procedimiento de human-in-the-loop, escalamiento, umbrales de intervención, evidencia de override humano.",
    auditingGuidelines: [
      "Verificar que existen procesos documentados para que operadores humanos supervisen el funcionamiento y rendimiento del sistema de IA.",
      "Examinar el cumplimiento de los procesos con requisitos regulatorios y mejores prácticas de la industria.",
      "Confirmar que adoptan un enfoque basado en riesgo y están implementados concretamente por los responsables.",
      "Inspeccionar si se monitorean con métricas de eficacia y se revisan periódicamente."
    ],
    weight: 1.1
  },
  // --- Application & Interface Security (AIS) ---
  {
    id: "AIS-08",
    domain: "Application & Interface Security",
    title: "Input Validation",
    question: "¿Se validan, filtran, modifican o bloquean las entradas contra patrones adversariales, patrones de fallo y comportamiento no deseado según las políticas organizacionales y regulaciones aplicables?",
    evidenceHint: "Reglas de validación, filtros de prompt injection, guardrails, pruebas de seguridad de inputs, casos negativos documentados.",
    auditingGuidelines: [
      "Verificar que existen políticas y controles explícitos para validar inputs adversariales específicos al caso de uso.",
      "Evaluar los mecanismos de validación de entrada incluyendo ataques lingüísticos, de tokens y multimodales.",
      "Verificar que se realizan ejercicios de AI Red Teaming enfocados en validación de inputs contra escenarios adversariales.",
      "Confirmar que los hallazgos del Red Team se traducen en mejoras continuas de los controles de validación.",
      "Verificar que se monitorea la efectividad de la validación con métricas relevantes actualizadas regularmente."
    ],
    weight: 1.1
  },
  {
    id: "AIS-09",
    domain: "Application & Interface Security",
    title: "Output Validation",
    question: "¿Se validan, filtran, modifican o bloquean las salidas del modelo contra patrones adversariales, patrones de fallo y comportamiento no deseado según las políticas organizacionales?",
    evidenceHint: "Filtros de output, content safety, pruebas de salidas tóxicas/sensibles, mecanismos de redacción automática.",
    auditingGuidelines: [
      "Confirmar que existen políticas y controles para validar outputs contra comportamientos inseguros o adversariales.",
      "Verificar que los mecanismos de validación de salida cubren insecure output handling y excessive agency.",
      "Verificar que se realizan ejercicios de AI Red Teaming que evalúan la efectividad de la validación de outputs.",
      "Confirmar que se monitorea activamente la efectividad con métricas diseñadas para detectar riesgos de outputs adversariales.",
      "Verificar que los controles se revisan y actualizan ante nuevas amenazas y hallazgos de Red Teaming."
    ],
    weight: 1.1
  },
  {
    id: "AIS-10",
    domain: "Application & Interface Security",
    title: "API Security",
    question: "¿Se han definido e implementado procesos, procedimientos y medidas técnicas para asegurar las APIs, con revisión al menos anual o ante cambios significativos?",
    evidenceHint: "API gateway configurado, autenticación/autorización, rotación de claves, rate limiting, logs de acceso a APIs.",
    auditingGuidelines: [
      "Verificar que existen medidas y procesos para asegurar APIs con mecanismos de gestión de claves y autorización.",
      "Verificar la evaluación de riesgos de la cadena de suministro de APIs (análisis de composición, reportes de vulnerabilidades).",
      "Confirmar que los procesos y medidas se revisan al menos anualmente y después de cambios significativos."
    ],
    weight: 1
  },
  {
    id: "AIS-15",
    domain: "Application & Interface Security",
    title: "Prompt Differentiation",
    question: "¿Se implementan mecanismos que permitan al modelo distinguir claramente entre instrucciones del usuario, datos e instrucciones de sistema (system prompts)?",
    evidenceHint: "Arquitectura de prompts documentada, separación system/user/data, pruebas de indirect prompt injection, controles de contexto.",
    auditingGuidelines: [
      "Verificar el uso consistente de tokens o formatos estructurados para etiquetar input de usuario e instrucciones de sistema.",
      "Examinar cómo se procesa el input del usuario y verificar que se escapan caracteres de control correctamente.",
      "Verificar la separación contextual en las estructuras de request/response de API.",
      "Verificar el uso efectivo de delimitadores para separar partes del prompt.",
      "Analizar la resistencia del modelo a intentos de override de instrucciones de sistema desde el input de usuario.",
      "Revisar diferenciación visual en la UI entre áreas de input y guía del sistema."
    ],
    weight: 1.1
  },
  // --- Data Security and Privacy Lifecycle Management (DSP) ---
  {
    id: "DSP-17",
    domain: "Data Security & Privacy Lifecycle",
    title: "Sensitive Data Protection",
    question: "¿Se han definido e implementado procesos, procedimientos y medidas técnicas para proteger datos sensibles a lo largo de su ciclo de vida en el contexto del sistema de IA?",
    evidenceHint: "Política DLP, clasificación de datos, anonimización, controles de privacidad, PII detection, revisión legal.",
    auditingGuidelines: [
      "Verificar que las políticas internas de uso de IA incluyen guías de privacidad para datos sensibles consumidos por sistemas GenAI.",
      "Verificar que los roles y responsabilidades para gestionar riesgos de privacidad están claramente asignados.",
      "Verificar que las políticas de clasificación y manejo cubren datos enviados a herramientas de IA de terceros.",
      "Verificar los controles a lo largo del ciclo de vida de datos compartidos con proveedores de GenAI.",
      "Verificar si la organización ha documentado incidentes de exposición de datos por herramientas GenAI y las acciones de seguimiento.",
      "Verificar que la gestión de riesgos de IA incluye evaluaciones de bias, explicabilidad y privacidad antes del deployment."
    ],
    weight: 1.2
  },
  {
    id: "DSP-20",
    domain: "Data Security & Privacy Lifecycle",
    title: "Data Provenance and Transparency",
    question: "¿Se documentan y trazan las fuentes de datos utilizadas por el modelo, y se hace disponible la información de procedencia según requisitos legales y regulatorios?",
    evidenceHint: "Registro de fuentes de datos, data lineage, documentación de datasets de entrenamiento, disclosure de proveniencia.",
    auditingGuidelines: [
      "Verificar que todas las fuentes de datos usadas en despliegues de IA están identificadas y documentadas.",
      "Verificar que los registros de lineage muestran cómo los datos se mueven a través del ciclo de vida de IA.",
      "Verificar que se mantienen registros de proveniencia para cualquier transformación o generación de datos sintéticos.",
      "Verificar que el acceso y modificación de datos de IA son rastreados por sistemas de monitoreo automatizado.",
      "Verificar que se aplica versionamiento a datasets, configuraciones de modelo y logs de inferencia.",
      "Verificar que existe un proceso auditable para disclosure de datos a reguladores cuando sea requerido."
    ],
    weight: 1
  },
  {
    id: "DSP-21",
    domain: "Data Security & Privacy Lifecycle",
    title: "Data Poisoning Prevention & Detection",
    question: "¿Se han definido, implementado y evaluado procesos y medidas técnicas para prevenir data poisoning en modelos de IA y detectarlo de forma continua?",
    evidenceHint: "Controles de integridad de datos de entrenamiento, monitoreo de anomalías en datasets, validación de fuentes, alertas de drift.",
    auditingGuidelines: [
      "Verificar que las fuentes de datos proporcionadas a sistemas de IA son validadas para prevenir ingesta de datos maliciosos.",
      "Verificar que existen procesos de aseguramiento de calidad para identificar y remover datos corruptos o sospechosos.",
      "Verificar que hay herramientas de monitoreo automatizado para detectar patrones anómalos indicativos de envenenamiento.",
      "Verificar que los controles de acceso previenen modificación o inserción no autorizada de datos usados en IA.",
      "Verificar que el plan de respuesta a incidentes cubre amenazas de data poisoning con detección, reporte y remediación.",
      "Verificar que los empleados están capacitados para reconocer potenciales amenazas de envenenamiento de datos."
    ],
    weight: 1.1
  },
  // --- Logging and Monitoring (LOG) ---
  {
    id: "LOG-01",
    domain: "Logging and Monitoring",
    title: "Logging and Monitoring Policy and Procedures",
    question: "¿Se han establecido, documentado, aprobado y comunicado políticas y procedimientos de logging y monitoreo, con revisión al menos anual o ante cambios significativos?",
    evidenceHint: "Política de logging aprobada, estándares de retención, procedimientos de revisión, registro de cambios.",
    auditingGuidelines: [
      "Verificar que los logs específicos del cliente, incluyendo uso de API y comportamiento de respuestas del modelo, son accesibles y auditables.",
      "Verificar que los logs se revisan para validar decisiones del modelo cuando la IA se usa en toma de decisiones críticas.",
      "Confirmar que los logs están integrados en el SOC o sistema SIEM de la organización.",
      "Validar la capacidad de generar artefactos forenses de los logs en caso de disputas sobre outputs del modelo.",
      "Verificar que las alertas basadas en políticas de logging están activamente monitoreadas y atendidas.",
      "Confirmar que las políticas son comunicadas, revisadas al menos anualmente y aprobadas por stakeholders relevantes."
    ],
    weight: 1
  },
  {
    id: "LOG-14",
    domain: "Logging and Monitoring",
    title: "Input Monitoring",
    question: "¿Se registran y monitorean todos los eventos de entrada (contenido y metadata) para habilitar auditoría y reporting sobre el uso de modelos de IA?",
    evidenceHint: "Logs de prompts/inputs, metadata de sesión, correlación de eventos, sistema de auditoría de entradas.",
    auditingGuidelines: [
      "Verificar que los logs internos capturan prompts, documentos o inputs enviados a modelos de IA.",
      "Verificar que la metadata incluye rol de usuario, sistema de origen y uso previsto.",
      "Confirmar que existen procedimientos de revisión para validar si tipos de input no autorizados son bloqueados.",
      "Verificar la segregación de logs entre unidades de negocio que usan el mismo sistema de IA.",
      "Verificar que los logs se revisan como parte de validación post-deployment o red-teaming.",
      "Confirmar almacenamiento seguro y políticas de eliminación para logs que contengan contenido sensible."
    ],
    weight: 1.1
  },
  {
    id: "LOG-15",
    domain: "Logging and Monitoring",
    title: "Output Monitoring",
    question: "¿Se registran y monitorean todos los eventos de salida (contenido y metadata) para habilitar auditoría y reporting sobre el uso de modelos de IA?",
    evidenceHint: "Logs de respuestas/outputs, alertas de contenido anómalo, dashboards de monitoreo, métricas de calidad.",
    auditingGuidelines: [
      "Verificar que los logs capturan outputs de IA retornados a través de interfaces o sistemas downstream integrados.",
      "Verificar que los logs incluyen contexto de negocio (ID de caso de uso, departamento, grupo de usuario).",
      "Verificar que el monitoreo rastrea inconsistencias o cambios en el comportamiento de los outputs.",
      "Confirmar almacenamiento tamper-proof para logs vinculados a outputs regulatorios (ej. decisiones de crédito).",
      "Verificar que outputs que disparan acciones (alertas, decisiones) son trazables a través de los logs.",
      "Verificar que modificaciones no autorizadas a outputs son detectadas y flaggeadas."
    ],
    weight: 1.1
  },
  // --- Model Security (MDS) ---
  {
    id: "MDS-01",
    domain: "Model Security",
    title: "Training Pipeline Security",
    question: "¿Se han definido, implementado y evaluado políticas, procedimientos y medidas técnicas que aseguren la seguridad del pipeline de entrenamiento, con revisión periódica ante nuevas amenazas?",
    evidenceHint: "Seguridad de pipeline ML, controles de acceso a datos de training, validación de integridad, hardening de infraestructura.",
    auditingGuidelines: [
      "Revisar contratos/SLAs con proveedores para cláusulas de seguridad del pipeline de entrenamiento.",
      "Evaluar la seguridad del proveedor revisando certificaciones, reportes de auditoría del AP, OSP y MP.",
      "Verificar documentación de revisión periódica del proveedor por parte de la organización.",
      "Validar las garantías de seguridad del proveedor requiriendo evidencia documentada (certificaciones, auditorías de terceros).",
      "Revisar reportes de pruebas adversariales que cubran vectores de ataque relevantes con métodos reconocidos.",
      "Exigir logs de cambios de modelo transparentes que registren actualizaciones, cambios de datos/arquitectura y riesgos asociados."
    ],
    weight: 1.1
  },
  {
    id: "MDS-06",
    domain: "Model Security",
    title: "Adversarial Attack Analysis",
    question: "¿Se han definido, implementado y evaluado procesos y medidas técnicas para evaluar amenazas adversariales específicas para cada modelo de IA?",
    evidenceHint: "Red teaming de modelos, pruebas adversariales, análisis de robustez, documentación de vectores de ataque.",
    auditingGuidelines: [
      "Examinar procesos documentados para analizar amenazas adversariales específicas a las implementaciones de IA.",
      "Verificar la identificación de vectores de ataque incluyendo manipulación de inputs, explotación de contexto y prompt engineering.",
      "Evaluar el framework de priorización de amenazas según arquitectura de la aplicación y patrones de interacción de usuario.",
      "Verificar la implementación de sistemas de monitoreo para detectar indicadores de ataque a nivel de aplicación.",
      "Revisar procedimientos de prueba de defensas contra amenazas priorizadas.",
      "Verificar procesos para actualizar evaluaciones de amenazas cuando cambian features o surgen nuevas técnicas de ataque."
    ],
    weight: 1.1
  },
  {
    id: "MDS-10",
    domain: "Model Security",
    title: "Model Continuous Monitoring",
    question: "¿Se han definido e implementado procesos y medidas técnicas para el monitoreo continuo de métricas de rendimiento del modelo, detectando cambios inesperados o degradación?",
    evidenceHint: "Dashboards de model performance, alertas de drift, métricas de accuracy/latency, registros de retraining.",
    auditingGuidelines: [
      "Examinar el monitoreo específico implementado para rastrear rendimiento del modelo en el contexto de la aplicación.",
      "Verificar que los patrones de interacción de usuario se capturan y correlacionan con el rendimiento del modelo.",
      "Evaluar la implementación de métricas customizadas relevantes a preocupaciones de rendimiento específicas.",
      "Revisar la integración del monitoreo con los procesos de respuesta a incidentes de la aplicación.",
      "Confirmar que los insights de monitoreo se comparten con los clientes de IA que usan la aplicación.",
      "Verificar procesos para escalar anomalías detectadas a proveedores upstream cuando sea necesario."
    ],
    weight: 1
  },
  // --- Audit & Assurance (A&A) ---
  {
    id: "A&A-01",
    domain: "Audit & Assurance",
    title: "Audit and Assurance Policy and Procedures",
    question: "¿Se han establecido, documentado, aprobado y comunicado políticas y procedimientos de auditoría y aseguramiento, con revisión al menos anual o ante cambios significativos?",
    evidenceHint: "Política de auditoría aprobada, plan anual de auditoría, estándares de referencia, actas de aprobación.",
    auditingGuidelines: [
      "Confirmar que los requisitos de auditoría para proveedores están declarados en políticas y contratos de adquisición.",
      "Validar si la política de aseguramiento mapea claramente las responsabilidades del proveedor cloud (modelo de responsabilidad compartida).",
      "Verificar si las políticas incluyen verificación regular de dónde residen los datos de IA en la nube y cumplimiento jurisdiccional.",
      "Examinar procedimientos de auditoría de cómo los empleados interactúan con herramientas de IA en la nube.",
      "Verificar que un proceso de revisión anual ha generado actualizaciones a las políticas de aseguramiento en los últimos 12 meses.",
      "Confirmar que existen procesos para monitorear, rastrear y cerrar hallazgos de auditoría con acciones correctivas documentadas."
    ],
    weight: 1
  },
  {
    id: "A&A-02",
    domain: "Audit & Assurance",
    title: "Independent Assessments",
    question: "¿Se realizan evaluaciones independientes de auditoría y aseguramiento según estándares relevantes al menos anualmente?",
    evidenceHint: "Reportes de auditoría independiente, certificaciones, informes de terceros, planes de remediación post-auditoría.",
    auditingGuidelines: [
      "Confirmar que la organización no depende únicamente de auditorías del proveedor y que realiza evaluaciones independientes de controles de IA.",
      "Examinar políticas y procedimientos que definen cómo se programan y conducen las evaluaciones independientes.",
      "Verificar que la organización mantiene y revisa periódicamente una lista de estándares y regulaciones aplicables.",
      "Confirmar que las evaluaciones se conducen con independencia y supervisión de gobierno (ej. comité de Board).",
      "Verificar que se realiza al menos una evaluación independiente anual con evidencia documentada que incluya servicios de terceros."
    ],
    weight: 1
  }
];

const answerScores = {
  YES: 1,
  PARTIAL: 0.5,
  NO: 0,
  NA: 0.75
};

let state = {
  setup: {
    orgName: "",
    sector: "",
    country: "",
    owner: "",
    provider: "Azure",
    role: "AI Client"
  },
  answers: {},
  evidence: {},
  updatedAt: null
};

const panels = ["homePanel", "setupPanel", "assessmentPanel", "resultsPanel"];

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  bindEvents();
  renderSetup();
  renderControls();
  updateProgress();
  renderResults();
});

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });

  document.getElementById("setupForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!saveSetupFromForm()) return;
    showPanel("assessmentPanel");
  });

  document.getElementById("viewResultsBtn").addEventListener("click", () => {
    if (!allControlsAnswered()) return;
    saveSetupFromForm({ silent: true });
    renderResults();
    showPanel("resultsPanel");
  });

  document.getElementById("exportBtn").addEventListener("click", exportResults);
  document.getElementById("startFromHomeBtn").addEventListener("click", () => showPanel("setupPanel"));
  document.getElementById("resetBtn").addEventListener("click", resetAssessment);
}

function bindChoiceGroup(containerId, field) {
  const container = document.getElementById(containerId);
  container.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
      container.querySelectorAll(".choice").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      state.setup[field] = button.dataset.value;
      persist();
    });
  });
}

function showPanel(panelId) {
  if (panelId === "resultsPanel" && !allControlsAnswered()) return;
  panels.forEach(id => document.getElementById(id).classList.toggle("active", id === panelId));
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.panel === panelId);
  });
  updateResultsAccess();
  document.querySelector(".shell").classList.toggle("landing-active", panelId === "homePanel");
  document.body.classList.toggle("on-landing", panelId === "homePanel");
  if (panelId === "resultsPanel") renderResults();
}

function renderSetup() {
  Object.entries(state.setup).forEach(([key, value]) => {
    const input = document.getElementById(key);
    if (input) input.value = value || "";
  });
}

function saveSetupFromForm(options = {}) {
  const form = document.getElementById("setupForm");
  const required = ["orgName", "sector", "country", "owner"];
  const missing = required.filter(id => !document.getElementById(id).value.trim());
  const error = document.getElementById("setupError");

  if (!options.silent && !form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  if (missing.length && !options.silent) {
    error.textContent = "Completa organización, sector, país y responsable antes de iniciar.";
    return false;
  }

  if (!missing.length) {
    required.forEach(id => {
      state.setup[id] = document.getElementById(id).value.trim();
    });
    error.textContent = "";
    persist();
  }
  return true;
}

function renderControls() {
  const grouped = controls.reduce((acc, control) => {
    acc[control.domain] ||= [];
    acc[control.domain].push(control);
    return acc;
  }, {});

  const html = Object.entries(grouped).map(([domain, items]) => `
    <article class="domain-card">
      <div class="domain-header">
        <h3>${domain}</h3>
        <p>${domainDescription(domain)}</p>
      </div>
      ${items.map(renderControl).join("")}
    </article>
  `).join("");

  document.getElementById("controlsContainer").innerHTML = html;

  controls.forEach(control => {
    const answerSelect = document.getElementById(`${control.id}-answer`);
    answerSelect.addEventListener("change", () => setAnswer(control.id, answerSelect.value));
    ["type", "status", "notes"].forEach(field => {
      const el = document.getElementById(`${control.id}-${field}`);
      el.addEventListener("input", () => setEvidence(control.id, field, el.value));
    });
    // File upload
    const fileInput = document.getElementById(`${control.id}-file`);
    fileInput.addEventListener("change", () => handleFileUpload(control.id, fileInput));
    // Remove file buttons
    document.querySelectorAll(`.remove-file[data-control="${control.id}"]`).forEach(btn => {
      btn.addEventListener("click", () => removeFile(control.id, parseInt(btn.dataset.index)));
    });
  });
}

function renderControl(control) {
  const answer = state.answers[control.id] || "";
  const evidence = state.evidence[control.id] || {};
  const files = evidence.files || [];
  return `
    <div class="control-card">
      <div class="control-header">
        <div class="control-id">${control.id}</div>
        <div class="control-title">${control.title}</div>
      </div>
      <p class="control-question">${control.question}</p>
      <div class="control-fields">
        <label>
          Cumplimiento
          <select id="${control.id}-answer" class="answer-select ${answerClass(answer)}">
            <option value="">Sin evaluar</option>
            <option value="YES" ${selected(answer, "YES")}>Sí</option>
            <option value="PARTIAL" ${selected(answer, "PARTIAL")}>Parcial</option>
            <option value="NO" ${selected(answer, "NO")}>No</option>
            <option value="NA" ${selected(answer, "NA")}>N/A</option>
          </select>
        </label>
        <label>
          Tipo evidencia
          <select id="${control.id}-type">
            <option value="">Sin clasificar</option>
            <option ${selected(evidence.type, "Política")}>Política</option>
            <option ${selected(evidence.type, "Configuración")}>Configuración</option>
            <option ${selected(evidence.type, "Log/Reporte")}>Log/Reporte</option>
            <option ${selected(evidence.type, "Ticket/Acta")}>Ticket/Acta</option>
          </select>
        </label>
        <label>
          Estado evidencia
          <select id="${control.id}-status">
            <option value="">No registrada</option>
            <option ${selected(evidence.status, "Suficiente")}>Suficiente</option>
            <option ${selected(evidence.status, "Parcial")}>Parcial</option>
            <option ${selected(evidence.status, "Pendiente")}>Pendiente</option>
          </select>
        </label>
      </div>
      <div class="control-notes-row">
        <label class="notes-label">
          Notas
          <textarea id="${control.id}-notes" placeholder="Observaciones, owner, link interno o brecha observada.">${escapeHtml(evidence.notes || "")}</textarea>
        </label>
        <label class="files-label">
          Archivos adjuntos
          <input type="file" id="${control.id}-file" multiple class="file-input">
          ${files.length ? `<ul class="file-list">${files.map((f, i) => `<li><span>${escapeHtml(f.name)}</span><button type="button" class="remove-file" data-control="${control.id}" data-index="${i}">×</button></li>`).join("")}</ul>` : ""}
        </label>
      </div>
      <p class="hint">Evidencia esperada: ${control.evidenceHint}</p>
      ${control.auditingGuidelines ? `
      <details class="audit-guidelines">
        <summary>Guía de Auditoría (AIC)</summary>
        <ol>${control.auditingGuidelines.map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ol>
      </details>` : ""}
    </div>
  `;
}

function answerClass(value) {
  const map = { YES: "answer-yes", PARTIAL: "answer-partial", NO: "answer-no", NA: "answer-na" };
  return map[value] || "";
}

function selected(current, expected) {
  return current === expected ? "selected" : "";
}

function setAnswer(controlId, value) {
  state.answers[controlId] = value;
  persist();
  renderControls();
  updateProgress();
  renderResults();
}

function setEvidence(controlId, field, value) {
  state.evidence[controlId] ||= {};
  state.evidence[controlId][field] = value;
  persist();
  renderResults();
}

function handleFileUpload(controlId, input) {
  const files = Array.from(input.files);
  if (!files.length) return;
  state.evidence[controlId] ||= {};
  state.evidence[controlId].files ||= [];

  const promises = files.map(file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ name: file.name, size: file.size, type: file.type, data: reader.result });
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(promises).then(results => {
    state.evidence[controlId].files.push(...results);
    persist();
    renderControls();
  });
}

function removeFile(controlId, index) {
  if (!state.evidence[controlId] || !state.evidence[controlId].files) return;
  state.evidence[controlId].files.splice(index, 1);
  persist();
  renderControls();
}

function allControlsAnswered() {
  return controls.every(c => state.answers[c.id] && state.answers[c.id] !== "");
}

function updateResultsAccess() {
  const ready = allControlsAnswered();
  const viewBtn = document.getElementById("viewResultsBtn");
  const navBtn = document.querySelector('.nav-item[data-panel="resultsPanel"]');
  if (viewBtn) viewBtn.disabled = !ready;
  if (navBtn) navBtn.disabled = !ready;
}

function updateProgress() {
  // Progress is now shown only in the results panel
  updateResultsAccess();
}

function renderResults() {
  const summary = buildSummary();
  document.getElementById("resultsIntro").textContent =
    `${state.setup.orgName || "Organización sin nombre"} · ${summary.answered}/${controls.length} controles respondidos · ${summary.level}`;

  document.getElementById("resultsContainer").innerHTML = `
    <div class="compliance-summary-table">
      <div class="cs-section cs-green">
        <h4>Compliance Status Summary</h4>
        <div class="cs-row">
          <div class="cs-cell">
            <span class="cs-label">Compliance Tasks [YES]</span>
            <span class="cs-value cs-val-green">${summary.yesCount}</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Non-Compliance [NO]</span>
            <span class="cs-value cs-val-red">${summary.noCount}</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Non-Compliance [Partial]</span>
            <span class="cs-value cs-val-amber">${summary.partialCount}</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">NC Total</span>
            <span class="cs-value cs-val-red">${summary.ncTotal}</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Excepciones aprobadas [N/A]</span>
            <span class="cs-value">${summary.naCount}</span>
          </div>
        </div>
      </div>
      <div class="cs-section cs-yellow">
        <h4>Compliance</h4>
        <div class="cs-row">
          <div class="cs-cell">
            <span class="cs-label">Compliance Level %</span>
            <span class="cs-value cs-val-big">${summary.complianceLevel}%</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Maturity Level</span>
            <span class="cs-value cs-val-big">${summary.maturity}</span>
          </div>
        </div>
      </div>
      <div class="cs-section cs-status cs-status-${summary.certStatus === 'Compliant' ? 'ok' : summary.certStatus === 'Partially Compliant' ? 'partial' : 'nc'}">
        <h4>Certification Status</h4>
        <span class="cs-status-label">${summary.certStatus}</span>
        <p>Para certificar, la organización debe ser compliant con el 100% de los controles aplicables.</p>
      </div>
    </div>

    <div class="results-grid">
      <article class="result-card">
        <p class="eyebrow">Score ponderado</p>
        <div class="score" style="color:${scoreColor(summary.score)}">${summary.score}</div>
        <span class="level">${summary.level}</span>
        <div class="progress-track" style="margin-top:12px">
          <div class="progress-bar" style="width:${summary.score}%"></div>
        </div>
      </article>
      <article class="result-card">
        <p class="eyebrow">Score por dominio</p>
        ${summary.domainScores.map(item => `
          <div class="metric-row">
            <strong>${shortDomain(item.domain)}</strong>
            <div class="metric-track"><div class="metric-fill" style="width:${item.score}%;background:${scoreColor(item.score)}"></div></div>
            <span>${item.score}</span>
          </div>
        `).join("")}
      </article>
    </div>

    <h3 class="section-title">Brechas priorizadas</h3>
    ${renderFindings(summary.findings)}

    <h3 class="section-title">Roadmap recomendado</h3>
    <div class="roadmap">
      ${summary.roadmap.map(item => `
        <article class="roadmap-card">
          <span class="tag ${item.severity}">${item.window}</span>
          <strong>${item.title}</strong>
          <p>${item.action}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderFindings(findings) {
  if (!findings.length) {
    return `<div class="empty-state">No hay brechas críticas registradas. Revisa controles marcados como N/A o evidencia pendiente antes de cerrar el assessment.</div>`;
  }
  return `
    <div class="findings">
      ${findings.slice(0, 6).map(item => `
        <article class="finding-card">
          <span class="tag ${item.severity}">${item.priority}</span>
          <strong>${item.id} · ${item.title}</strong>
          <p>${item.recommendation}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function buildSummary() {
  const answered = Object.keys(state.answers).length;
  const score = calculateScore(controls);
  const domains = [...new Set(controls.map(control => control.domain))];
  const domainScores = domains.map(domain => ({
    domain,
    score: calculateScore(controls.filter(control => control.domain === domain))
  }));
  const findings = buildFindings();

  // Compliance counts
  const yesCount = controls.filter(c => state.answers[c.id] === "YES").length;
  const noCount = controls.filter(c => state.answers[c.id] === "NO").length;
  const partialCount = controls.filter(c => state.answers[c.id] === "PARTIAL").length;
  const naCount = controls.filter(c => state.answers[c.id] === "NA").length;
  const ncTotal = noCount + partialCount;
  const applicableControls = controls.length - naCount;
  const complianceLevel = applicableControls > 0 ? Math.round((yesCount / applicableControls) * 100) : 0;

  // Maturity level (1-5)
  let maturity = 1;
  if (complianceLevel >= 90) maturity = 5;
  else if (complianceLevel >= 75) maturity = 4;
  else if (complianceLevel >= 55) maturity = 3;
  else if (complianceLevel >= 35) maturity = 2;

  // Certification status
  let certStatus = "Non-Compliant";
  if (complianceLevel === 100) certStatus = "Compliant";
  else if (complianceLevel >= 80) certStatus = "Partially Compliant";

  return {
    answered,
    score,
    level: maturityLevel(score, answered),
    domainScores,
    findings,
    roadmap: buildRoadmap(findings),
    yesCount,
    noCount,
    partialCount,
    naCount,
    ncTotal,
    complianceLevel,
    maturity,
    certStatus
  };
}

function calculateScore(items) {
  const answeredItems = items.filter(control => state.answers[control.id]);
  if (!answeredItems.length) return 0;
  const max = answeredItems.reduce((sum, control) => sum + control.weight, 0);
  const got = answeredItems.reduce((sum, control) => {
    return sum + (answerScores[state.answers[control.id]] || 0) * control.weight;
  }, 0);
  return Math.round(got / max * 100);
}

function maturityLevel(score, answered) {
  if (!answered) return "Sin evaluación";
  if (score >= 80) return "Madurez alta";
  if (score >= 60) return "En desarrollo";
  if (score >= 40) return "Inicial";
  return "Básico / brecha crítica";
}

function buildFindings() {
  return controls
    .filter(control => ["NO", "PARTIAL"].includes(state.answers[control.id]))
    .map(control => {
      const answer = state.answers[control.id];
      const ev = state.evidence[control.id] || {};
      const evidenceWeak = !ev.status || ev.status === "Pendiente";
      const severity = answer === "NO" || evidenceWeak ? "high" : "medium";
      return {
        id: control.id,
        title: control.title,
        priority: severity === "high" ? "Alta" : "Media",
        severity,
        recommendation: recommendationFor(control, answer, ev)
      };
    })
    .sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
}

function recommendationFor(control, answer, evidence) {
  if (answer === "NO") {
    return `Definir owner, evidencia mínima y plan de cierre para ${control.title.toLowerCase()} antes del siguiente ciclo de evaluación.`;
  }
  if (!evidence.status || evidence.status === "Pendiente") {
    return `Completar evidencia verificable para sostener la respuesta parcial del control ${control.id}.`;
  }
  return `Convertir la implementación parcial en práctica repetible con revisión periódica y trazabilidad documental.`;
}

function buildRoadmap(findings) {
  const hasCritical = findings.some(item => item.severity === "high");
  return [
    {
      window: "30 días",
      title: "Cerrar brechas críticas",
      severity: hasCritical ? "high" : "medium",
      action: hasCritical
        ? "Asignar owners, evidencia mínima y fechas de remediación para controles en No o con evidencia pendiente."
        : "Confirmar controles N/A y fortalecer evidencia de los controles parciales."
    },
    {
      window: "60 días",
      title: "Operacionalizar controles",
      severity: "medium",
      action: "Integrar políticas, validaciones, logging y revisión de proveedores al flujo operativo de seguridad y riesgo."
    },
    {
      window: "90 días",
      title: "Reevaluar y comparar",
      severity: "low",
      action: "Ejecutar un nuevo assessment, comparar score y preparar reporte ejecutivo para comité de riesgo o seguridad."
    }
  ];
}

function exportResults() {
  saveSetupFromForm({ silent: true });
  const summary = buildSummary();
  const payload = {
    meta: {
      tool: "CSA LATAM AICM Evaluator 2.0 - Modulo 4",
      date: new Date().toISOString(),
      organization: state.setup.orgName,
      sector: state.setup.sector,
      country: state.setup.country,
      owner: state.setup.owner,
      role: state.setup.role,
      provider: state.setup.provider
    },
    answers: state.answers,
    evidence: state.evidence,
    summary,
    roadmap: summary.roadmap
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `aicm-evaluator-${slugify(state.setup.orgName || "organizacion")}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function loadSampleData() {
  state = {
    setup: {
      orgName: "Banco Andina S.A.",
      sector: "Banca y servicios financieros",
      country: "Chile",
      owner: "Andrea Silva, GRC Lead",
      provider: "Azure",
      role: "AI Client"
    },
    answers: {
      "GRC-01": "PARTIAL",
      "GRC-02": "YES",
      "GRC-10": "NO",
      "GRC-15": "PARTIAL",
      "AIS-08": "PARTIAL",
      "AIS-09": "NO",
      "AIS-10": "YES",
      "AIS-15": "NO",
      "DSP-17": "PARTIAL",
      "DSP-20": "NO",
      "DSP-21": "NO",
      "LOG-01": "PARTIAL",
      "LOG-14": "NO",
      "LOG-15": "NO",
      "MDS-01": "PARTIAL",
      "MDS-06": "NO",
      "MDS-10": "NO",
      "A&A-01": "PARTIAL",
      "A&A-02": "NO"
    },
    evidence: {
      "GRC-01": { type: "Política", status: "Parcial", notes: "Borrador aprobado por seguridad, pendiente comité de riesgo." },
      "GRC-02": { type: "Log/Reporte", status: "Suficiente", notes: "Programa AIRM inicial documentado con registro de riesgos." },
      "GRC-10": { type: "Ticket/Acta", status: "Pendiente", notes: "No existe AI Impact Assessment formal." },
      "AIS-08": { type: "Configuración", status: "Parcial", notes: "Validaciones básicas implementadas; faltan pruebas adversariales." },
      "DSP-17": { type: "Política", status: "Parcial", notes: "Clasificación de datos existe pero sin controles DLP específicos para IA." },
      "LOG-14": { type: "Log/Reporte", status: "Pendiente", notes: "Logs técnicos existen pero no cubren inputs al modelo." },
      "MDS-06": { type: "Ticket/Acta", status: "Pendiente", notes: "No se han realizado pruebas adversariales al modelo." }
    },
    updatedAt: new Date().toISOString()
  };
  persist();
  renderSetup();
  renderControls();
  updateProgress();
  renderResults();
  showPanel("resultsPanel");
}

function resetAssessment() {
  const confirmed = window.confirm("¿Reiniciar evaluación y borrar el progreso local?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  state = {
    setup: { orgName: "", sector: "", country: "", owner: "", provider: "Azure", role: "AI Client" },
    answers: {},
    evidence: {},
    updatedAt: null
  };
  renderSetup();
  renderControls();
  updateProgress();
  renderResults();
  showPanel("setupPanel");
}

function persist() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.setup && stored.answers && stored.evidence) {
      state = stored;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function domainDescription(domain) {
  const map = {
    "Governance, Risk and Compliance": "Políticas de gobierno, gestión de riesgos de IA, AI Impact Assessment y supervisión humana (AICM GRC).",
    "Application & Interface Security": "Validación de inputs/outputs, seguridad de APIs y diferenciación de instrucciones (AICM AIS).",
    "Data Security & Privacy Lifecycle": "Protección de datos sensibles, proveniencia, transparencia y prevención de data poisoning (AICM DSP).",
    "Logging and Monitoring": "Políticas de logging, monitoreo de entradas y salidas del modelo para auditoría (AICM LOG).",
    "Model Security": "Seguridad del pipeline de entrenamiento, análisis adversarial y monitoreo continuo del modelo (AICM MDS).",
    "Audit & Assurance": "Políticas de auditoría, evaluaciones independientes y cumplimiento de estándares (AICM A&A)."
  };
  return map[domain] || "";
}

function shortDomain(domain) {
  const map = {
    "Governance, Risk and Compliance": "GRC",
    "Application & Interface Security": "AIS",
    "Data Security & Privacy Lifecycle": "DSP",
    "Logging and Monitoring": "LOG",
    "Model Security": "MDS",
    "Audit & Assurance": "A&A"
  };
  return map[domain] || domain;
}

function scoreColor(score) {
  if (score >= 80) return "var(--green)";
  if (score >= 60) return "var(--amber)";
  if (score >= 40) return "var(--violet)";
  return "var(--red)";
}

function severityRank(severity) {
  return { high: 1, medium: 2, low: 3 }[severity] || 4;
}

function slugify(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
