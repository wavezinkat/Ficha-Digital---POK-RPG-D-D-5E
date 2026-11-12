// js/core/save-file.js — salvar .json escolhendo a pasta/nome (janela "Salvar como" do sistema)
/* Usa showSaveFilePicker (Chrome, Edge, Opera). Em navegadores sem ele (Firefox, Safari) ou se der erro,
   baixa direto para a pasta de Downloads como antes. Resolve true se salvou, false se o usuário cancelou. */
async function saveJSON(text,name){
 name=String(name||'ficha.json').replace(/[\\/:*?"<>|]+/g,'-');
 if(window.showSaveFilePicker){
  try{const h=await window.showSaveFilePicker({suggestedName:name,types:[{description:'Arquivo JSON do PokeRPG',accept:{'application/json':['.json']}}]});
   const w=await h.createWritable();await w.write(new Blob([text],{type:'application/json'}));await w.close();return true}
  catch(e){if(e&&e.name=='AbortError')return false}/* outro erro (ex.: página dentro de iframe): cai no download normal */
 }
 const u=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);return true}
