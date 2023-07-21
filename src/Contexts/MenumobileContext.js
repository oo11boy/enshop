import { createContext, useState } from "react";

export const MenumobileContext=createContext({
  Showmenu:()=>{},
   menustatus:false
})

export const MenumobileContextProvider=({children})=>{
    const [menumobshow,setmenushow]=useState(false)
    const mobilemenuval={
        Showmenu,
        menustatus:menumobshow

    }

  function Showmenu(){
    setmenushow(!menumobshow)
 
  }
    return (
  <MenumobileContext.Provider value={mobilemenuval}>{children}</MenumobileContext.Provider>

    )
}