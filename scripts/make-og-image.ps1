# Generates public/og-image.jpg (1200x630) - the social / search preview card.
#
# Run from the project root:
#   powershell -ExecutionPolicy Bypass -File scripts/make-og-image.ps1
#
# NOTE: this file is deliberately ASCII-only. Windows PowerShell 5.1 reads .ps1
# files as ANSI unless they carry a UTF-8 BOM, so a literal non-ASCII character
# here would render as mojibake in the image. Build such characters with
# [char]0xNNNN instead.

Add-Type -AssemblyName System.Drawing

$root     = Split-Path -Parent $PSScriptRoot
$portrait = Join-Path $root 'src/assets/images/rufus.jpg'
$outPath  = Join-Path $root 'public/og-image.jpg'

$W = 1200
$H = 630

# Text column geometry. TEXT_W is the hard limit that keeps copy clear of the
# portrait on the right-hand side.
$TEXT_X = 72
$TEXT_W = 620

# Middot separator, built without a non-ASCII literal (see note above).
$DOT = [string][char]0x00B7
$SEP = " $DOT "

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# ---------------------------------------------------------------- background
$bgRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $bgRect,
    [System.Drawing.Color]::FromArgb(255, 8, 10, 12),
    [System.Drawing.Color]::FromArgb(255, 4, 42, 42),
    35.0)
$g.FillRectangle($bgBrush, $bgRect)

# emerald glow, top right
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(770, -230, 720, 720)
$glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glow.CenterColor    = [System.Drawing.Color]::FromArgb(115, 16, 185, 129)
$glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 16, 185, 129))
$g.FillPath($glow, $glowPath)

# sky glow, bottom left
$glow2Path = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow2Path.AddEllipse(-280, 290, 640, 640)
$glow2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2Path)
$glow2.CenterColor    = [System.Drawing.Color]::FromArgb(85, 56, 189, 248)
$glow2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 56, 189, 248))
$g.FillPath($glow2, $glow2Path)

# ------------------------------------------------------------------ portrait
# Sits far enough right that the text column never collides with it.
$d  = 340
$cx = 965
$cy = 315

if (Test-Path $portrait) {
    $src = [System.Drawing.Image]::FromFile($portrait)
    $destRect = New-Object System.Drawing.Rectangle(($cx - $d / 2), ($cy - $d / 2), $d, $d)

    $ringPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(235, 16, 185, 129), 7)
    $g.DrawEllipse($ringPen, ($cx - $d / 2 - 10), ($cy - $d / 2 - 10), ($d + 20), ($d + 20))

    # Square-crop the source, biased upward so the face is centred in the circle.
    $side = [Math]::Min($src.Width, $src.Height)
    $srcX = [int](($src.Width - $side) / 2)
    $srcY = [int](($src.Height - $side) / 7)

    $clip = New-Object System.Drawing.Drawing2D.GraphicsPath
    $clip.AddEllipse($destRect)
    $g.SetClip($clip)
    $g.DrawImage($src, $destRect, $srcX, $srcY, $side, $side,
                 [System.Drawing.GraphicsUnit]::Pixel)
    $g.ResetClip()
    $src.Dispose()
}

# ---------------------------------------------------------------------- text
$white   = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$emerald = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 211, 153))
$muted   = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 193, 199, 205))

$fKicker = New-Object System.Drawing.Font('Segoe UI Semibold', 14, [System.Drawing.FontStyle]::Bold)
$fName   = New-Object System.Drawing.Font('Segoe UI', 56, [System.Drawing.FontStyle]::Bold)
$fRole   = New-Object System.Drawing.Font('Segoe UI Semibold', 24, [System.Drawing.FontStyle]::Bold)
$fSub    = New-Object System.Drawing.Font('Segoe UI', 17, [System.Drawing.FontStyle]::Regular)
$fFoot   = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)

# Left-aligned, no wrapping, trimmed at the column edge so a long string can
# never bleed into the portrait.
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment     = [System.Drawing.StringAlignment]::Near
$fmt.Trimming      = [System.Drawing.StringTrimming]::EllipsisCharacter
$fmt.FormatFlags   = [System.Drawing.StringFormatFlags]::NoWrap

$lines = @(
    @{ text = 'AVAILABLE FOR FREELANCE + CONTRACT PROJECTS'; font = $fKicker; brush = $emerald; y = 86;  h = 26 },
    @{ text = 'Rufaro Mucheri';                              font = $fName;   brush = $white;   y = 116; h = 86 },
    @{ text = 'Full-Stack Software Developer';               font = $fRole;   brush = $emerald; y = 212; h = 40 },
    @{ text = "Cloud${SEP}DevOps${SEP}Systems Engineering";  font = $fRole;   brush = $emerald; y = 250; h = 40 },
    @{ text = "React${SEP}Node.js${SEP}Python${SEP}AWS${SEP}Docker${SEP}Linux"; font = $fSub; brush = $muted; y = 306; h = 28 },
    @{ text = "5+ years at Amazon Web Services${SEP}10+ platforms shipped";     font = $fSub; brush = $muted; y = 338; h = 28 }
)

foreach ($line in $lines) {
    $rect = New-Object System.Drawing.RectangleF($TEXT_X, $line.y, $TEXT_W, $line.h)
    $g.DrawString($line.text, $line.font, $line.brush, $rect, $fmt)

    # Report measured width so overflow is visible when regenerating.
    $size = $g.MeasureString($line.text, $line.font)
    $flag = if ($size.Width -gt $TEXT_W) { '  <-- TRUNCATED' } else { '' }
    Write-Host ("{0,5:N0}px / {1}px  {2}{3}" -f $size.Width, $TEXT_W, $line.text, $flag)
}

# divider + footer
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(95, 255, 255, 255), 2)
$g.DrawLine($linePen, $TEXT_X, 392, ($TEXT_X + $TEXT_W - 40), 392)

$footer = "Calgary, Alberta${SEP}Remote worldwide${SEP}rufarodev.com"
$footRect = New-Object System.Drawing.RectangleF($TEXT_X, 412, $TEXT_W, 30)
$g.DrawString($footer, $fFoot, $muted, $footRect, $fmt)

# ---------------------------------------------------------------------- save
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, 92)

$bmp.Save($outPath, $codec, $params)

$g.Dispose()
$bmp.Dispose()
Write-Host "`nWrote $outPath ($W x $H)"
