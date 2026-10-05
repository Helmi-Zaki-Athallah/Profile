$ErrorActionPreference = "Stop"
$dest = Join-Path $env:TEMP "portfolio-deploy.zip"
if (Test-Path $dest) {
    Remove-Item $dest -Force
}
$oldDest = Join-Path $PSScriptRoot "..\portfolio-deploy.zip"
if (Test-Path $oldDest) {
    Remove-Item $oldDest -Force
}
$backendDir = Join-Path $PSScriptRoot "..\backend"
$items = Get-ChildItem -Path $backendDir | Where-Object { $_.Name -ne "node_modules" }
Compress-Archive -Path $items.FullName -DestinationPath $dest -Force
Write-Host "Created archive successfully: $dest ($((Get-Item $dest).Length) bytes)"

