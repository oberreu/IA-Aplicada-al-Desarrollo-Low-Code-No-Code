# CSA LATAM AICM Evaluator 2.0

Prototipo funcional para la tarea del Modulo 4 de Low-Code / No-Code.

La herramienta permite ejecutar un assessment reducido basado en el CSA AI Controls Matrix (AICM), registrar evidencia, calcular madurez y exportar resultados en JSON.

## Alcance

- App estatica sin backend.
- 12 controles priorizados en espanol.
- 3 dominios funcionales: GRC, seguridad de aplicaciones y modelos/datos.
- Respuestas: Si, Parcial, No y N/A.
- Registro de tipo, estado y descripcion de evidencia por control.
- Guardado automatico en `localStorage`.
- Dashboard con score global, score por dominio, brechas y roadmap 30/60/90.
- Exportacion JSON.

## Inicio rapido

Para ver la version publica recomendada, abre:

```text
https://oberreu.github.io/IA-Aplicada-al-Desarrollo-Low-Code-No-Code/
```

Esa URL carga la herramienta funcional publicada con GitHub Pages.

## Uso local

Abre `index.html` en el navegador.

Tambien puedes servirlo localmente con cualquier servidor estatico:

```bash
python3 -m http.server 8080
```

Luego abre:

```text
http://localhost:8080
```

## Publicacion con GitHub Pages

Esta app funciona como sitio estatico desde la raiz del repositorio.

Configuracion actual en GitHub:

- Repository visibility: Public
- Pages source: Deploy from a branch
- Branch: `gh-pages`
- Folder: `/root`

## Flujo principal

1. Completar datos minimos de la organizacion.
2. Seleccionar proveedor cloud y rol evaluado.
3. Iniciar evaluacion.
4. Responder controles y registrar evidencia.
5. Revisar dashboard ejecutivo.
6. Exportar resultados en JSON.

## Persistencia

La app guarda el progreso en el navegador con la clave:

```text
csaLatamAicmModulo4State
```

El boton `Reiniciar` elimina el estado local y comienza una nueva evaluacion.

## Entregable academico

Esta version esta pensada para evidenciar funcionalidad real dentro de un alcance acotado:

- formularios operativos
- validacion basica
- botones con acciones reales
- gestion de datos local
- calculo automatico de score
- recomendaciones derivadas de respuestas
- exportacion de resultados

No reemplaza auditorias formales ni certificaciones CSA. Es una herramienta de diagnostico y preparacion.
