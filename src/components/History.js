
import React, { useCallback, useEffect, useState } from 'react'
import TableCom from './TableCom'
import Item from './Item'
export default function History() {
  const [res,setRes] = useState([])
  const [errors,setErros] = useState(false)
  const [aryTitle,setAryTitle]=useState(["startPoint","endPoint","res"])



  const  callHisory = useCallback( async()=>{
    console.log("*********************")
    try {
      const response = await fetch('http://127.0.0.1:8000/loadAllHistory/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const dataRes = await response.json();
      const ary = []
      const ary2= []
      if (response.ok) {

        for(const a in dataRes){
          if(aryTitle.includes(a) ){
            for(const j in dataRes[a] ) {
              ary2.push(dataRes[a][j])
            }
          ary.push(ary2)
          }
        }

     setRes(ary)

      } else {
        // Handle registration failure
        console.error('Registration failed.');
      }
    } catch (error) {
      setErros(true)
      console.error('Error:', error);
    }
  },[])



  useEffect(()=>{
    callHisory()
  },[callHisory])

  return (
    <div>


      {!errors &&
        <TableCom titles={aryTitle} data={res}/>
      }
   
  
    </div>
    
  )
}
