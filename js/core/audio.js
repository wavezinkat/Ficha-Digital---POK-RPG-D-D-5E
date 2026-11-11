// js/core/audio.js — Música e efeitos sonoros
/* áudio: música (pasta music/) + efeitos gerados pelo navegador */
const AU={m:1,s:1,mv:.3,sv:.6};try{Object.assign(AU,JSON.parse(localStorage.getItem('pokeRpgAudio')))}catch(e){}
const bgm=new Audio();bgm.loop=true;/* a faixa é definida em js/core/music.js (pasta music/) */let AC;
const saveAu=()=>{try{localStorage.setItem('pokeRpgAudio',JSON.stringify(AU))}catch(e){}};
function applyAu(){bgm.volume=AU.mv;if(!AU.m)bgm.pause();else if(bgm.paused)bgm.play().catch(()=>{})}
addEventListener('pointerdown',()=>{if(AU.m&&bgm.paused)bgm.play().catch(()=>{})});
function tone(f,d,t,dl){if(!AU.s)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+(dl||0);o.type=t||'square';o.frequency.value=f;g.gain.setValueAtTime(.1*AU.sv,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)}catch(e){}}
function sfx(k){if(k=='dice')for(let i=0;i<7;i++)tone(250+R(500),.05,'square',i*.06);else(({click:[[880,.05]],open:[[520,.07],[780,.1,0,.06]],close:[[780,.06],[480,.1,0,.05]],box:[[660,.04,'triangle']],min:[[420,.07,'triangle']],del:[[300,.12,'sawtooth'],[200,.16,'sawtooth',.08]],ok:[[660,.08],[880,.08,0,.08],[1100,.14,0,.16]],mega:[[392,.15],[523,.15,0,.12],[659,.15,0,.24],[784,.18,0,.36],[1047,.5,0,.5],[1319,.5,0,.52]]})[k]||[]).forEach(a=>tone(a[0],a[1],a[2]||'square',a[3]))}
document.addEventListener('click',e=>{if(e.target.closest('button,.chip,label.big,input[type=checkbox]')&&!e.target.closest('#dock'))sfx('click')});

