// js/features/trainer-image.js — Imagem do treinador a partir do computador
/* ===== imagem do treinador direto do computador ===== */
function imgUpNode(g){g.style.display='none';const n=document.createElement('div');n.className='imgup';
 n.innerHTML='<label class="btn alt" title="Imagem do seu computador"><i class="fas fa-upload"></i> Enviar imagem do treinador<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onchange="trainerImg(this)"></label><button class="lnk" onclick="trainerImgClear()">remover imagem</button>';n.appendChild(g);return n}
function trainerImg(inp){const f=inp.files[0];inp.value='';if(!f)return;if(!/^image\//.test(f.type))return toast('Escolha um arquivo de imagem (JPG ou PNG).');const im=new Image(),u=URL.createObjectURL(f);
 im.onload=()=>{const k=Math.min(1,320/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);$('char-img').value=c.toDataURL(f.type=='image/png'?'image/png':'image/jpeg',.88);updateCharImage();sfx('ok');toast('Imagem do treinador atualizada!')};
 im.onerror=()=>toast('Não foi possível ler a imagem.');im.src=u}
function trainerImgClear(){$('char-img').value='';updateCharImage();sfx('del');toast('Imagem removida.')}

