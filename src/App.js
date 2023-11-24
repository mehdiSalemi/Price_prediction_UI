
import { MapContainer,TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


import LeafletRoutingMachine from './LeafletRoutingMachine';
import { useState } from 'react';
import {  Points } from './Countext';

import CalculationForm from './components/CalculationForm';

import SearchBox from './components/SearchBox';




function App() {
  const position = [49.8153, 6.1296];

  const [points,setPoints] = useState([])
  


return (
    <div className="App"  style={{ display:"flex" ,flexDirection:"row", widows: "100vw", height:"50vh"}}>
      <Points.Provider value={{points,setPoints}}> 
          <div style={{ width:"50vw"}}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mEsBIlAG4G16W5wZArn5"
                            />
                {/*  <LeafletGeocoder /> */}
                <LeafletRoutingMachine />
            </MapContainer>
          </div>
          <div style={{ width:"50vw"}}>
            <SearchBox/>
            <CalculationForm/>
          </div >

        </Points.Provider>
    </div>
  );
}

export default App;
