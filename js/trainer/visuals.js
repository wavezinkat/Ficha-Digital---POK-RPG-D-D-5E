// js/trainer/visuals.js — Imagem do personagem e plano de fundo
    // --- VISUAIS ---
    function updateCharImage() {
        let url = document.getElementById('char-img').value;
        charData.img = url;
        document.getElementById('char-avatar-preview').src = url;
    }

    function updateBackground() {
        let url = document.getElementById('bg-url').value;
        charData.bg = url;
        if (url) {
            document.body.style.backgroundImage = `url('${url}')`;
        } else {
            document.body.style.backgroundImage = ''; // Volta pro background de floresta retro do CSS
        }
    }

