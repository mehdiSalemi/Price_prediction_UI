import React, { useState } from 'react'
import './TabsPage.css'

export default function TabsPage() {
    const [toggle,setToggle] = useState(1)

    function updateToggle(id){
        setToggle(id)
    }
  return (
    <div>
        <div class="topnav">
            <a href="#home" onClick={()=>updateToggle(1)}>Postal code</a>
            <a href="#news" onClick={()=>updateToggle(2)}>country</a>
            <a href="#contact" onClick={()=>updateToggle(3)}>map</a>
            <a href="#about" class="split">Help</a>
        </div>
        <div className={toggle ===1 ? "show-contect" : "content"}>
            <h1>POstal code</h1>
        </div>
        <div  className={toggle ===2 ? "show-contect" : "content"}>
            <h1>country</h1>
        </div>
        <div  className={toggle ===3 ? "show-contect" : "content"}>
            <h1>MAP</h1>
        </div>
    </div>
   
    
  )
}
