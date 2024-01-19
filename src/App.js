
import { MapContainer,TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'



import { useState } from 'react';
import { Points,Address,DetailsCountry, Distance,Estimated_time } from './Countext';

import CalculationForm from './components/CalculationForm';


import History from './components/History';
import './components/TabsPage.css'

import Tab from './components/Tab';




function App() {
  const [points,setPoints] = useState([])
  const [address,setAddress] = useState([])
  const [detailsCountry,setDetailsCountry] = useState([])
 
  const [distance, setDistance] = useState(0)

  const [estimatedTime, setEstimatedTime] = useState(0)




return (
  <div  className="App" >
    <div style={{width:"100%", margin:"5px",  height:"600px"}}>
      <Points.Provider value={{points,setPoints}}>
      <Address.Provider value={{address,setAddress}}>
      <DetailsCountry.Provider value={{detailsCountry,setDetailsCountry}}> 
      <Distance.Provider value={{distance, setDistance}}>
      <Estimated_time.Provider value={{estimatedTime, setEstimatedTime}}>

      <div class="split left">
          <Tab/>
      </div>
      <div class="split right">
        <CalculationForm/>
      </div>

      </Estimated_time.Provider>
      </Distance.Provider>
      </DetailsCountry.Provider>
      </Address.Provider>
      </Points.Provider> 
    </div>
   
    <div id="table-wrapper" style={{ width:"90%", height:"500px", margin:"5%", overflow:"visible", overflowY:"scroll"}}>
       <div id="table-scroll">
          <h2>History</h2>
          <History/>
       </div>
    </div>
  </div>
  );
}

export default App;
