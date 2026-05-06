const STORAGE_KEY = "csaLatamAicmModulo4State";

const controls = [
  // --- Governance, Risk and Compliance (GRC) ---
  {
    id: "GRC-01",
    domain: "Governance, Risk and Compliance",
    title: "Governance Program Policy and Procedures",
    question: "¿La organización ha establecido, documentado, aprobado y comunicado políticas y procedimientos para un programa de gobierno de la información que incluya sistemas de IA, con revisión al menos anual?",
    evidenceHint: "Política de gobierno de IA aprobada, acta de aprobación, matriz RACI, estándar interno publicado, registro de revisiones.",
    weight: 1
  },
  {
    id: "GRC-02",
    domain: "Governance, Risk and Compliance",
    title: "Risk Management Program",
    question: "¿Existe un programa formal y documentado de gestión de riesgos de IA (AIRM) patrocinado por la dirección, que incluya identificación, evaluación, tratamiento y aceptación de riesgos?",
    evidenceHint: "Programa AIRM documentado, registro de riesgos, criterios de aceptación, aprobaciones de riesgo, owner por riesgo.",
    weight: 1.2
  },
  {
    id: "GRC-10",
    domain: "Governance, Risk and Compliance",
    title: "AI Impact Assessment",
    question: "¿Se ha establecido y comunicado un proceso de AI Impact Assessment con criterios para evaluar regularmente los impactos éticos, sociales, operativos, legales y de seguridad del sistema de IA a lo largo de su ciclo de vida?",
    evidenceHint: "Proceso de AI Impact Assessment documentado, criterios de evaluación, reportes de impacto, registros de stakeholders notificados.",
    weight: 1.2
  },
  {
    id: "GRC-15",
    domain: "Governance, Risk and Compliance",
    title: "Human Supervision",
    question: "¿Existen procesos, procedimientos y medidas técnicas para asegurar la supervisión y control humano del sistema de IA en cumplimiento con requisitos regulatorios y gestión de riesgos organizacional?",
    evidenceHint: "Procedimiento de human-in-the-loop, escalamiento, umbrales de intervención, evidencia de override humano.",
    weight: 1.1
  },
  // --- Application & Interface Security (AIS) ---
  {
    id: "AIS-08",
    domain: "Application & Interface Security",
    title: "Input Validation",
    question: "¿Se validan, filtran, modifican o bloquean las entradas contra patrones adversariales, patrones de fallo y comportamiento no deseado según las políticas organizacionales y regulaciones aplicables?",
    evidenceHint: "Reglas de validación, filtros de prompt injection, guardrails, pruebas de seguridad de inputs, casos negativos documentados.",
    weight: 1.1
  },
  {
    id: "AIS-09",
    domain: "Application & Interface Security",
    title: "Output Validation",
    question: "¿Se validan, filtran, modifican o bloquean las salidas del modelo contra patrones adversariales, patrones de fallo y comportamiento no deseado según las políticas organizacionales?",
    evidenceHint: "Filtros de output, content safety, pruebas de salidas tóxicas/sensibles, mecanismos de redacción automática.",
    weight: 1.1
  },
  {
    id: "AIS-10",
    domain: "Application & Interface Security",
    title: "API Security",
    question: "¿Se han definido e implementado procesos, procedimientos y medidas técnicas para asegurar las APIs, con revisión al menos anual o ante cambios significativos?",
    evidenceHint: "API gateway configurado, autenticación/autorización, rotación de claves, rate limiting, logs de acceso a APIs.",
    weight: 1
  },
  {
    id: "AIS-15",
    domain: "Application & Interface Security",
    title: "Prompt Differentiation",
    question: "¿Se implementan mecanismos que permitan al modelo distinguir claramente entre instrucciones del usuario, datos e instrucciones de sistema (system prompts)?",
    evidenceHint: "Arquitectura de prompts documentada, separación system/user/data, pruebas de indirect prompt injection, controles de contexto.",
    weight: 1.1
  },
  // --- Data Security and Privacy Lifecycle Management (DSP) ---
  {
    id: "DSP-17",
    domain: "Data Security & Privacy Lifecycle",
    title: "Sensitive Data Protection",
    question: "¿Se han definido e implementado procesos, procedimientos y medidas técnicas para proteger datos sensibles a lo largo de su ciclo de vida en el contexto del sistema de IA?",
    evidenceHint: "Política DLP, clasificación de datos, anonimización, controles de privacidad, PII detection, revisión legal.",
    weight: 1.2
  },
  {
    id: "DSP-20",
    domain: "Data Security & Privacy Lifecycle",
    title: "Data Provenance and Transparency",
    question: "¿Se documentan y trazan las fuentes de datos utilizadas por el modelo, y se hace disponible la información de procedencia según requisitos legales y regulatorios?",
    evidenceHint: "Registro de fuentes de datos, data lineage, documentación de datasets de entrenamiento, disclosure de proveniencia.",
    weight: 1
  },
  {
    id: "DSP-21",
    domain: "Data Security & Privacy Lifecycle",
    title: "Data Poisoning Prevention & Detection",
    question: "¿Se han definido, implementado y evaluado procesos y medidas técnicas para prevenir data poisoning en modelos de IA y detectarlo de forma continua?",
    evidenceHint: "Controles de integridad de datos de entrenamiento, monitoreo de anomalías en datasets, validación de fuentes, alertas de drift.",
    weight: 1.1
  },
  // --- Logging and Monitoring (LOG) ---
  {
    id: "LOG-01",
    domain: "Logging and Monitoring",
    title: "Logging and Monitoring Policy and Procedures",
    question: "¿Se han establecido, documentado, aprobado y comunicado políticas y procedimientos de logging y monitoreo, con revisión al menos anual o ante cambios significativos?",
    evidenceHint: "Política de logging aprobada, estándares de retención, procedimientos de revisión, registro de cambios.",
    weight: 1
  },
  {
    id: "LOG-14",
    domain: "Logging and Monitoring",
    title: "Input Monitoring",
    question: "¿Se registran y monitorean todos los eventos de entrada (contenido y metadata) para habilitar auditoría y reporting sobre el uso de modelos de IA?",
    evidenceHint: "Logs de prompts/inputs, metadata de sesión, correlación de eventos, sistema de auditoría de entradas.",
    weight: 1.1
  },
  {
    id: "LOG-15",
    domain: "Logging and Monitoring",
    title: "Output Monitoring",
    question: "¿Se registran y monitorean todos los eventos de salida (contenido y metadata) para habilitar auditoría y reporting sobre el uso de modelos de IA?",
    evidenceHint: "Logs de respuestas/outputs, alertas de contenido anómalo, dashboards de monitoreo, métricas de calidad.",
    weight: 1.1
  },
  // --- Model Security (MDS) ---
  {
    id: "MDS-01",
    domain: "Model Security",
    title: "Training Pipeline Security",
    question: "¿Se han definido, implementado y evaluado políticas, procedimientos y medidas técnicas que aseguren la seguridad del pipeline de entrenamiento, con revisión periódica ante nuevas amenazas?",
    evidenceHint: "Seguridad de pipeline ML, controles de acceso a datos de training, validación de integridad, hardening de infraestructura.",
    weight: 1.1
  },
  {
    id: "MDS-06",
    domain: "Model Security",
    title: "Adversarial Attack Analysis",
    question: "¿Se han definido, implementado y evaluado procesos y medidas técnicas para evaluar amenazas adversariales específicas para cada modelo de IA?",
    evidenceHint: "Red teaming de modelos, pruebas adversariales, análisis de robustez, documentación de vectores de ataque.",
    weight: 1.1
  },
  {
    id: "MDS-10",
    domain: "Model Security",
    title: "Model Continuous Monitoring",
    question: "¿Se han definido e implementado procesos y medidas técnicas para el monitoreo continuo de métricas de rendimiento del modelo, detectando cambios inesperados o degradación?",
    evidenceHint: "Dashboards de model performance, alertas de drift, métricas de accuracy/latency, registros de retraining.",
    weight: 1
  },
  // --- Audit & Assurance (A&A) ---
  {
    id: "A&A-01",
    domain: "Audit & Assurance",
    title: "Audit and Assurance Policy and Procedures",
    question: "¿Se han establecido, documentado, aprobado y comunicado políticas y procedimientos de auditoría y aseguramiento, con revisión al menos anual o ante cambios significativos?",
    evidenceHint: "Política de auditoría aprobada, plan anual de auditoría, estándares de referencia, actas de aprobación.",
    weight: 1
  },
  {
    id: "A&A-02",
    domain: "Audit & Assurance",
    title: "Independent Assessments",
    question: "¿Se realizan evaluaciones independientes de auditoría y aseguramiento según estándares relevantes al menos anualmente?",
    evidenceHint: "Reportes de auditoría independiente, certificaciones, informes de terceros, planes de remediación post-auditoría.",
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
    saveSetupFromForm({ silent: true });
    renderResults();
    showPanel("resultsPanel");
  });

  document.getElementById("exportBtn").addEventListener("click", exportResults);
  document.getElementById("resetBtn").addEventListener("click", resetAssessment);
  document.getElementById("startFromHomeBtn").addEventListener("click", () => showPanel("setupPanel"));

  bindChoiceGroup("providerChoices", "provider");
  bindChoiceGroup("roleChoices", "role");
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
  panels.forEach(id => document.getElementById(id).classList.toggle("active", id === panelId));
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.panel === panelId);
  });
  document.querySelector(".shell").classList.toggle("landing-active", panelId === "homePanel");
  document.body.classList.toggle("on-landing", panelId === "homePanel");
  if (panelId === "resultsPanel") renderResults();
}

function renderSetup() {
  Object.entries(state.setup).forEach(([key, value]) => {
    const input = document.getElementById(key);
    if (input) input.value = value || "";
  });
  selectChoice("providerChoices", state.setup.provider);
  selectChoice("roleChoices", state.setup.role);
}

function selectChoice(containerId, value) {
  document.querySelectorAll(`#${containerId} .choice`).forEach(button => {
    button.classList.toggle("selected", button.dataset.value === value);
  });
}

function saveSetupFromForm(options = {}) {
  const required = ["orgName", "sector", "country", "owner"];
  const missing = required.filter(id => !document.getElementById(id).value.trim());
  const error = document.getElementById("setupError");

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
    document.querySelectorAll(`[data-answer="${control.id}"]`).forEach(button => {
      button.addEventListener("click", () => setAnswer(control.id, button.dataset.value));
    });
    ["type", "status", "notes"].forEach(field => {
      const el = document.getElementById(`${control.id}-${field}`);
      el.addEventListener("input", () => setEvidence(control.id, field, el.value));
    });
  });
}

function renderControl(control) {
  const answer = state.answers[control.id] || "";
  const evidence = state.evidence[control.id] || {};
  return `
    <div class="control-card">
      <div class="control-top">
        <div>
          <div class="control-id">${control.id}</div>
          <div class="control-title">${control.title}</div>
          <p class="control-question">${control.question}</p>
        </div>
        <div class="answer-row" aria-label="Respuesta ${control.id}">
          ${answerButton(control.id, "YES", "Sí", "yes", answer)}
          ${answerButton(control.id, "PARTIAL", "Parcial", "partial", answer)}
          ${answerButton(control.id, "NO", "No", "no", answer)}
          ${answerButton(control.id, "NA", "N/A", "na", answer)}
        </div>
      </div>
      <div class="evidence-grid">
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
        <label>
          Descripción o enlace interno
          <textarea id="${control.id}-notes" placeholder="Describe evidencia disponible, owner, link interno o brecha observada.">${escapeHtml(evidence.notes || "")}</textarea>
        </label>
      </div>
      <p class="hint">Evidencia esperada: ${control.evidenceHint}</p>
    </div>
  `;
}

function answerButton(controlId, value, label, className, selectedValue) {
  const active = selectedValue === value ? "selected" : "";
  return `<button class="answer-button ${className} ${active}" data-answer="${controlId}" data-value="${value}" type="button">${label}</button>`;
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

function updateProgress() {
  const answered = Object.keys(state.answers).length;
  const total = controls.length;
  document.getElementById("progressLabel").textContent = `${answered}/${total}`;
  document.getElementById("progressBar").style.width = `${Math.round(answered / total * 100)}%`;
}

function renderResults() {
  const summary = buildSummary();
  document.getElementById("resultsIntro").textContent =
    `${state.setup.orgName || "Organización sin nombre"} · ${summary.answered}/${controls.length} controles respondidos · ${summary.level}`;

  document.getElementById("resultsContainer").innerHTML = `
    <div class="results-grid">
      <article class="result-card">
        <p class="eyebrow">Score global</p>
        <div class="score" style="color:${scoreColor(summary.score)}">${summary.score}</div>
        <span class="level">${summary.level}</span>
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
  return {
    answered,
    score,
    level: maturityLevel(score, answered),
    domainScores,
    findings,
    roadmap: buildRoadmap(findings)
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
