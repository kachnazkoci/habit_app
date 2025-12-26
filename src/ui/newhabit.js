import {saveData} from "../data.js";
import {setScreen} from "../state.js";

export function rendernewhabit(container,data,rerender){
 container.innerHTML=`
  <h2>nový návyk</h2>
  <input id="name" placeholder="název">
  <input id="place" placeholder="místo">
  <button id="create">vytvořit</button>
 `;

 document.getElementById("create").onclick=()=>{
  const name=nameInput().value.trim();
  const place=placeInput().value.trim();
  if(!name||!place){alert("vyplň název i místo");return}
  const id=crypto.randomUUID();
  data.habits[id]={id,name,place,plans:[]};
  saveData(data);
  setScreen("habitdetail",id);
  rerender();
 };

 function nameInput(){return document.getElementById("name")}
 function placeInput(){return document.getElementById("place")}
}
