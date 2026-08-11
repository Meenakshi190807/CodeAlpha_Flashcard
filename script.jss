const starter=[{q:"What is AI?",a:"Artificial Intelligence is the field of creating systems that can perform tasks requiring human-like intelligence."},{q:"What is machine learning?",a:"Machine learning enables computers to learn patterns from data and make predictions or decisions."}];
let cards=JSON.parse(localStorage.getItem("flashlearn_cards")||"null")||starter;
let current=0;
const $=id=>document.getElementById(id);
function save(){localStorage.setItem("flashlearn_cards",JSON.stringify(cards));render();}
function render(){
  if(!cards.length){$("question").textContent="No flashcards yet";$("answer").textContent="Add your first card to begin.";current=0}
  else{current=(current+cards.length)%cards.length;$("question").textContent=cards[current].q;$("answer").textContent=cards[current].a}
  $("answer").classList.remove("show");
  $("counter").textContent=cards.length?`${current+1} / ${cards.length}`:"0 / 0";
  $("list").innerHTML=cards.map((c,i)=>`<div class="item"><div><strong>${escapeHtml(c.q)}</strong><small>${escapeHtml(c.a.slice(0,90))}${c.a.length>90?"…":""}</small></div><div class="actions"><button class="edit" onclick="editCard(${i})">Edit</button><button class="delete" onclick="deleteCard(${i})">Delete</button></div></div>`).join("");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
$("showAnswer").onclick=()=>$("answer").classList.toggle("show");
$("next").onclick=()=>{if(cards.length){current=(current+1)%cards.length;render()}};
$("prev").onclick=()=>{if(cards.length){current=(current-1+cards.length)%cards.length;render()}};
$("addBtn").onclick=()=>openForm();
$("cancel").onclick=()=>$("dialog").close();
function openForm(i=null){$("cardForm").reset();$("editIndex").value=i??"";$("dialogTitle").textContent=i===null?"Add Flashcard":"Edit Flashcard";if(i!==null){$("qInput").value=cards[i].q;$("aInput").value=cards[i].a}$("dialog").showModal()}
window.editCard=openForm;
window.deleteCard=i=>{if(confirm("Delete this flashcard?")){cards.splice(i,1);if(current>=cards.length)current=0;save()}};
$("cardForm").onsubmit=e=>{e.preventDefault();const i=$("editIndex").value;if(i==="")cards.push({q:$("qInput").value.trim(),a:$("aInput").value.trim()});else cards[+i]={q:$("qInput").value.trim(),a:$("aInput").value.trim()};$("dialog").close();save()};
render();