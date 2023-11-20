import React, { useState, useEffect,useContext} from 'react'
import DropDownLIst from './DropDownLIst'
import {Points, Distance} from "./../Countext";
import Item from './Item';



export default function CalculationForm() {
    const [countries, setCountries] = useState([])
    const [detailsCountry, setDetailsCountry] = useState([])
    const [vehicle, setVehicle] = useState([])
    const [detailsVehicle, setDetailsVehicle] = useState([])
    const [loadPerTon, setLoadPerTon] = useState()
    const [formData, setFormData] = useState({})
    const [showModal,setShowModal] = useState(false)

    const [urlCountry, setUrlCountry] = useState('http://localhost:3000/countries')  
    const [urlVicle, setuUrlVicle] = useState('http://localhost:3000/vehicle')  

    const {points,setPoints} = useContext(Points)



        
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

  function onChange(e){

      let idName = e.target.id
      let id = e.target.value
      if(idName !== "vehicle"){
        fetch(urlCountry+'?id='+id)
          .then(res=> res.json())
          .then(json => {
            setPoints([...points,[json[0]['latitude'],json[0]['longitude']]])
            setDetailsCountry([...detailsCountry,json[0]])
        
          })
    
      }else {
      
        fetch(urlVicle+'?id='+id)
          .then(res=> res.json())
          .then(json => setDetailsVehicle([json[0]]))

    }

  }

  
function calculation(){
    const h3Tag = document.querySelector('.leaflet-routing-alt  h3')
   
    let distancePerKM = 0 //Hours
    let distancePerHouers = 0 //KM

    if (h3Tag) {
        // Set a new value for the <h3> tag
        // h3Tag.textContent = 'New value set by JavaScript';
        const h3Tag_val = h3Tag.textContent.split(',')

        distancePerKM = h3Tag_val[0].replace('km','')
        distancePerHouers= h3Tag_val[1].replace('min','')
        distancePerHouers= distancePerHouers.replace('h','.')
        distancePerHouers= distancePerHouers.split(" ").join("")
        
    } else {
        console.log('No <h3> tag found within the element with class ".leaflet-routing-alt  h3"');
    }
  
    let spead = distancePerKM / distancePerHouers //avgSpeed 

    
    let jsonItem = {lengthWithUsefulLoad_km: distancePerKM,
        t_ConsumptionWithload_hour: distancePerHouers,
        lengthWithOutLoad_km: distancePerKM,
        t_ConsumptionWithoutLoad_hour: distancePerHouers,
        fulePrice_euroLitter: detailsCountry[0]['fulPrice'],
        fuleConsumptionEmptyVehicle_litterKM: detailsVehicle[0]['consumption'],
        factorFuelConsumptionDependTopographicalFactor: 0, //defualt 0
        transporetdUsefullLoad_ton: loadPerTon ,// it have to entre by coustomer
        fcatorDifferentLoadingCondition_litterTonKm: 0.5, //defualt 0.5
        t_Loading_hour: (0.15 * loadPerTon) ,//0.15 *ton transporetdUsefullLoad_ton
        t_waitingLoading_hour: 0,//defualt 0
        t_waitingFrontier_hour: 0,//defualt 0
        t_resting_hours: 0,//defualt 0
        t_camionStop_hours: 0,//defualt 0
        specialWaitingCost_euroHour: 0,//defualt 0
        feeOfMotorways_euro: detailsCountry[0]['feeMotorway']*distancePerKM,
        ParkingFee_eruo: 0, //defualt 0
        avg_labourCost_euroHour: detailsCountry[0]['labourCost'],//per erou/hours
        t_consumptionAchivmentTransportTask_day: 0, //defualt 0
        specificMaintenanceVeicles_eruoDay: 0, //defualt 0
        factorMaintananceCost_eruo: 0, //defualt 0
        rentingCostPerDay: 0//defualt 0 
      }
      console.log(jsonItem)
      setFormData(jsonItem)
     
}
const [resCalculate,setResCalculate] = useState()
const handleSubmit = async (e) => {
    calculation()
    console.log(JSON.stringify(formData))
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/calculatePrice/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const dataRes = await response.json();
      setResCalculate(dataRes)
      console.log("///////////////////")
      console.log(resCalculate)
      // showModal(true)

      if (response.ok) {
        // Successful registration
        console.log(dataRes);
      } else {
        // Handle registration failure
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowModal(true)
};
  return (
    <div>
        <form method="post" onSubmit={handleSubmit} >
            <label for="startPoints">Select start point:</label> 
                 
            <DropDownLIst data={countries} idName={"startPoints"} onChange={onChange}/>
           

            <label for="endPoints">Select end point:</label>
            <DropDownLIst data={countries} idName={"endPoints"} onChange={onChange}/>


            <label for="endPoints">Select vehicle:</label>
            <DropDownLIst data={vehicle} idName={"vehicle"} onChange={onChange}/>
            <Item idName='transporetdUsefullLoad_ton' des='transported useful load (Ton)' handleChange= {(e)=> setLoadPerTon(e.target.value)} />
        
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>    
    </div>
  )
}


