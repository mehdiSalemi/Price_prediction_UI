import React, { useEffect, useState } from 'react'

export default function DropDownLIst(props) {

    return (
    <div id='countres'>
        <select name="startPoint" id={props.idName}>
            {
                
                props.data.map(item=>(    
                    <option value={item.value ? item.value : [item.latitude,item.longitude]} key={item.id} id={item.id}>{item.name} onClick={props.fun}</option>
                ))
                  
            }
        </select>
    </div>
    
  )
}
