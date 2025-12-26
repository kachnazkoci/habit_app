import {loadData} from "./data.js";
import {getState,setScreen} from "./state.js";
import {rendertoday} from "./ui/today.js";
import {rendercalendar} from "./ui/calendar.js";
import {rendernewhabit} from "./ui/newhabit.js";
import {renderhabitdetail} from "./ui/habitdetail.js";

const app=document.getElementById("app");
const data=loadData();

function rerender(){
 app.innerHTML="";
 const state=getState();
 if(state.screen==="today")rendertoday(app,data);
 if(state.screen==="calendar")rendercalendar(app,data);
 if(state.screen==="habits")rendernewhabit(app,data,rerender);
 if(state.screen==="habitdetail")renderhabitdetail(app,data,state.habitid,rerender);
}

document.querySelectorAll(".navbar button").forEach(b=>{
 b.onclick=()=>{setScreen(b.dataset.screen);rerender();};
});

rerender();
