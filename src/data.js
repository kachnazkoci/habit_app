const key="habit-data-v2";
export function loadData(){
 const raw=localStorage.getItem(key);
 return raw?JSON.parse(raw):{habits:{}};
}
export function saveData(data){
 localStorage.setItem(key,JSON.stringify(data));
}
