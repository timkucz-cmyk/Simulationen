# Erzeugt vorschau.png (1200x750, heller Modus) für eine Simulation per Headless-Chrome.
# Aufruf aus dem Repo-Ordner:  powershell -File tools\vorschau.ps1 sims\physik\reihe-parallel
param([Parameter(Mandatory)][string]$Ordner)

$chrome = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { throw "Weder Chrome noch Edge gefunden." }

$ordner = (Resolve-Path $Ordner).Path
$seite  = Join-Path $ordner "index.html"
$bild   = Join-Path $ordner "vorschau.png"
$url    = ("file:///" + ($seite -replace '\\','/')) -replace ' ','%20'
$profil = Join-Path $env:TEMP "sim-vorschau-chrome"

Start-Process -Wait -FilePath $chrome -ArgumentList @(
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  "--user-data-dir=`"$profil`"", "--blink-settings=preferredColorScheme=1",
  "--force-device-scale-factor=1", "--window-size=1200,750",
  "--virtual-time-budget=4000", "--screenshot=`"$bild`"", "`"$url`""
)
Get-Item $bild | Select-Object FullName, Length
