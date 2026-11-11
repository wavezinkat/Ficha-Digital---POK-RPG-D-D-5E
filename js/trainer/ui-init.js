// js/trainer/ui-init.js — Navegação de abas (versão original) e montagem da interface
    // --- NAVEGAÇÃO DE ABAS ---
    function openTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // --- INICIALIZAÇÃO DA INTERFACE ---
    function initUI() {
        const pathSelect = document.getElementById('char-path');
        pathSelect.innerHTML = TRAINER_PATHS.map(p => `<option value="${p}">${p}</option>`).join('');

        const specsContainer = document.getElementById('specs-container');
        specsContainer.innerHTML = SPECIALIZATIONS.map((s, i) => `
            <li class="spec-item">
                <label>
                    <input type="checkbox" id="spec-${i}" onchange="updateSpecs()">
                    ${s}
                </label>
            </li>
        `).join('');

        const attrContainer = document.getElementById('attributes-container');
        attrContainer.innerHTML = ATTRS.map(a => `
            <div class="attr-box">
                <strong>${a.name}</strong><br>
                <input type="number" id="attr-${a.id}" value="10" onchange="updateStats()">
                <div id="mod-${a.id}" style="color: #666; font-size: 1.1em; font-weight: 800;">+0</div>
            </div>
        `).join('');

        const skillContainer = document.getElementById('skills-container');
        skillContainer.innerHTML = SKILLS.map(s => `
            <li class="prof-item">
                <label>
                    <input type="checkbox" id="prof-${s.id}" onchange="updateStats()">
                    ${s.name} <small style="color:#888;">(${s.attr.toUpperCase()})</small>
                </label>
                <strong id="skill-${s.id}" style="color:var(--poke-blue);">+0</strong>
            </li>
        `).join('');

        const basicFields = ['char-name', 'char-hp', 'char-coins', 'char-inspiration', 'char-ac', 'char-speed', 'char-maxcr'];
        basicFields.forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                let key = id.replace('char-', '');
                charData[key] = e.target.value;
            });
        });

        document.getElementById('char-path').addEventListener('change', (e) => {
            charData.path = e.target.value;
            renderTrainerTab();
        });

        document.getElementById('char-history').addEventListener('change', (e) => {
            charData.history = e.target.value;
        });
        document.getElementById('char-personality').addEventListener('change', (e) => {
            charData.personality = e.target.value;
        });
    }

