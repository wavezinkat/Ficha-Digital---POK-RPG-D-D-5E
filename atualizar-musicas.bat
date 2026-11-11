@echo off
chcp 65001 >nul
rem Atualiza music\playlist.js com todas as musicas da pasta music (dois cliques neste arquivo).
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$d=Join-Path $PSScriptRoot 'music'; $ext='.mp3','.ogg','.wav','.m4a','.aac','.flac','.opus','.webm';" ^
 "$old=Get-Content (Join-Path $d 'playlist.js') -Raw -Encoding UTF8; $cab=($old -split 'const MUSIC_LIST')[0];" ^
 "$it=Get-ChildItem $d -File | Where-Object { $ext -contains $_.Extension.ToLower() } | Sort-Object Name | ForEach-Object {" ^
 " $t=Join-Path $d ($_.BaseName+'.txt'); $n=''; if(Test-Path $t){$n=(Get-Content $t -Encoding UTF8 | Select-Object -First 1)};" ^
 " if(-not $n){ if($_.BaseName -ieq 'route24'){$n='Route 24 (Pokémon Remix) — Ramstar'}else{$n=($_.BaseName -replace '[_-]',' ').Trim()} };" ^
 " ' {f:'+(ConvertTo-Json ('music/'+$_.Name) -Compress)+',n:'+(ConvertTo-Json $n -Compress)+'}' };" ^
 "$out=$cab+'const MUSIC_LIST=['+[Environment]::NewLine+($it -join (','+[Environment]::NewLine))+[Environment]::NewLine+'];'+[Environment]::NewLine;" ^
 "[IO.File]::WriteAllText((Join-Path $d 'playlist.js'),$out,(New-Object Text.UTF8Encoding $false)); Write-Host ($it.Count.ToString()+' musica(s) na lista.')"
rem Papeis de parede (pasta wallpapers): 1a imagem = 2a musica, 2a imagem = 3a musica...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
 "$w=Join-Path $PSScriptRoot 'wallpapers'; if(-not (Test-Path $w)){New-Item -ItemType Directory $w | Out-Null}; $ie='.jpg','.jpeg','.png','.webp','.gif','.avif','.bmp';" ^
 "$f=Join-Path $w 'lista.js'; $cab=''; if(Test-Path $f){$cab=((Get-Content $f -Raw -Encoding UTF8) -split 'const BG_LIST')[0]};" ^
 "$im=Get-ChildItem $w -File | Where-Object { $ie -contains $_.Extension.ToLower() } | Sort-Object Name | ForEach-Object { ' '+(ConvertTo-Json ('wallpapers/'+$_.Name) -Compress) };" ^
 "$out=$cab+'const BG_LIST=['+[Environment]::NewLine+($im -join (','+[Environment]::NewLine))+[Environment]::NewLine+'];'+[Environment]::NewLine;" ^
 "[IO.File]::WriteAllText($f,$out,(New-Object Text.UTF8Encoding $false)); Write-Host (@($im).Count.ToString()+' papel(eis) de parede na lista.')"
pause
