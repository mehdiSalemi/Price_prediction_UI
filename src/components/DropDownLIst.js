import React, { useEffect, useState } from 'react'

export default function DropDownLIst(props) {

    return (
    <div>
        <label for={props.lableName}>{props.lableDes}</label>
        <select name={props.idName} id={props.idName} onChange={(e)=>{props.onChange(e.target.value)}} >
            {
                
                props.data.map(item=>(    
                    // <option value={item.value ? item.value : [item.latitude,item.longitude]} key={item.id} id={item.id}>{item.name}</option>
                    <option value={item.name} key={item.id}>{item.name}</option>
                ))
                  
            }
        </select>
    </div>
    
  )
}
