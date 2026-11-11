// js/trainer/trainer-tab.js — Aba 'Seu Treinador'
    // --- RENDERIZAÇÃO DA ABA: SEU TREINADOR ---
    /* cartões de habilidade minimizáveis: o estado fica no navegador (pokeRpgFold) */
    let FOLD = {};
    try { FOLD = JSON.parse(localStorage.getItem('pokeRpgFold') || '{}') || {}; } catch (e) { FOLD = {}; }
    function ftCard(kind, name, lvl, desc, color) {
        const k = kind + ':' + name, closed = FOLD[k] ? ' min' : '';
        return `<div class="feature-card fold${closed}" data-k="${k.replace(/"/g, '&quot;')}" style="border-left-color:${color};">
                    <h4 onclick="ftToggle(this.parentNode)" title="Clique para minimizar ou expandir"><i class="fas fa-chevron-down ft-ch"></i><span class="ft-n">${name}</span>${lvl ? ` <small>(Nível ${lvl})</small>` : ''}</h4>
                    <p>${desc}</p>
                 </div>`;
    }
    function ftSave() { try { localStorage.setItem('pokeRpgFold', JSON.stringify(FOLD)); } catch (e) {} }
    function ftToggle(el) { const k = el.dataset.k, c = el.classList.toggle('min'); if (c) FOLD[k] = 1; else delete FOLD[k]; ftSave(); }
    function ftAll(min) { document.querySelectorAll('#trainer-features-list .feature-card.fold').forEach(el => { el.classList.toggle('min', !!min); if (min) FOLD[el.dataset.k] = 1; else delete FOLD[el.dataset.k]; }); ftSave(); }
    function renderTrainerTab() {
        const container = document.getElementById('trainer-features-list');
        let html = `<div class="ft-ctl"><button onclick="ftAll(1)"><i class="fas fa-compress"></i> Minimizar textos</button><button onclick="ftAll(0)"><i class="fas fa-expand"></i> Expandir textos</button></div>`;

        html += `<h3><i class="fas fa-route"></i> Caminho: ${charData.path || 'Nenhum'}</h3>`;
        let pathFeatures = PATH_BUFFS[charData.path] || [];
        let hasPathFeatures = false;
        
        pathFeatures.forEach(feat => {
            if (trainerLevel >= feat.level) {
                html += ftCard('path', feat.name, feat.level, feat.desc, 'var(--poke-red)');
                hasPathFeatures = true;
            }
        });

        if (!hasPathFeatures && pathFeatures.length > 0) {
            html += `<p style="margin-bottom:20px; color:#555;"><em>Suba seu Nível de Treinador para desbloquear as habilidades deste caminho (Nível 2).</em></p>`;
        } else if (pathFeatures.length === 0) {
            html += `<p style="margin-bottom:20px; color:#555;"><em>Nenhuma habilidade específica listada para este caminho no momento.</em></p>`;
        }

        html += `<h3><i class="fas fa-star" style="color: #ffcb05;"></i> Especializações</h3>`;
        let hasSpecs = false;
        for (let spec in charData.specs) {
            if (charData.specs[spec] && SPEC_BUFFS[spec]) {
                html += ftCard('spec', spec, 0, SPEC_BUFFS[spec], '#3b82f6');
                hasSpecs = true;
            }
        }
        if (!hasSpecs) {
            html += `<p style="margin-bottom:20px; color:#555;"><em>Nenhuma especialização selecionada. Marque na aba Principal.</em></p>`;
        }

        html += `<h3><i class="fas fa-award"></i> Benefícios Gerais</h3>`;
        let hasGeneral = false;
        TRAINER_GENERAL_BUFFS.forEach(buff => {
            if (trainerLevel >= buff.level) {
                html += ftCard('gen', buff.name, buff.level, buff.desc, '#22c55e');
                hasGeneral = true;
            }
        });
        if (!hasGeneral) {
            html += `<p style="color:#555;"><em>Continue subindo a soma dos níveis dos seus Pokémon para desbloquear mais benefícios de treinador (Níveis 10, 13 e 20).</em></p>`;
        }

        container.innerHTML = html;
    }

