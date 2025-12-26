export function rendertoday(container,data){
 container.innerHTML="<h2>dnes</h2>";
 const today=new Date().toISOString().slice(0,10);
 let found=false;

 Object.values(data.habits).forEach(h=>{
  h.plans.forEach(p=>{
   if(p.date===today){
    found=true;
    const d=document.createElement("div");
    d.className="item";
    d.textContent=`${h.name} • ${p.time}`;
    container.appendChild(d);
   }
  });
 });

 if(!found){
  container.innerHTML+= "<p>zatím zde nejsou žádné plány</p>";
 }
}
