// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyBCoDivUd2pux4b6Deqz0DjbgtsZT4NjbM",
  authDomain: "ia-aplicada-al-desarrollo.firebaseapp.com",
  projectId: "ia-aplicada-al-desarrollo",
  storageBucket: "ia-aplicada-al-desarrollo.firebasestorage.app",
  messagingSenderId: "871287119450",
  appId: "1:871287119450:web:4824f9ff2cdc4ce8880263"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

let currentUser = null;

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
    implementationSteps: [
      "Designar un sponsor ejecutivo del programa de gobierno de IA con autoridad presupuestaria.",
      "Redactar política de uso responsable de IA alineada con ISO 42001 / NIST AI RMF.",
      "Definir matriz RACI con roles: CISO, CDO, Legal, Compliance y líneas de negocio.",
      "Establecer ciclo de revisión anual con checklist de aprobación y control de versiones.",
      "Comunicar la política a toda la organización y registrar evidencia de difusión."
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
    implementationSteps: [
      "Crear un registro de riesgos de IA con taxonomía específica (bias, hallucination, data leakage, model drift).",
      "Definir criterios de aceptación de riesgo aprobados por la dirección con umbrales cuantitativos.",
      "Asignar un risk owner por cada riesgo identificado con responsabilidad de tratamiento.",
      "Integrar el AIRM con el framework de riesgo empresarial existente (ERM).",
      "Implementar revisión trimestral del registro con evidencia de acciones de tratamiento."
    ],
    weight: 1.2
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
    implementationSteps: [
      "Implementar guardrails de input (Azure AI Content Safety, AWS Guardrails o equivalente).",
      "Configurar filtros específicos contra prompt injection, jailbreak y token manipulation.",
      "Definir reglas de validación de longitud, formato y contenido por caso de uso.",
      "Ejecutar ejercicios de AI Red Teaming trimestrales con escenarios adversariales documentados.",
      "Establecer métricas de efectividad (tasa de bloqueo, falsos positivos) con dashboards operativos."
    ],
    weight: 1.1
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
    implementationSteps: [
      "Diseñar arquitectura de prompts con separación explícita: system message, user input, context data.",
      "Implementar delimitadores estructurados (XML tags, markers) entre secciones del prompt.",
      "Configurar el modelo para rechazar instrucciones que intenten sobrescribir el system prompt.",
      "Ejecutar pruebas de indirect prompt injection con payloads en documentos y datos de contexto.",
      "Documentar la arquitectura de prompts y mantener versionamiento de system prompts en producción."
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
    implementationSteps: [
      "Implementar clasificación automática de datos (PII, PHI, financieros) antes de enviar a modelos de IA.",
      "Configurar DLP para bloquear envío de datos sensibles a servicios de IA no aprobados.",
      "Aplicar técnicas de anonimización/pseudonimización para datos usados en fine-tuning o RAG.",
      "Definir política de retención y eliminación de datos procesados por proveedores de IA.",
      "Realizar evaluaciones de privacidad (DPIA) antes de cada nuevo despliegue de IA con datos personales."
    ],
    weight: 1.2
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
    implementationSteps: [
      "Implementar checksums y firmas digitales para validar integridad de datasets de entrenamiento.",
      "Configurar controles de acceso estrictos (RBAC) para repositorios de datos de entrenamiento.",
      "Desplegar monitoreo de anomalías estadísticas en distribución de datos de entrada.",
      "Establecer pipeline de validación de calidad de datos con cuarentena automática de lotes sospechosos.",
      "Incluir escenarios de data poisoning en el plan de respuesta a incidentes con playbooks específicos."
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
    implementationSteps: [
      "Definir política de logging que cubra: prompts, respuestas, metadata de sesión y tokens consumidos.",
      "Configurar retención de logs según regulación local (mínimo 12 meses para auditoría).",
      "Integrar logs de IA con SIEM/SOC existente para correlación de eventos de seguridad.",
      "Implementar alertas automáticas por patrones anómalos (volumen, contenido, horario).",
      "Establecer procedimiento de revisión periódica de logs con responsable asignado."
    ],
    weight: 1
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
    implementationSteps: [
      "Exigir al proveedor certificaciones actualizadas (SOC 2 Type II, ISO 27001) del entorno de entrenamiento.",
      "Incluir cláusulas contractuales de seguridad del pipeline en SLAs con proveedores de modelos.",
      "Solicitar y revisar reportes de auditoría del proveedor (AP, OSP, MP) al menos anualmente.",
      "Validar que el proveedor mantiene changelog de modelo con registro de cambios de datos y arquitectura.",
      "Realizar evaluación de riesgo de la cadena de suministro del modelo antes de cada actualización mayor."
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
    implementationSteps: [
      "Realizar threat modeling específico para IA (STRIDE adaptado + OWASP Top 10 for LLMs).",
      "Ejecutar AI Red Teaming con herramientas especializadas (PyRIT, Garak, o equivalentes).",
      "Documentar vectores de ataque priorizados por impacto y probabilidad para cada modelo.",
      "Implementar monitoreo de indicadores de ataque (patrones de input anómalos, alta tasa de bloqueo).",
      "Establecer proceso de actualización de la evaluación de amenazas ante nuevas técnicas publicadas."
    ],
    weight: 1.1
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
    implementationSteps: [
      "Definir plan anual de auditoría de IA con alcance, frecuencia y estándares de referencia (AICM, ISO 42001).",
      "Mapear modelo de responsabilidad compartida con cada proveedor de IA (quién audita qué).",
      "Establecer tracker de hallazgos con estados, owners y fechas de cierre comprometidas.",
      "Programar revisión anual de la política de auditoría con aprobación formal del comité de gobierno.",
      "Verificar residencia de datos de IA y cumplimiento jurisdiccional al menos semestralmente."
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

const maturityLevels = [
  { value: "", label: "Sin evaluar", description: "" },
  { value: "L0", label: "L0 – Inexistente", description: "No hay proceso ni práctica definida para este control." },
  { value: "L1", label: "L1 – Ad Hoc", description: "Prácticas informales, reactivas, dependientes de individuos. Sin documentación." },
  { value: "L2", label: "L2 – Definido", description: "Procesos documentados y formalizados. Existe evidencia. Umbral de negligencia superado." },
  { value: "L3", label: "L3 – Gestionado", description: "Procesos medidos, monitoreados con métricas y mejorados continuamente." },
  { value: "L4", label: "L4 – Optimizado", description: "Prácticas proactivas, predictivas y adaptativas. Mejora continua automatizada." }
];

const maturityScores = { L0: 0, L1: 0.25, L2: 0.5, L3: 0.75, L4: 1 };

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
  maturity: {},
  updatedAt: null
};

const panels = ["homePanel", "setupPanel", "assessmentPanel", "resultsPanel"];

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  loadState();
  bindEvents();
  renderSetup();
  renderControls();
  updateProgress();
  renderResults();
});

// --- Auth Logic ---
function initAuth() {
  auth.onAuthStateChanged(user => {
    currentUser = user;
    updateAuthUI();
    if (user) {
      loadState().then(() => {
        renderSetup();
        renderControls();
        updateProgress();
        renderResults();
      });
    }
  });

  const authForm = document.getElementById("authForm");
  const authRegisterBtn = document.getElementById("authRegisterBtn");
  const authLogoutBtn = document.getElementById("authLogoutBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  authForm.addEventListener("submit", e => {
    e.preventDefault();
    authLogin();
  });

  authRegisterBtn.addEventListener("click", () => authRegister());
  authLogoutBtn.addEventListener("click", () => authLogout());
  logoutBtn.addEventListener("click", () => authLogout());

  document.getElementById("authForgotBtn").addEventListener("click", e => {
    e.preventDefault();
    authForgotPassword();
  });
}

async function authLogin() {
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const errorEl = document.getElementById("authError");
  errorEl.textContent = "";

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    errorEl.textContent = authErrorMessage(err.code);
  }
}

async function authRegister() {
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const errorEl = document.getElementById("authError");
  errorEl.textContent = "";

  if (password.length < 6) {
    errorEl.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (err) {
    errorEl.textContent = authErrorMessage(err.code);
  }
}

async function authForgotPassword() {
  const email = document.getElementById("authEmail").value.trim();
  const errorEl = document.getElementById("authError");
  errorEl.textContent = "";

  if (!email) {
    errorEl.textContent = "Ingresa tu email para recuperar la contraseña.";
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    errorEl.style.color = "var(--green)";
    errorEl.textContent = "✓ Se envió un enlace de recuperación a " + email;
    setTimeout(() => { errorEl.style.color = ""; }, 5000);
  } catch (err) {
    errorEl.textContent = authErrorMessage(err.code);
  }
}

function authLogout() {
  auth.signOut();
  currentUser = null;
  updateAuthUI();
}

function updateAuthUI() {
  const authSection = document.getElementById("authSection");
  const authForm = document.getElementById("authForm");
  const authLogged = document.getElementById("authLogged");
  const authLoggedEmail = document.getElementById("authLoggedEmail");
  const userBar = document.getElementById("userBar");
  const userEmail = document.getElementById("userEmail");

  if (currentUser) {
    authForm.style.display = "none";
    authSection.querySelector(".auth-subtitle").style.display = "none";
    authSection.querySelector(".auth-note").style.display = "none";
    authLogged.style.display = "flex";
    authLoggedEmail.textContent = currentUser.email;
    userBar.style.display = "flex";
    userEmail.textContent = currentUser.email;
  } else {
    authForm.style.display = "";
    authSection.querySelector(".auth-subtitle").style.display = "";
    authSection.querySelector(".auth-note").style.display = "";
    authLogged.style.display = "none";
    userBar.style.display = "none";
    userEmail.textContent = "";
  }
}

function authErrorMessage(code) {
  const messages = {
    "auth/user-not-found": "No existe una cuenta con ese email.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/invalid-credential": "Credenciales inválidas. Verifica email y contraseña.",
    "auth/email-already-in-use": "Ya existe una cuenta con ese email.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/invalid-email": "El formato del email no es válido.",
    "auth/too-many-requests": "Demasiados intentos. Intenta de nuevo más tarde."
  };
  return messages[code] || "Error de autenticación. Intenta de nuevo.";
}

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
    const missing = controlsMissingEvidence();
    if (missing.length) {
      alert(`Los siguientes controles tienen tipo de evidencia seleccionado pero no tienen archivo adjunto:\n\n${missing.join(", ")}\n\nAdjunta un archivo .txt o cambia el tipo a "Sin clasificar".`);
      return;
    }
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
    const matSelect = document.getElementById(`${control.id}-maturity`);
    matSelect.addEventListener("change", () => setMaturity(control.id, matSelect.value));
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
    // Download sample file
    document.querySelectorAll(`.download-sample[data-control="${control.id}"]`).forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        downloadSampleFile(control.id);
      });
    });
  });
}

function renderControl(control) {
  const answer = state.answers[control.id] || "";
  const mat = state.maturity[control.id] || "";
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
          Madurez (SCF)
          <select id="${control.id}-maturity" class="maturity-select ${maturityClass(mat)}" ${answer === "NA" ? "disabled" : ""}>
            ${maturityLevels.filter(ml => allowedMaturity(answer).includes(ml.value)).map(ml => `<option value="${ml.value}" ${selected(mat, ml.value)}>${ml.label}</option>`).join("")}
          </select>
        </label>
        <label>
          Tipo evidencia
          <select id="${control.id}-type" ${answer === "NA" ? "disabled" : ""}>
            <option value="">Sin clasificar</option>
            <option ${selected(evidence.type, "Política")}>Política</option>
            <option ${selected(evidence.type, "Configuración")}>Configuración</option>
            <option ${selected(evidence.type, "Log/Reporte")}>Log/Reporte</option>
            <option ${selected(evidence.type, "Ticket/Acta")}>Ticket/Acta</option>
          </select>
        </label>
        <label>
          Estado evidencia
          <select id="${control.id}-status" ${!evidence.type || answer === "NA" ? "disabled" : ""}>
            ${allowedStatus(evidence.type, answer).map(s => `<option value="${s}" ${selected(evidence.status, s)}>${s || "No registrada"}</option>`).join("")}
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
          <input type="file" id="${control.id}-file" multiple accept=".txt" class="file-input">
          <span class="file-note">Prototipo: solo archivos .txt (máx. 1 MB) · <a href="#" class="download-sample" data-control="${control.id}">Descargar archivo de prueba</a></span>
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

function maturityClass(value) {
  const map = { L0: "mat-l0", L1: "mat-l1", L2: "mat-l2", L3: "mat-l3", L4: "mat-l4" };
  return map[value] || "";
}

// Coherence: allowed maturity levels per compliance answer
function allowedMaturity(answer) {
  switch (answer) {
    case "NO":      return ["", "L0", "L1"];
    case "PARTIAL": return ["", "L1", "L2"];
    case "YES":     return ["", "L2", "L3", "L4"];
    case "NA":      return [""];
    default:        return ["", "L0", "L1", "L2", "L3", "L4"];
  }
}

// Coherence: allowed evidence status per type + compliance
function allowedStatus(type, answer) {
  if (!type) return [""];
  switch (answer) {
    case "NO":      return ["", "Pendiente"];
    case "PARTIAL": return ["", "Suficiente", "Parcial", "Pendiente"];
    case "YES":     return ["", "Suficiente", "Parcial", "Pendiente"];
    default:        return ["", "Suficiente", "Parcial", "Pendiente"];
  }
}

function selected(current, expected) {
  return current === expected ? "selected" : "";
}

function setAnswer(controlId, value) {
  state.answers[controlId] = value;
  // Auto-correct maturity if now invalid
  const allowed = allowedMaturity(value);
  if (state.maturity[controlId] && !allowed.includes(state.maturity[controlId])) {
    state.maturity[controlId] = "";
  }
  // Clear evidence type/status if N/A
  if (value === "NA") {
    state.evidence[controlId] = state.evidence[controlId] || {};
    state.evidence[controlId].type = "";
    state.evidence[controlId].status = "";
  } else {
    // Auto-correct evidence status if now invalid
    const ev = state.evidence[controlId] || {};
    const allowedSt = allowedStatus(ev.type || "", value);
    if (ev.status && !allowedSt.includes(ev.status)) {
      state.evidence[controlId] = state.evidence[controlId] || {};
      state.evidence[controlId].status = "";
    }
  }
  persist();
  renderControls();
  updateProgress();
  renderResults();
}

function setMaturity(controlId, value) {
  state.maturity[controlId] = value;
  persist();
  renderControls();
  renderResults();
}

function setEvidence(controlId, field, value) {
  state.evidence[controlId] ||= {};
  state.evidence[controlId][field] = value;
  // Auto-correct status if type changes and status is now invalid
  if (field === "type") {
    const answer = state.answers[controlId] || "";
    const allowed = allowedStatus(value, answer);
    if (state.evidence[controlId].status && !allowed.includes(state.evidence[controlId].status)) {
      state.evidence[controlId].status = "";
    }
  }
  persist();
  renderControls();
  renderResults();
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["text/plain"];

function handleFileUpload(controlId, input) {
  const files = Array.from(input.files);
  if (!files.length) return;

  // Validate
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      alert(`El archivo "${file.name}" excede 1MB. Reduce su tamaño o selecciona otro.`);
      input.value = "";
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(`Tipo no permitido: "${file.name}". Solo archivos .txt para este prototipo.`);
      input.value = "";
      return;
    }
  }

  state.evidence[controlId] ||= {};
  state.evidence[controlId].files ||= [];

  if (!currentUser) return;

  const uploadPromises = files.map(file => {
    const path = `evidence/${currentUser.uid}/${controlId}/${Date.now()}_${file.name}`;
    const ref = storage.ref(path);
    return ref.put(file).then(snapshot => snapshot.ref.getDownloadURL()).then(url => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      path
    }));
  });

  Promise.all(uploadPromises).then(results => {
    state.evidence[controlId].files.push(...results);
    persist();
    renderControls();
  }).catch(err => {
    console.error("Upload error:", err);
    alert("Error al subir archivo. Verifica tu conexión.");
  });
}

function removeFile(controlId, index) {
  if (!state.evidence[controlId] || !state.evidence[controlId].files) return;
  const file = state.evidence[controlId].files[index];
  // Delete from Firebase Storage if has path
  if (file.path && currentUser) {
    storage.ref(file.path).delete().catch(err => console.warn("Delete error:", err));
  }
  state.evidence[controlId].files.splice(index, 1);
  persist();
  renderControls();
}

function downloadSampleFile(controlId) {
  const control = controls.find(c => c.id === controlId);
  const content = [
    `=== Evidencia de prueba: ${controlId} ===`,
    `Control: ${control.title}`,
    `Fecha: ${new Date().toLocaleDateString("es-CL")}`,
    ``,
    `Este archivo es un ejemplo de evidencia para el control ${controlId}.`,
    `En un escenario real, este documento contendría:`,
    ``,
    `- ${control.evidenceHint}`,
    ``,
    `--- Fin del archivo de prueba ---`
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `evidencia_prueba_${controlId}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function allControlsAnswered() {
  return controls.every(c => state.answers[c.id] && state.answers[c.id] !== "");
}

function controlsMissingEvidence() {
  return controls
    .filter(c => {
      const ev = state.evidence[c.id] || {};
      const hasType = ev.type && ev.type !== "";
      const hasFiles = ev.files && ev.files.length > 0;
      return hasType && !hasFiles;
    })
    .map(c => c.id);
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
  renderControlsProgress();
}

function renderControlsProgress() {
  const container = document.getElementById("controlsProgress");
  if (!container) return;
  const html = controls.map(c => {
    const answered = state.answers[c.id] && state.answers[c.id] !== "";
    return `<div class="cp-item">
      <span class="cp-dot ${answered ? "cp-done" : ""}"></span>
      <span class="cp-label">${c.id}</span>
    </div>`;
  }).join("");
  const total = controls.length;
  const done = controls.filter(c => state.answers[c.id] && state.answers[c.id] !== "").length;
  container.innerHTML = `
    <div class="cp-header"><strong>${done}/${total}</strong> evaluados</div>
    ${html}
  `;
}

function renderResults() {
  const summary = buildSummary();
  document.getElementById("resultsIntro").textContent =
    `${state.setup.orgName || "Organización sin nombre"} · ${summary.answered}/${controls.length} controles respondidos · Madurez: ${summary.maturityLevelValue} (${summary.maturityLevelLabel})`;

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
        <h4>Compliance & Maturity</h4>
        <div class="cs-row">
          <div class="cs-cell">
            <span class="cs-label">Compliance Level %</span>
            <span class="cs-value cs-val-big">${summary.complianceLevel}%</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Maturity Level (SCF)</span>
            <span class="cs-value cs-val-big">${summary.maturityLevelValue}</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Avg. Maturity Score</span>
            <span class="cs-value cs-val-big">${summary.avgMaturityScore}/4.0</span>
          </div>
          <div class="cs-cell">
            <span class="cs-label">Controles evaluados</span>
            <span class="cs-value">${summary.maturityAssessedCount}/${controls.length}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="results-grid">
      <article class="result-card">
        <p class="eyebrow">Compliance Score</p>
        <div class="score" style="color:${scoreColor(summary.complianceLevel)}">${summary.complianceLevel}%</div>
        <span class="level">${summary.yesCount} de ${controls.length - summary.naCount} controles conformes</span>
        <div class="progress-track" style="margin-top:12px">
          <div class="progress-bar" style="width:${summary.complianceLevel}%"></div>
        </div>
      </article>
      <article class="result-card">
        <p class="eyebrow">Maturity Level (SCF C|P-CMM)</p>
        <div class="score" style="color:${scoreColor(summary.avgMaturityScore / 4 * 100)}">${summary.maturityLevelValue}</div>
        <span class="level">${summary.maturityLevelLabel} · ${summary.avgMaturityScore}/4.0</span>
        <div class="progress-track" style="margin-top:12px">
          <div class="progress-bar" style="width:${summary.avgMaturityScore / 4 * 100}%"></div>
        </div>
      </article>
      <article class="result-card">
        <p class="eyebrow">Implementación por dominio</p>
        ${summary.domainScores.map(item => `
          <div class="metric-row">
            <strong>${shortDomain(item.domain)}</strong>
            <div class="metric-track"><div class="metric-fill" style="width:${item.score}%;background:${scoreColor(item.score)}"></div></div>
            <span>${item.score}</span>
          </div>
        `).join("")}
      </article>
    </div>

    <h3 class="section-title">Madurez por dominio (SCF C|P-CMM · L0–L4)</h3>
    <div class="maturity-domains">
      ${summary.domainMaturity.map(dm => `
        <div class="mat-domain-row">
          <strong>${shortDomain(dm.domain)}</strong>
          <div class="mat-bar-track">
            <div class="mat-bar-fill" style="width:${(dm.avg / 4) * 100}%;background:${matBarColor(dm.avg)}"></div>
          </div>
          <span class="mat-val">${dm.avg}/4.0</span>
          <span class="mat-count">(${dm.assessed}/${dm.total})</span>
        </div>
      `).join("")}
      <p class="mat-legend">
        <span class="mat-leg-item"><span class="mat-dot" style="background:#ef4444"></span>L0–L1 Inexistente/Ad Hoc</span>
        <span class="mat-leg-item"><span class="mat-dot" style="background:#f59e0b"></span>L2 Definido</span>
        <span class="mat-leg-item"><span class="mat-dot" style="background:#22c55e"></span>L3–L4 Gestionado/Optimizado</span>
      </p>
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
      ${findings.slice(0, 10).map(item => `
        <article class="finding-card">
          <span class="tag ${item.severity}">${item.priority}</span>
          <strong>${item.id} · ${item.title}</strong>
          <p>${item.recommendation}</p>
          ${item.implementationSteps.length ? `
          <details class="impl-steps">
            <summary>Recomendaciones de implementación</summary>
            <ol>${item.implementationSteps.map(s => `<li>${s}</li>`).join("")}</ol>
          </details>` : ""}
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

  // Maturity model (SCF C|P-CMM adapted L0–L4)
  const maturityAssessed = controls.filter(c => state.maturity[c.id] && state.maturity[c.id] !== "");
  const avgMaturityScore = maturityAssessed.length > 0
    ? maturityAssessed.reduce((sum, c) => sum + (maturityScores[state.maturity[c.id]] || 0), 0) / maturityAssessed.length
    : 0;
  let maturityLevelValue = "L0";
  if (avgMaturityScore >= 0.875) maturityLevelValue = "L4";
  else if (avgMaturityScore >= 0.625) maturityLevelValue = "L3";
  else if (avgMaturityScore >= 0.375) maturityLevelValue = "L2";
  else if (avgMaturityScore >= 0.125) maturityLevelValue = "L1";

  const domainMaturity = domains.map(domain => {
    const domControls = controls.filter(c => c.domain === domain);
    const assessed = domControls.filter(c => state.maturity[c.id] && state.maturity[c.id] !== "");
    const avg = assessed.length > 0
      ? assessed.reduce((sum, c) => sum + (maturityScores[state.maturity[c.id]] || 0), 0) / assessed.length
      : 0;
    return { domain, avg: Math.round(avg * 4 * 10) / 10, assessed: assessed.length, total: domControls.length };
  });

  // Legacy maturity (1-5 from compliance %)
  let maturity = 1;
  if (complianceLevel >= 90) maturity = 5;
  else if (complianceLevel >= 75) maturity = 4;
  else if (complianceLevel >= 55) maturity = 3;
  else if (complianceLevel >= 35) maturity = 2;

  // Certification status
  let certStatus = "Non-Compliant";
  if (complianceLevel === 100) certStatus = "Compliant";
  else if (complianceLevel >= 80) certStatus = "Partially Compliant";

  // SCF Maturity level label
  const maturityLabels = { L0: "Inexistente", L1: "Ad Hoc", L2: "Definido", L3: "Gestionado", L4: "Optimizado" };
  const maturityLevelLabel = maturityLabels[maturityLevelValue] || "Sin evaluar";

  return {
    answered,
    score,
    domainScores,
    findings,
    roadmap: buildRoadmap(findings),
    yesCount,
    noCount,
    partialCount,
    naCount,
    ncTotal,
    complianceLevel,
    maturityLevelValue,
    maturityLevelLabel,
    avgMaturityScore: Math.round(avgMaturityScore * 4 * 10) / 10,
    maturityAssessedCount: maturityAssessed.length,
    domainMaturity
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
  if (score >= 80) return "Compliant";
  if (score >= 60) return "Parcialmente compliant";
  if (score >= 40) return "En desarrollo";
  return "No compliant";
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
        recommendation: recommendationFor(control, answer, ev),
        implementationSteps: control.implementationSteps || []
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
  const confirmed = window.confirm("¿Reiniciar evaluación? Todos los controles volverán a Sin evaluar, Sin clasificar y No registrada.");
  if (!confirmed) return;
  state.answers = {};
  state.evidence = {};
  state.maturity = {};
  persist();
  renderControls();
  updateProgress();
  renderResults();
}

function persist() {
  state.updatedAt = new Date().toISOString();
  // Save to localStorage as fallback
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Save to Firestore
  if (currentUser) {
    const docRef = db.collection("assessments").doc(currentUser.uid);
    docRef.set({
      ...state,
      ownerId: currentUser.uid,
      email: currentUser.email
    }).catch(err => console.warn("Firestore save error:", err));
  }
}

async function loadState() {
  // Try Firestore first
  if (currentUser) {
    try {
      const doc = await db.collection("assessments").doc(currentUser.uid).get();
      if (doc.exists) {
        const stored = doc.data();
        if (stored && stored.setup && stored.answers && stored.evidence) {
          stored.maturity = stored.maturity || {};
          state = stored;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          return;
        }
      }
    } catch (err) {
      console.warn("Firestore load error:", err);
    }
  }
  // Fallback to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.setup && stored.answers && stored.evidence) {
      stored.maturity = stored.maturity || {};
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

function matBarColor(avg) {
  if (avg >= 3) return "#22c55e";
  if (avg >= 2) return "#f59e0b";
  return "#ef4444";
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
