let state={screen:"today",habitid:null};
export function getState(){return state}
export function setScreen(screen,habitid=null){state.screen=screen;state.habitid=habitid}
