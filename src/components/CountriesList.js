import React, { useState, useEffect} from 'react'
import DropDownLIst from './DropDownLIst'

function test(){
    console.log("test")
  }

export default function CountriesList() {
    const [countries, setCountries] = useState([])
    const [vehicle, setVehicle] = useState([])
    const [urlCountry, setUrlCountry] = useState('http://localhost:3000/countries')  
    const [urlVicle, setUrlVe] = useState('http://localhost:3000/vehicle')  
        
    useEffect(()=>{
        fetch(urlCountry)
        .then(res=> res.json())
        .then(json =>  setCountries(json))  

    },[urlCountry])
    
    useEffect(()=>{
      fetch(urlVicle)
      .then(res=> res.json())
      .then(json =>  setVehicle(json))  

  },[urlVicle])

  function test(){

  }
  return (
    <div>
       <form method='post' onClick={test}>
            <label for="startPoints">Select start point:</label>      
            <DropDownLIst data={countries} idName={"startPoints"} fun={test}/>
           

            <label for="endPoints">Select end point:</label>
            <DropDownLIst data={countries} idName={"endPoints"} fun={test}/>


            <label for="endPoints">Select vehicle:</label>
            <DropDownLIst data={vehicle} idName={"vehicle"} fun={test}/>


            <button type="submit" class="btn btn-primary">Submit</button>
        </form>    
    </div>
  )
}
