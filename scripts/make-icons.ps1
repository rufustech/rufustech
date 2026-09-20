# Generates the PWA / touch icons referenced by public/manifest.json and
# public/index.html:
#
#   public/logo192.png            (Android home screen)
#   public/logo512.png            (splash / store listing)
#   public/apple-touch-icon.png   (iOS home screen, 180x180)
#
# Run from the project root:
#   powershell -ExecutionPolicy Bypass -File scripts/make-icons.ps1
#
# ASCII-only source: Windows PowerShell 5.1 reads .ps1 as ANSI without a BOM.

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot

function New-Icon {
    param(
        [int]$Size,
        [string]$OutFile,
        [switch]$Rounded
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # background: near-black with a teal wash, matching the site
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.Color]::FromArgb(255, 9, 11, 13),
        [System.Drawing.Color]::FromArgb(255, 4, 44, 44),
        45.0)

    if ($Rounded) {
        # maskable-friendly rounded square
        $r = [int]($Size * 0.22)
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddArc(0, 0, ($r * 2), ($r * 2), 180, 90)
        $path.AddArc(($Size - $r * 2), 0, ($r * 2), ($r * 2), 270, 90)
        $path.AddArc(($Size - $r * 2), ($Size - $r * 2), ($r * 2), ($r * 2), 0, 90)
        $path.AddArc(0, ($Size - $r * 2), ($r * 2), ($r * 2), 90, 90)
        $path.CloseFigure()
        $g.FillPath($bg, $path)
    } else {
        $g.FillRectangle($bg, $rect)
    }

    # emerald glow in the upper right
    $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glowPath.AddEllipse(($Size * 0.45), (-$Size * 0.30), ($Size * 0.95), ($Size * 0.95))
    $glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
    $glow.CenterColor    = [System.Drawing.Color]::FromArgb(130, 16, 185, 129)
    $glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 16, 185, 129))
    $g.FillPath($glow, $glowPath)

    # "RD" monogram, optically centred
    $fontSize = [float]($Size * 0.40)
    $font = New-Object System.Drawing.Font('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold,
                                           [System.Drawing.GraphicsUnit]::Pixel)
    $fmt = New-Object System.Drawing.StringFormat
    $fmt.Alignment     = [System.Drawing.StringAlignment]::Center
    $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center

    $textRect = New-Object System.Drawing.RectangleF(0, (-$Size * 0.02), $Size, $Size)

    $white   = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $emerald = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))

    # "R" white, "D" emerald - drawn as one string per colour, offset so the
    # pair stays centred as a unit
    $full = 'RD'
    $fullW = $g.MeasureString($full, $font, $Size, $fmt).Width
    $rW    = $g.MeasureString('R', $font, $Size, $fmt).Width

    $startX = ($Size - $fullW) / 2
    $leftFmt = New-Object System.Drawing.StringFormat
    $leftFmt.Alignment     = [System.Drawing.StringAlignment]::Near
    $leftFmt.LineAlignment = [System.Drawing.StringAlignment]::Center

    $rRect = New-Object System.Drawing.RectangleF($startX, (-$Size * 0.02), $fullW, $Size)
    $g.DrawString('R', $font, $white, $rRect, $leftFmt)

    $dRect = New-Object System.Drawing.RectangleF(($startX + $rW * 0.82), (-$Size * 0.02), $fullW, $Size)
    $g.DrawString('D', $font, $emerald, $dRect, $leftFmt)

    $bmp.Save((Join-Path $root $OutFile), [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()

    $bytes = (Get-Item (Join-Path $root $OutFile)).Length
    Write-Host ("Wrote {0} ({1}x{1}, {2:N0} bytes)" -f $OutFile, $Size, $bytes)
}

New-Icon -Size 192 -OutFile 'public/logo192.png'
New-Icon -Size 512 -OutFile 'public/logo512.png'
New-Icon -Size 180 -OutFile 'public/apple-touch-icon.png' -Rounded
