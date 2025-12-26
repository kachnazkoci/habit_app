export function rendercalendar(container,data){
 container.innerHTML="<h2>kalendář</h2>";
 Object.values(data.habits).forEach(h=>{
  h.plans.forEach(p=>{
   const d=document.createElement("div");
   d.className="item";
   d.textContent=`${p.date} • ${h.name} ${p.time}`;
   container.appendChild(d);
  });
 });
}
