# Recovery for the OneDrive/Turbopack `.next` corruption.
# Symptoms: "Persisting failed: Another write batch or compaction is already active",
# missing `[turbopack]_runtime.js` chunks, ENOENT on *-manifest.json, pages 500ing.
#
# Run from the project root:   powershell -File scripts\fix-next.ps1
# Then start dev again:        npm run dev

$ErrorActionPreference = "SilentlyContinue"
$root = Split-Path -Parent $PSScriptRoot   # scripts/ lives under the project root

Write-Host "1/2  Stopping Next dev processes..." -ForegroundColor Cyan
$killed = 0
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'next' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force; $killed++; Write-Host "     killed PID $($_.ProcessId)" }
if ($killed -eq 0) { Write-Host "     (none running)" }
Start-Sleep -Milliseconds 500

$next = Join-Path $root ".next"
Write-Host "2/2  Deleting $next ..." -ForegroundColor Cyan
if (Test-Path $next) {
  # rmdir first in case it is ever a junction (unlinks without touching a target);
  # then remove any real folder that remains.
  cmd /c rmdir "$next" 2>$null
  Remove-Item -Recurse -Force $next -ErrorAction SilentlyContinue
  Write-Host "     deleted" -ForegroundColor Green
} else {
  Write-Host "     (already gone)"
}

Write-Host ""
Write-Host "Done. Now run:  npm run dev" -ForegroundColor Green
