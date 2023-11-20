import React, { useEffect, useState } from 'react'

export default function DropDownLIst(props) {

    return (
    <div>
        <select name="startPoint" id={props.idName} onChange={(e)=>{props.onChange(e)}} >
            {
                
                props.data.map(item=>(    
                    // <option value={item.value ? item.value : [item.latitude,item.longitude]} key={item.id} id={item.id}>{item.name}</option>
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))
                  
            }
        </select>
    </div>
    
  )
}
