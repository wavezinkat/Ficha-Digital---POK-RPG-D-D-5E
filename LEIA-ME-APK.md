# Gerar o APK (Android) com o PWABuilder

1. Suba esta pasta para o GitHub (substitua os arquivos do repositório) e publique em HTTPS
   (Vercel, que você já usa, ou GitHub Pages). Confirme que abre no Chrome do celular
   e que aparece "Instalar app" no menu.
2. Acesse https://www.pwabuilder.com , cole a URL do site e clique em Start.
3. Quando o relatório aparecer, clique em "Package for stores" -> Android -> Generate.
   - Package ID: algo como br.com.seunome.pokerpg
   - App name: PokeRPG / Launcher name: PokeRPG
   - Mantenha "Signing key: Create new" (e GUARDE o arquivo .keystore e a senha!).
4. Baixe o .zip. Dentro há o .apk (para instalar direto) e o .aab (para a Play Store),
   além do arquivo assetlinks.json.
5. Copie o conteúdo do assetlinks.json para .well-known/assetlinks.json deste site,
   publique de novo. Sem isso o app abre com uma barra de endereço do Chrome no topo.
6. Instale o .apk no celular (permitir "fontes desconhecidas").

Ao mudar o site: aumente VERSION em sw.js (v1 -> v2) para os celulares pegarem a versão nova.
