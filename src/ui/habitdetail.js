import {saveData} from "../data.js";

export function renderhabitdetail(container,data,habitid,rerender){
 const habit=data.habits[habitid];
 if(!habit){container.innerHTML="nenalezen";return}

 container.innerHTML=`
  <h2>${habit.name}</h2>
  <p>${habit.place}</p>

  <h3>plány</h3>
  <div id="plans"></div>

  <h4>přidat plán</h4>
  <input id="date" type="date">
  <input id="time" type="time">
  <button id="add">přidat plán</button>
 `;

 const plans=document.getElementById("plans");
 habit.plans.forEach(p=>{
  const d=document.createElement("div");
  d.className="item";
  d.textContent=`${p.date} ${p.time}`;
  plans.appendChild(d);
 });

 document.getElementById("add").onclick=()=>{
  const date=document.getElementById("date").value;
  const time=document.getElementById("time").value;
  if(!date||!time){alert("datum a čas jsou povinné");return}
  habit.plans.push({id:crypto.randomUUID(),date,time,done:false});
  saveData(data);
  rerender();
 };
}
