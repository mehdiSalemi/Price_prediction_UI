
import { MapContainer,TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


import LeafletRoutingMachine from './LeafletRoutingMachine';
import { useState } from 'react';
import {  Points } from './Countext';

import CalculationForm from './components/CalculationForm';

import SearchBox from './components/SearchBox';
import History from './components/History';




function App() {
  const position = [49.8153, 6.1296];

  const [points,setPoints] = useState([])
  


return (
  <div>
    <div className="App"  style={{ border:"1px solid red" ,display:"flex" ,flexDirection:"row", widows: "100vw", height:"50vh"}}>
      <Points.Provider value={{points,setPoints}}> 
          <div style={{border:"1px solid blue", width:"50vw"}}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mEsBIlAG4G16W5wZArn5"
                            />
                {/*  <LeafletGeocoder /> */}
                <LeafletRoutingMachine />
            </MapContainer>
          </div>
          <div style={{border:"1px solid yellow", width:"50vw"}}>
            <SearchBox/>
            <CalculationForm/>
          </div >

        </Points.Provider>
    </div>
    <div style={{border:"1px solid black",  height:"50vw"}}>
       <div style={{margin:"5px", }}>
          <h2>History</h2>
          <History/>
       </div>
    </div>
  </div>
  );
}

export default App;
