# PokeRPG — Ficha de Treinador

Abra `index.html` no navegador. Não precisa de servidor nem de build.

## Estrutura

```
index.html            marcação (HTML) + ordem de carregamento dos arquivos
css/                  estilos, um arquivo por área (a ordem em index.html importa: o tema translúcido sobrescreve a base)
js/data/              dados: pokédex, itens, mega evoluções, caminhos e buffs do treinador
js/core/              estado global, utilitários, áudio, boot e inicialização
js/trainer/           ficha do treinador (abas, cálculos, listas, salvar/carregar)
js/ui/                janelas, caixas móveis, tooltip
js/features/          inventário, Pokémon, traços, nível, usos de habilidades, chip
js/wizard/            assistente de criação e treinador aleatório
js/master/            modo Mestre
js/combat/            combate e mega evolução
```

## Importante

Os scripts são clássicos (sem `import`/`export`) e compartilham o escopo global, exatamente como no arquivo único original.
**A ordem das tags `<script>` em `index.html` é a ordem original do código e não deve ser alterada**: vários arquivos
redefinem ou envolvem funções criadas em arquivos anteriores (ex.: `renderLists`, `openTab`, `loadJSON`).

As músicas ficam na pasta `music/` (veja a seção Pokédex e músicas).


## Reformulação do front-end

- `css/theme-pokemon.css` (carregado por último): tema suave "Pokémon style", cabeçalho fixo (barra superior + barra de status) e dock lateral com ícone + nome.
- `index.html` / `js/ui/windows.js`: `#hdr` (topo: foto, nome, classe, Salvar rápido, Carregar rápido, Início) e `#statbar` (nível, PV, dinheiro, CA, movimento, inspiração, SR máx., Descanso longo). `buildDock()` monta as abas da direita.
- `js/ui/boxes.js`: botões "Padrão" e "Minimizar tudo" ao lado de "Nova caixa" em cada janela.
- `js/core/library.js`: lista dos últimos treinadores (salvamento rápido + .json importados) em `localStorage['pokeRpgLib']`; usada na tela inicial, em "Carregar rápido" e em Configurar. A chave antiga `pokeRpgFicha` continua sendo gravada e é migrada uma vez.
- `js/features/pokemon/custom-move.js`: "Criar Move" (4º botão em Aprender Move) e "Escrever habilidade". Moves próprios guardam os dados em `mv[i].cm` e são registrados em `PKMV/PKMD/DC` (ids `cm-…`) por `pkFix`, então ficha, rolagens e combate funcionam sem mudanças.
- `js/master/wild-window.js`: gerador/lista de selvagens como janela "Selvagens" na dock (só no modo Mestre); no perfil Selvagem (`body.wildp`) somem Principal, Treinador, Pokémons, Inventário, Traços e a barra de status.
- `js/ui/dice-tray.js`: bandeja de dados flutuante e arrastável (botão de dado no topo; jogador e mestre). Expressões como `2d6 + 3d8 + 4`, modificador, vantagem/desvantagem (só d20), rolagens prontas da ficha (iniciativa, atributos, resistências, perícias e golpes dos Pokémon da party) e histórico em `localStorage['pokeRpgDice']`.
- Topo: a logo POKERPG (extrema esquerda) é o botão Início; a foto/nome/classe do treinador ficam na extrema direita.
- `js/combat/path-extra.js`: complementos das habilidades dos caminhos no combate (Evasão Sinistra, Copiar Meowth, avisos das passivas de batalha, escolha de tipo do Armazenamento de Energia e habilidade de Muitas Faces). `mfRow()` em `ability-uses.js` injeta a habilidade escolhida em Muitas Faces nas listas de habilidades/usos.
- Aba Seu Treinador: cartões em grade compacta; cada habilidade pode ser minimizada (só o nome) — estado em `localStorage['pokeRpgFold']` — e há "Minimizar/Expandir textos".
- Sprites de Mega/Primal no combate: `mgImgs()` (`js/combat/battle-screen.js`) tenta Showdown (animado de costas, de frente, estático, HOME) e Serebii, com variações de grafia, antes de cair no sprite da espécie base.
- `js/features/type-colors.js`: cores de tipo como nos jogos (degradê); gera `.t-<tipo>` (selos) e `tyS()` (variáveis `--c1/--c2` dos cartões `.tyc`). Golpes em grade 2x2 (`.g2`), exceto com o talento Move Extra.
- `js/data/talent-presets.js`: talentos prontos na aba Seu Treinador (o seletor preenche o formulário).
- Inventário: cada categoria da mochila pode ser minimizada (clique no título); estado em `localStorage['pokeRpgInvFold']`, mais "minimizar categorias/expandir".
- Combate: cartões de golpe um pouco mais compactos (`css/theme-pokemon.css`, bloco "golpes cabendo na tela") para os 4 golpes caberem sem scroll.
- `js/features/talent-modal.js` (carregar DEPOIS de `combat/talents.js`, que define `editTalent`/`renderTalentsB`): "Adicionar talento" abre uma janela (presets + manual) e cada talento vira uma caixa compacta com editar/excluir/minimizar.
- `js/features/type-chart.js`: tabela de tipos (`TCH`), `tyDef()`/`tyOff()`, ícones `tyI()`. Usada na seção "Fraquezas e resistências" da ficha do Pokémon (`compact-sheet.js`) e nos ícones de efetividade do resultado de dano (`results.js`, `rvTy`/`rvImm`). Considera só os tipos, não habilidades.

- Fraquezas: no PokeRPG não existe ×4 — dupla fraqueza é exibida como ×2 (type-chart.js, tyDef).

## Pokédex e músicas
- **Pokédex** (`js/features/pokedex.js`): primeira aba da dock; não aparece no perfil Selvagem. Dados em `charData.dex = {seen, got}` (entra no salvar rápido, biblioteca e JSON). Toda espécie na party/PC conta como capturada automaticamente; clique = visto → capturado → desmarcar. Filtros: região, tipos (vários; OU/E), vistos/capturados/não vistos e busca; botões em lote valem para o filtro atual. Número nacional = chave (formas usam a espécie base); homebrews entram em "Outros".
- **Músicas** (`js/core/music.js`, pasta `music/`): coloque arquivos .mp3/.ogg/.wav/.m4a/.flac/.opus em `music/`. Servidores que listam a pasta (Live Server, `python -m http.server`) são detectados sozinhos; nos demais rode `atualizar-musicas.bat` (Windows) ou `python atualizar-musicas.py`, que reescreve `music/playlist.js`. Para dar um nome à faixa, crie `nome-do-arquivo.txt` com o título. Escolha da faixa e modo (repetir / sequência / aleatório) ficam no Configurar e são lembrados no navegador (`pokeRpgMusic`).
- **Papel de parede por música** (`js/core/music.js`, pasta `wallpapers/`): a 1ª imagem (ordem alfabética) acompanha a 2ª música da lista, a 2ª imagem a 3ª etc.; a música padrão (route24) não conta e usa o fundo normal. Troca com fade; se o treinador tiver um fundo próprio (URL em Configurar) ele tem prioridade; há uma caixa para desligar no Configurar. Lista em `wallpapers/lista.js` (gerada por `atualizar-musicas.bat/.py` ou detectada em servidores que listam a pasta).
- **Vercel / hospedagem sem listagem de pasta**: o navegador não consegue listar pastas, então a lista vem de `music/playlist.js` e `wallpapers/lista.js`. O `vercel.json` manda a Vercel rodar `node atualizar-musicas.js` a cada deploy (atualiza as duas listas sozinho). Localmente use `atualizar-musicas.bat` (chama o `.ps1`), `python atualizar-musicas.py` ou `node atualizar-musicas.js`. A música padrão agora é a 1ª da lista (sem papel de parede); as seguintes ganham as imagens na ordem.
- **Salvar .json com "Salvar como"** (`js/core/save-file.js`, `saveJSON`): ficha do treinador, Pokémon exportado, perfil de mestre, ficha de treinador do mestre e biblioteca abrem a janela do sistema para escolher pasta e nome (Chrome/Edge/Opera). Firefox/Safari não têm essa janela e continuam baixando direto para Downloads.


## Celular (layout mobile + menu de pizza)
- **Quando vale**: tela de até 900px de largura, ou celular deitado (altura ≤ 520px com toque). Um script curto no `<head>` do `index.html` liga a classe `html.mob` (e `html.land` na horizontal); todo o CSS de celular está em `css/mobile.css`, escopado por `html.mob`. No computador nada muda.
- **Menu de pizza** (`js/ui/mobile.js`): a dock da direita some e entra uma bola flutuante no canto inferior direito. Ao tocar, abre um círculo dividido em fatias coloridas (uma por aba, na mesma ordem da dock: Pokédex, Principal, Treinador, Pokémons, Combate, Inventário, Traços, Config.; no modo Mestre também Treinadores e Selvagens). As fatias são lidas da dock (`#dock [data-w]`) a cada abertura, então qualquer aba nova (`WINS`/`XWINS`) aparece sozinha. Fecha tocando no centro, fora do círculo ou com Esc; a fatia da aba aberta fica destacada.
- **Topo**: logo vira só a bolinha (Início), dados / salvar / carregar viram ícones, treinador mostra foto + nome. A altura real do topo é medida e gravada em `--hdr-h`, então as janelas sempre começam logo abaixo.
- **Barra de status**: 2 linhas (Nível + PV + descanso; Dinheiro, CA, Movimento, Inspiração, SR máx.). Na horizontal volta a ser uma fileira rolável.
- **Janelas e caixas**: no celular as caixas das abas ficam empilhadas em uma coluna (sem arrastar/redimensionar; minimizar continua). `boxes.js` não grava tamanho/posição das caixas enquanto está em modo celular, para não bagunçar o layout salvo do computador. O botão "Padrão" fica escondido no celular.
- **Telas cheias**: ficha do Pokémon, catálogo e mochila ocupam a tela inteira; diálogos usam a largura toda; campos com 16px (evita o zoom automático do iPhone); botões de toque com 32–40px.
- **Combate**: a tela rola inteira; botões AÇÃO / MOCHILA / TROCAR / FINALIZAR ficam em uma fileira acima dos golpes; golpes em 1 coluna; sprites e caixas de PV redimensionados.
- **Modo Mestre**: a lateral esquerda vira a fatia "Treinadores" do menu de pizza; a gaveta de treinadores abre em tela cheia.
- **Bandeja de dados**: vira uma folha presa na parte de baixo.
