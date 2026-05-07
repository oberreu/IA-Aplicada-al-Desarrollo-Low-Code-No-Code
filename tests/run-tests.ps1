param(
  [switch]$Quiet
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$failures = New-Object System.Collections.Generic.List[string]
$passes = 0

function Add-Pass($Name) {
  $script:passes += 1
  if (-not $Quiet) { Write-Host "[PASS] $Name" -ForegroundColor Green }
}

function Add-Fail($Name, $Details) {
  $script:failures.Add("$Name - $Details")
  Write-Host "[FAIL] $Name - $Details" -ForegroundColor Red
}

function Assert-True($Name, $Condition, $Details) {
  if ($Condition) { Add-Pass $Name } else { Add-Fail $Name $Details }
}

function Read-RepoFile($Path) {
  $fullPath = Join-Path $repoRoot $Path
  if (-not (Test-Path $fullPath)) { throw "Archivo no encontrado: $Path" }
  Get-Content -LiteralPath $fullPath -Raw
}

function Get-Matches($Text, $Pattern) {
  [regex]::Matches($Text, $Pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
}

$index = Read-RepoFile "index.html"
$app = Read-RepoFile "app.js"
$readme = Read-RepoFile "README.md"
$execDoc = Read-RepoFile "Documento_Ejecutivo.md"
$reflection = Read-RepoFile "Reflexion_Individual.md"

Assert-True "Archivos base existen" `
  ((Test-Path (Join-Path $repoRoot "index.html")) -and (Test-Path (Join-Path $repoRoot "app.js")) -and (Test-Path (Join-Path $repoRoot "styles.css"))) `
  "Falta index.html, app.js o styles.css"

$localRefs = Get-Matches $index '(?:href|src)="([^":?#]+)(?:[?#][^"]*)?"' |
  ForEach-Object { $_.Groups[1].Value } |
  Where-Object { $_ -match '\.(css|js)$' -and $_ -notmatch '^https?://' }
$missingRefs = @($localRefs | Where-Object { -not (Test-Path (Join-Path $repoRoot $_)) })
Assert-True "Referencias locales HTML existen" ($missingRefs.Count -eq 0) ("No existen: " + ($missingRefs -join ", "))

$indexIds = Get-Matches $index 'id="([^"]+)"' | ForEach-Object { $_.Groups[1].Value }
$appGeneratedIds = Get-Matches $app 'id="([^"$]+)"' | ForEach-Object { $_.Groups[1].Value }
$declaredIds = @($indexIds + $appGeneratedIds) | Sort-Object -Unique
$referencedIds = Get-Matches $app 'getElementById\("([^"$]+)"\)' | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$missingIds = @($referencedIds | Where-Object { $declaredIds -notcontains $_ })
Assert-True "IDs referenciados por JS existen" ($missingIds.Count -eq 0) ("IDs sin declarar: " + ($missingIds -join ", "))

$controlMatch = [regex]::Match($app, 'const controls = \[(.*?)\];\s*const answerScores', [System.Text.RegularExpressions.RegexOptions]::Singleline)
$controlBlock = $controlMatch.Groups[1].Value
$controlBlockFound = $controlMatch.Success
$controlIds = Get-Matches $controlBlock 'id:\s*"([^"]+)"' | ForEach-Object { $_.Groups[1].Value }
$duplicateControls = @($controlIds | Group-Object | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name })
Assert-True "Bloque de controles detectable" $controlBlockFound "No se pudo localizar const controls"
Assert-True "Cantidad de controles AICM" ($controlIds.Count -eq 10) "Se esperaban 10 controles y hay $($controlIds.Count)"
Assert-True "IDs de controles unicos" ($duplicateControls.Count -eq 0) ("Duplicados: " + ($duplicateControls -join ", "))

$expectedDomains = @(
  "Governance, Risk and Compliance",
  "Application & Interface Security",
  "Data Security & Privacy Lifecycle",
  "Logging and Monitoring",
  "Model Security",
  "Audit & Assurance"
)
$missingDomains = @($expectedDomains | Where-Object { $controlBlock -notmatch [regex]::Escape($_) })
Assert-True "Dominios esperados presentes" ($missingDomains.Count -eq 0) ("Faltan dominios: " + ($missingDomains -join ", "))

Assert-True "renderFindings declarado" ($app -match 'function\s+renderFindings\s*\(\s*findings\s*\)') "Falta la función renderFindings"
Assert-True "renderFindings no quedo como bloque suelto" ($app -notmatch '(?s)function\s+renderRadarChart.*?\}\s*if\s*\(!findings\.length\)') "Parece existir un if (!findings.length) fuera de funcion"
Assert-True "Sin handlers inline" (($index + $app) -notmatch 'onclick=') "Hay onclick= inline"

Assert-True "Fallback Chart.js" ($app -match 'typeof\s+Chart\s*===\s*"undefined"') "No se encontró fallback para Chart.js"
Assert-True "Fallback html2pdf.js" ($app -match 'typeof\s+html2pdf\s*===\s*"undefined"') "No se encontró fallback para html2pdf.js"
Assert-True "Fallback Firebase/localStorage" (($app -match 'firebaseAvailable') -and ($app -match 'updateAuthUnavailableUI') -and ($app -match 'localStorage')) "No se encontró degradación local de Firebase"

Assert-True "Campos provider y role capturados" (($index -match 'id="provider"') -and ($index -match 'id="role"') -and ($app -match '"provider",\s*"role"')) "Falta provider/role en HTML o persistencia"
Assert-True "Boton de notificacion conectado" (($index -match 'id="notifyBtn"') -and ($app -match 'notifyBtn"\)\.addEventListener\("click",\s*sendCompletionNotification\)')) "notifyBtn no esta conectado"

$staleDemoTerms = @("loadSampleData", "GRC-10", "AIS-09", "AIS-10", "LOG-14", "A&A-02") |
  Where-Object { $app -match [regex]::Escape($_) }
Assert-True "Sin restos de caso demo/IDs antiguos" ($staleDemoTerms.Count -eq 0) ("Restos encontrados: " + ($staleDemoTerms -join ", "))

Assert-True "Documentos sincronizados a 10 controles" `
  (($readme -match '10 controles') -and ($execDoc -match '10 controles') -and ($reflection -match '10 controles') -and (($readme + $execDoc + $reflection) -notmatch '19 controles')) `
  "README/documentos mencionan conteos inconsistentes"

Assert-True "README documenta pruebas" ($readme -match 'tests/run-tests\.ps1') "README no incluye el ciclo de pruebas"

if ($failures.Count -gt 0) {
  Write-Host ""
  Write-Host "Resultado: $($failures.Count) fallo(s), $passes prueba(s) OK." -ForegroundColor Red
  foreach ($failure in $failures) { Write-Host " - $failure" -ForegroundColor Red }
  exit 1
}

Write-Host ""
Write-Host "Resultado: $passes prueba(s) OK, 0 fallos." -ForegroundColor Green
