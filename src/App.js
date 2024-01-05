
import { MapContainer,TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


import LeafletRoutingMachine from './LeafletRoutingMachine';
import { useState } from 'react';
import { Points,Address,DetailsCountry, Distance,Estimated_time } from './Countext';

import CalculationForm from './components/CalculationForm';

import SearchBox from './components/SearchBox';
import History from './components/History';
import './components/TabsPage.css'
import Country from './components/Country';




function App() {
  const position = [49.8153, 6.1296];

  const [points,setPoints] = useState([])
  const [address,setAddress] = useState([])
  const [detailsCountry,setDetailsCountry] = useState([])
  const [toggle,setToggle] = useState(1)
  const [distance, setDistance] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)

  function updateToggle(id){
      setToggle(id)
  }


return (
  <div  className="App" >
    <div style={{border:"1px solid black", width:"95%",  height:"500px"}}>
      <Points.Provider value={{points,setPoints}}>
      <Address.Provider value={{address,setAddress}}>
      <DetailsCountry.Provider value={{detailsCountry,setDetailsCountry}}> 
      <Distance.Provider value={{distance, setDistance}}>
      <Estimated_time.Provider value={{estimatedTime, setEstimatedTime}}>
      <div class="split left">
      <div class="topnav">
              <a href="#Map" onClick={()=>updateToggle(1)} title='You can select sender and resiver place on the map' >Map</a>
              <a href="#Postal code" onClick={()=>updateToggle(2)} title='you can select sender and resiver country then enter distance'>Postal code</a>
              <a href="#Country" onClick={()=>updateToggle(3)}title='you can find sender and resiver location by postal code'>country</a>
        
          </div>
          
          <div className={toggle ===1 ? "show-contect" : "content"}>
                  
            <div  style={{width:"100%", height:"400px"}}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
                  <TileLayer
                                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                  url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mEsBIlAG4G16W5wZArn5"
                              />
                  {/*  <LeafletGeocoder /> */}
                  <LeafletRoutingMachine />
              </MapContainer>
            </div>
  
          </div>   
          <div  className={toggle ===2 ? "show-contect" : "content"}>
              <SearchBox/>     
          </div>
         
          <div  className={toggle ===3 ? "show-contect" : "content"}>
            <Country/>
          </div>
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
   
    <div style={{border:"1px solid black",  height:"500px"}}>
       <div style={{margin:"5px", }}>
          <h2>History</h2>
          <History/>
       </div>
    </div>
  </div>
  );
}

export default App;
