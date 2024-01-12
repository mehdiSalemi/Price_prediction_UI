import React, { useState, useEffect,useContext} from 'react'
import DropDownLIst from './DropDownLIst'
import {Points, DetailsCountry,Address,Distance,Estimated_time} from "./../Countext";
import Item from './Item';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from './Modal';
import History from './History';



export default function CalculationForm() {
   

    const [vehicle, setVehicle] = useState([])
    const [vehicleIsSelected, setVehicleIsSelected] = useState(false)
    const [detailsVehicle, setDetailsVehicle] = useState([])
    const [loadPerTon, setLoadPerTon] = useState()
    const [formData, setFormData] = useState({})
    const [showModal,setShowModal] = useState(false)
    const [resCalculate,setResCalculate] = useState()
    const [fulePrice,setFulePrice] = useState()
 
 
   
    const [urlVicle, setuUrlVicle] = useState('http://localhost:3000/vehicle')  


    const {points,setPoints} = useContext(Points)
    const {address,setAddress} = useContext(Address)
    const {detailsCountry,setDetailsCountry} = useContext(DetailsCountry)
    const {distance, setDistance} = useContext(Distance)
    const {estimatedTime, setEstimatedTime} = useContext(Estimated_time)


    async function getFulePrice(name){
   
      const url = "http://127.0.0.1:8000/getFulePrice?countryName="+name;

      await fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse the response data as JSON
          } else {
            throw new Error('API request failed');
          }
        })
        .then(data => {
          // Process the response data here
          console.log(data[3]); // dissel price
          setFulePrice(data[3]);

        })
 
    }


 
    
    useEffect(()=>{
      fetch(urlVicle)
      .then(res=> res.json())
      .then(json =>  setVehicle(json))  

    },[urlVicle])



// function getPrice(name){
//   const url = "http://127.0.0.1:8000/getFulePrice?countryName="+name;
//   fetch(url)
//   .then(res => c)
// }

function vehicle_onChange(name){
  fetch(urlVicle+'?name='+name)
  .then(res=> res.json())
  .then(json => setDetailsVehicle([json[0]]))
  setVehicleIsSelected(true)

}

  
async  function calculation(){

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
  distancePerKM= (distance > 0) ? distance : distancePerKM
  distancePerHouers =(estimatedTime > 0) ? estimatedTime:distancePerHouers


  let jsonItem =  {lengthWithUsefulLoad_km: parseFloat(distancePerKM), //length of the way with useful load in case of j-th transport task (KM)
    t_ConsumptionWithload_hour: parseFloat(distancePerHouers), //time consumption of ways with useful load
    lengthWithOutLoad_km: parseFloat(distancePerKM), //length of way without load in case of the j-th transport task (KM)
    t_ConsumptionWithoutLoad_hour: parseFloat(distancePerHouers), //time consumption of ways without useful load
    fulePrice_euroLitter: parseFloat(fulePrice),//(detailsCountry[0]['fulPrice']), //fuel price(Euro/ liter)
    fuleConsumptionEmptyVehicle_litterKM: parseFloat(detailsVehicle[0]['consumption']), //specific fuel consumption in case of empty vehicle (Litter/KM)
    factorFuelConsumptionDependTopographicalFactor: 0, //defualt 0 correction factor for fuel consumption depending on topographical conditions
    transporetdUsefullLoad_ton: parseFloat(loadPerTon) ,// it have to entre by coustomer
    fcatorDifferentLoadingCondition_litterTonKm: 0.5, // Jorge said 0.0085. correction factor for different loading conditions (every additional tons ofuseful load results in 0.5 litre extra fuel consumption)(liter/ton.KM)
    t_Loading_hour: parseFloat(0.15 * loadPerTon) ,//0.15 *ton transporetdUsefullLoad_ton. time consumption of loading in and loading out (hour)
    t_waitingLoading_hour: 0,//defualt 0. waiting for loading in and loading out activity (hour)
    t_waitingFrontier_hour: 0,//defualt 0. waiting time at the frontier station (hour)
    t_resting_hours: 0,//defualt 0. waiting time due to required resting (AETR) (hour)
    t_camionStop_hours: 0,//defualt 0. waiting time due to camion stop (hour)
    specialWaitingCost_euroHour: 0,//defualt 0. specific waiting cost (euro/hour)
    feeOfMotorways_euro: parseFloat(detailsCountry[0]['feeMotorway']*distancePerKM), //fee of motorways used by vehicles
    ParkingFee_eruo: 0, //defualt 0
    avg_labourCost_euroHour: parseFloat(detailsCountry[0]['labourCost']),//average labour cost of a driver (euro/hour)
    t_consumptionAchivmentTransportTask_day: 0, //defualt 0.time consumption of the achievement of a transport task (day)
    specificMaintenanceVeicles_eruoDay: 0, //defualt 0. specific maintenance cost of vehicles (eur/day)
    factorMaintananceCost_eruo: 0, //defualt 0.correction factor for maintenance cost of different vehicles
    rentingCostPerDay: 0,//defualt 0 . renting cost per time unit (eur/day)
    startPoint:address[0],
    endPoint:address[1]
  }
    setFormData(jsonItem)
   
}

const handleSubmit = async (e) => {
    console.log(vehicle)
    await getFulePrice(detailsCountry[0]['name'])
    await calculation();

  
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
  

      if (response.ok) {
        // Successful registration
        setShowModal(true)
        console.log(dataRes);
      } else {
        // Handle registration failure
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
};

  return (
    <div>
    {showModal && <Modal >
      <div class="modal-content">
      <span class="close" onClick={()=>{
                                        setShowModal(false);
                                      //  window.location.reload(false);
                                      }
                                  }>&times;</span>
          <p>cost own vehicle and driver : {(resCalculate['cost_ownVehicleAndDriver'])}</p>
          <p>cost own vehicle and driver with 10% profit : {(resCalculate['cost_ownVehicleAndDriver_10persantageProfit'])}</p>
          <p>cost own vehicle and driver with 15% profit : {(resCalculate['cost_ownVehicleAndDriver_15persantageProfit'])}</p>
          <p>cost own vehicle and driver with 20% profit : {(resCalculate['cost_ownVehicleAndDriver_20persantageProfit'])}</p>
          {/* <p>cost rent vehicle and own driver : {resCalculate['cost_rentVehicleOwnDriver']}</p> */}
   
         
      </div>

    </Modal> 
    }
    <div className='block'>
      {<DropDownLIst data={vehicle} idName={"vehicle"} onChange={vehicle_onChange} lableDes={"Select vehicle:"} lableName={"vehicle"}/>}
    </div>
    <div className='block'>
      <Item idName='transporetdUsefullLoad_ton' des='transported useful load (Ton): ' handleChange= {(e)=> setLoadPerTon(e.target.value)}  />
    </div>

   


    <button type="submit" on onClick={handleSubmit} class="btn btn-primary">Calculator</button>
    {showModal && <History points={points}  res= {resCalculate}/>}


  </div>
  
       
  
  )
}


