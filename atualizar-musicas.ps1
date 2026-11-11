# Atualiza music\playlist.js e wallpapers\lista.js com o que estiver nas pastas.
$ErrorActionPreference = 'Stop'
$base = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding $false
function Natural($items) { $items | Sort-Object { [regex]::Replace($_.Name, '\d+', { param($m) $m.Value.PadLeft(10, '0') }) } }
function Json($s) { '"' + ($s -replace '\\', '\\' -replace '"', '\"') + '"' }
function Reescreve($arq, $nome, $linhas) {
  $cab = ''
  if (Test-Path $arq) { $cab = ([IO.File]::ReadAllText($arq, $utf8) -split ('const ' + $nome))[0] }
  $corpo = ($linhas -join (",`n"))
  if ($corpo) { $corpo = $corpo + "`n" }
  [IO.File]::WriteAllText($arq, $cab + 'const ' + $nome + "=[`n" + $corpo + "];`n", $utf8)
}
$md = Join-Path $base 'music'; $wd = Join-Path $base 'wallpapers'
New-Item -ItemType Directory -Force $md, $wd | Out-Null
$mext = '.mp3', '.ogg', '.oga', '.wav', '.m4a', '.aac', '.flac', '.opus', '.webm'
$iext = '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp'
$mus = @(Natural (Get-ChildItem $md -File | Where-Object { $mext -contains $_.Extension.ToLower() }) | ForEach-Object {
  $t = ''
  $tf = Join-Path $md ($_.BaseName + '.txt')
  if (Test-Path $tf) { $t = ([IO.File]::ReadAllText($tf, $utf8).Trim() -split "`r?`n")[0] }
  if (-not $t) { $t = ($_.BaseName -replace '^\d+[\s._-]+', '' -replace '_+', ' ').Trim() }
  if (-not $t) { $t = $_.BaseName }
  ' {f:' + (Json ('music/' + $_.Name)) + ',n:' + (Json $t) + '}'
})
Reescreve (Join-Path $md 'playlist.js') 'MUSIC_LIST' $mus
$im = @(Natural (Get-ChildItem $wd -File | Where-Object { $iext -contains $_.Extension.ToLower() }) | ForEach-Object { ' ' + (Json ('wallpapers/' + $_.Name)) })
Reescreve (Join-Path $wd 'lista.js') 'BG_LIST' $im
Write-Host ("{0} musica(s) e {1} papel(eis) de parede na lista." -f $mus.Count, $im.Count)
