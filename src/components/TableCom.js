import React, { useState } from 'react'
import "./TableCom.css"


export default function TableCom(props) {
  console.log(props.data)


  return (
    <div>
      <table>
          <tr>
          {props.titles.map(title=><td>{title}</td>)}
          </tr>
          {
          props.data.map((item)=>(
              <tr>
                {
                  item.map((val)=>(
                    <td>{val}</td>
                  ))
                }
              </tr>
          ))
       
          }

      </table>
  </div>
  )
}
