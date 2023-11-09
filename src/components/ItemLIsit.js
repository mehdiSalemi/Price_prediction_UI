import React from 'react'
import Item from './Item'
import { useState } from 'react';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from './Modal';
const items = [
  {"name": "lengthWithUsefulLoad_km","des":"length of the way with useful load in case of j-th transport task (KM)"},
  {"name": "fulePrice_euroLitter","des":"fuel price(Euro/ liter)"},
  {"name": "fuleConsumptionEmptyVehicle_litterKM","des":"specific fuel consumption in case of empty vehicle (Litter/KM)"},
  {"name": "factorFuelConsumptionDependTopographicalFactor","des":"correction factor for fuel consumption depending on topographical conditions"},
  {"name": "fcatorDifferentLoadingCondition_litterTonKm","des":"correction factor for different loading conditions (every additional tons ofuseful load results in 0.5 litre extra fuel consumption)(liter/ton.KM)"},
  {"name": "transporetdUsefullLoad_ton","des":"transported useful load (Ton)"},
  {"name": "lengthWithOutLoad_km","des":"length of way without load in case of the j-th transport task (KM)"},
  {"name": "t_Loading_hour","des":" time consumption of loading in and loading out (hour)"},
  {"name": "t_waitingLoading_hour","des":"waiting for loading in and loading out activity (hour)"},
  {"name": "t_waitingFrontier_hour","des":"waiting time at the frontier station (hour)"}, 
  {"name": "t_resting_hours","des":"waiting time due to required resting (AETR) (hour)"},
  {"name": "t_camionStop_hours","des":"waiting time due to camion stop (hour)"},
  {"name": "specialWaitingCost_euroHour","des":"specific waiting cost (euro/hour)"}, 
  {"name": "t_ConsumptionWithoutLoad_hour","des":" time consumption of ways without useful load"},
  {"name": "t_ConsumptionWithload_hour","des":"time consumption of ways with useful load"},
  {"name": "avg_labourCost_euroHour","des":"average labour cost of a driver (euro/hour)"},
  {"name": "factorMaintananceCost_eruo","des":"correction factor for maintenance cost of different vehicles"},
  {"name": "feeOfMotorways_euro","des":"fee of motorways used by vehicles"}, 
  {"name": "ParkingFee_eruo","des":"parking fees"},
  {"name": "t_consumptionAchivmentTransportTask_day","des":"time consumption of the achievement of a transport task (day)"},
  {"name": "specificMaintenanceVeicles_eruoDay","des":"specific maintenance cost of vehicles (eur/day)"}, 
  {"name": "rentingCostPerDay","des":"renting cost per time unit (eur/day)"},

]


export default function ItemLIsit() {
  const [showModal,setShowModal] = useState(false)
  const [formData, setFormData] = useState( {
    lengthWithUsefulLoad_km: 0,
    t_ConsumptionWithload_hour: 0,
    lengthWithOutLoad_km: 0,
    t_ConsumptionWithoutLoad_hour: 0,
    fulePrice_euroLitter: 0,
    fuleConsumptionEmptyVehicle_litterKM: 0,
    factorFuelConsumptionDependTopographicalFactor: 0,
    transporetdUsefullLoad_ton: 0,
    fcatorDifferentLoadingCondition_litterTonKm: 0,
    t_Loading_hour: 0,
    t_waitingLoading_hour: 0,
    t_waitingFrontier_hour: 0,
    t_resting_hours: 0,
    t_camionStop_hours: 0,
    specialWaitingCost_euroHour: 0,
    feeOfMotorways_euro: 0,
    ParkingFee_eruo: 0,
    avg_labourCost_euroHour: 0,
    t_consumptionAchivmentTransportTask_day: 0,
    specificMaintenanceVeicles_eruoDay: 0,
    factorMaintananceCost_eruo: 0,
    rentingCostPerDay: 0
  });


 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const [resCalculate,setResCalculate] = useState()
  const handleSubmit = async (e) => {
    console.log(formData)
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
      showModal(true)

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
    
  <div class="container">
      {showModal && <Modal>
        <div class="modal-content">
        <span class="close" onClick={()=>setShowModal(false)}>&times;</span>
            <p>cost own vehicle and driver : {resCalculate['cost_ownVehicleAndDriver']}</p>
            <p>cost rent vehicle and own driver : {resCalculate['cost_rentVehicleOwnDriver']}</p>
        </div>

      </Modal> 
      }
    <h1>Data Entry Form</h1>
      <form method="post" onSubmit={handleSubmit} >
      {items.map(item => (
            <Item name={item.name} des={item.des} handleChange= {handleChange}/>
          ))}
      
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  
    </div>
  );
}

















