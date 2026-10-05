Add-Type -AssemblyName System.Drawing

$inputPath = "d:\Helmi Zaki Athallah\public\foto\Helmi-live.png"
if (-not (Test-Path $inputPath)) {
    $inputPath = "d:\Helmi Zaki Athallah\public\foto\Helmi.png"
}

$src = [System.Drawing.Image]::FromFile($inputPath)
$w = $src.Width
$h = $src.Height
$cropSize = [Math]::Min($w, [int]($h * 0.52))
$left = [int](($w - $cropSize) / 2)
$top = [int]($h * 0.03)

$bmp = New-Object System.Drawing.Bitmap 128, 128
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(2, 2, 124, 124)
$g.SetClip($path)

$srcRect = New-Object System.Drawing.Rectangle $left, $top, $cropSize, $cropSize
$destRect = New-Object System.Drawing.Rectangle 0, 0, 128, 128
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.ResetClip()
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 69, 92, 233), 3)
$g.DrawEllipse($pen, 2, 2, 124, 124)

$g.Dispose()
$src.Dispose()

$outputPathPng = "d:\Helmi Zaki Athallah\public\favicon.png"
$outputPathTouch = "d:\Helmi Zaki Athallah\public\apple-touch-icon.png"

$bmp.Save($outputPathPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($outputPathTouch, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Favicon generated successfully from photo!"

