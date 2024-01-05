import React, { useState, useEffect,useContext} from 'react'
import DropDownLIst from './DropDownLIst'
import {Points,Address,DetailsCountry,Distance,Estimated_time} from "./../Countext";
import Item from './Item';

export default function Country() {
    const [urlCountry, setUrlCountry] = useState('http://localhost:3000/countries') 
    const [countries, setCountries] = useState([])



    const {points,setPoints} = useContext(Points)
    const {address,setAddress} = useContext(Address)
    const {detailsCountry,setDetailsCountry} = useContext(DetailsCountry)
    const {distance, setDistance} = useContext(Distance)
    const {estimatedTime, setEstimatedTime} = useContext(Estimated_time)
            
    useEffect(()=>{
        fetch(urlCountry)
        .then(res=> res.json())
        .then(json =>  setCountries(json))  

    },[urlCountry])

    async function country_set(name){

        await fetch(urlCountry+'?name='+name)
            .then(res=> res.json())
            .then(json => {
                setDetailsCountry([...detailsCountry,json[0]])
            }).catch(
                (err)=>console.log(err)
                )
        
    }
   function country_onChange(name){

         fetch(urlCountry+'?name='+name)
            .then(res=> res.json())
            .then(json => {
                setPoints([...points,[json[0]['latitude'],json[0]['longitude']]])
                setDetailsCountry([...detailsCountry,json[0]])
            })

    }

  useEffect(()=>{
    if(points.length > 0 && points.length <=2){
      let loc= points[0]
      if(points.length === 2){
         loc= points[1]
      }
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${loc[0]}&lon=${loc[1]}&format=json`, {
        headers: {
          'User-Agent': 'ID of your APP/service/website/etc. v0.1'
        }
      }).then(res => res.json())
        .then(res => {
          let ads = res.address.country+" "+res.address.city
          setAddress([...address,[ads]])
          country_set(res.address.country ,ads)
        
      })
    }
  },[points])
    
  return (
    <div>
        <div className='block'>
            <DropDownLIst data={countries} idName={"startPoints"} onChange={country_onChange}  lableDes={"Select pickup country:"} lableName={"startPoints"}/>      
        </div>  
        <div className='block'>
            <DropDownLIst data={countries} idName={"endPoints"} onChange={country_onChange}  lableDes={"Select delivery country:"} lableName={"endPoints"}/>
        </div>  
        <div className='block'>
            <Item idName='transporetdUsefullLoad_ton' des='Enter distance (km): ' handleChange= {(e)=> setDistance(e.target.value)}  />
        </div>
        <div className='block'>
            <Item idName='estimated_time' des='Enter estimated time (hours): ' handleChange= {(e)=> setEstimatedTime(e.target.value)}  />
        </div>

    </div>
  )
}
