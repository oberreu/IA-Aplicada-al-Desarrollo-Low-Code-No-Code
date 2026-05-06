const STORAGE_KEY = "csaLatamAicmModulo4State";

const controls = [
  {
    id: "GRC-01",
    domain: "Gobierno, Riesgo y Cumplimiento",
    title: "Política de gobierno de IA",
    question: "¿Existe una política aprobada que defina responsabilidades, uso permitido, riesgos y controles mínimos para sistemas de IA?",
    evidenceHint: "Política de IA, acta de aprobación, matriz RACI o estándar interno publicado.",
    weight: 1
  },
  {
    id: "GRC-02",
    domain: "Gobierno, Riesgo y Cumplimiento",
    title: "Inventario de casos de uso",
    question: "¿La organización mantiene un inventario actualizado de casos de uso de IA, owners, criticidad y datos utilizados?",
    evidenceHint: "Registro de aplicaciones/modelos, inventario de proveedores, clasificación de criticidad.",
    weight: 1
  },
  {
    id: "GRC-03",
    domain: "Gobierno, Riesgo y Cumplimiento",
    title: "Evaluación de riesgo de IA",
    question: "¿Los casos de uso de IA pasan por una evaluación de riesgo antes de producción o uso operativo?",
    evidenceHint: "Formulario de risk assessment, criterios de aceptación, aprobaciones de riesgo.",
    weight: 1.2
  },
  {
    id: "AIS-01",
    domain: "Seguridad de Aplicaciones e Interfaces",
    title: "Validación de entrada",
    question: "¿La aplicación valida entradas para reducir prompt injection, instrucciones maliciosas, datos inválidos o uso fuera de política?",
    evidenceHint: "Pruebas de seguridad, reglas de validación, filtros, guardrails o casos negativos documentados.",
    weight: 1.1
  },
  {
    id: "AIS-02",
    domain: "Seguridad de Aplicaciones e Interfaces",
    title: "Seguridad de APIs",
    question: "¿Las APIs usadas por el sistema de IA tienen autenticación, autorización, gestión de claves y revisión periódica?",
    evidenceHint: "Configuración de API gateway, rotación de claves, pruebas de autorización, logs de acceso.",
    weight: 1
  },
  {
    id: "AIS-03",
    domain: "Seguridad de Aplicaciones e Interfaces",
    title: "Separación de instrucciones y datos",
    question: "¿El sistema diferencia instrucciones de sistema, instrucciones de usuario y datos para evitar comportamientos no deseados?",
    evidenceHint: "Diseño de prompts, pruebas adversariales, documentación de arquitectura o controles de contexto.",
    weight: 1.1
  },
  {
    id: "MDS-01",
    domain: "Seguridad de Modelos y Datos",
    title: "Protección de datos sensibles",
    question: "¿Existen controles para evitar que datos personales, confidenciales o regulados sean enviados indebidamente a modelos de IA?",
    evidenceHint: "Política DLP, clasificación de datos, anonimización, controles de privacidad o revisión legal.",
    weight: 1.2
  },
  {
    id: "MDS-02",
    domain: "Seguridad de Modelos y Datos",
    title: "Monitoreo de uso y salidas",
    question: "¿Se monitorean eventos, respuestas y anomalías relevantes para detectar abuso, errores o exposición de información?",
    evidenceHint: "Logs, alertas, tablero de monitoreo, métricas de seguridad o revisiones periódicas.",
    weight: 1
  },
  {
    id: "MDS-03",
    domain: "Seguridad de Modelos y Datos",
    title: "Gestión de proveedores de modelos",
    question: "¿Los proveedores de modelos o servicios de IA son evaluados con criterios de seguridad, privacidad y cumplimiento?",
    evidenceHint: "Due diligence, cuestionarios de terceros, contrato, DPA, evaluación de residencia de datos.",
    weight: 1
  },
  {
    id: "LOG-01",
    domain: "Gobierno, Riesgo y Cumplimiento",
    title: "Trazabilidad de decisiones",
    question: "¿Las decisiones relevantes del sistema de IA quedan trazadas con usuario, fecha, entrada, salida y versión/configuración usada?",
    evidenceHint: "Logs de auditoría, correlación de eventos, registros de prompts o metadatos de modelo.",
    weight: 1.1
  },
  {
    id: "LOG-02",
    domain: "Gobierno, Riesgo y Cumplimiento",
    title: "Evidencia para auditoría",
    question: "¿La organización puede reunir evidencia suficiente para acreditar cumplimiento de los controles evaluados?",
    evidenceHint: "Repositorio de evidencias, tickets, reportes, actas de comité y evidencia técnica exportable.",
    weight: 1
  },
  {
    id: "LOG-03",
    domain: "Gobierno, Riesgo y Cumplimiento",
    title: "Revisión periódica",
    question: "¿Existe una revisión periódica de controles de IA con seguimiento de hallazgos y planes de remediación?",
    evidenceHint: "Minutas, tablero de hallazgos, plan de remediación, owners y fechas comprometidas.",
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

const panels = ["setupPanel", "assessmentPanel", "resultsPanel"];

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
  document.getElementById("loadSampleBtn").addEventListener("click", loadSampleData);

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
      "GRC-03": "NO",
      "AIS-01": "PARTIAL",
      "AIS-02": "YES",
      "AIS-03": "NO",
      "MDS-01": "PARTIAL",
      "MDS-02": "NO",
      "MDS-03": "PARTIAL",
      "LOG-01": "NO",
      "LOG-02": "PARTIAL",
      "LOG-03": "NO"
    },
    evidence: {
      "GRC-01": { type: "Política", status: "Parcial", notes: "Borrador aprobado por seguridad, pendiente comité de riesgo." },
      "GRC-02": { type: "Log/Reporte", status: "Suficiente", notes: "Inventario inicial en planilla controlada por arquitectura." },
      "GRC-03": { type: "Ticket/Acta", status: "Pendiente", notes: "No existe evaluación formal previa a producción." },
      "AIS-01": { type: "Configuración", status: "Parcial", notes: "Validaciones básicas implementadas; faltan pruebas adversariales." },
      "MDS-02": { type: "Log/Reporte", status: "Pendiente", notes: "Logs técnicos existen pero no hay alertas ni revisión periódica." }
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
    "Gobierno, Riesgo y Cumplimiento": "Define ownership, políticas, inventario, evaluación de riesgo, trazabilidad y evidencia para operar IA de forma gobernada.",
    "Seguridad de Aplicaciones e Interfaces": "Revisa guardrails, APIs y controles técnicos que reducen abuso o comportamiento no deseado.",
    "Seguridad de Modelos y Datos": "Evalúa protección de datos, monitoreo y gestión de proveedores de modelos o servicios de IA."
  };
  return map[domain] || "";
}

function shortDomain(domain) {
  return domain
    .replace("Gobierno, Riesgo y Cumplimiento", "GRC")
    .replace("Seguridad de Aplicaciones e Interfaces", "Aplicaciones")
    .replace("Seguridad de Modelos y Datos", "Modelos/Datos");
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
