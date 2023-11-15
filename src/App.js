
import { MapContainer,TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

import ItemLIsit from './components/ItemLIsit';
import LeafletRoutingMachine from './LeafletRoutingMachine';
import { useEffect, useState } from 'react';
import { Distance } from './Countext';



function App() {
  const position = [49.8153, 6.1296];
  const [distance,setDistance] = useState([0,0])
  
  useEffect(() => {
    
    document.getElementById("lengthWithUsefulLoad_km").value = distance[0]
   

   
  },[distance])
  return (
<div className="App">
   <Distance.Provider value={{distance,setDistance}}>
   <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mEsBIlAG4G16W5wZArn5"
                    />
        {/*  <LeafletGeocoder /> */}
        <LeafletRoutingMachine />
      
    </MapContainer>
    <ItemLIsit/>
    </Distance.Provider>

    

 


   
  
</div>
  );
}

export default App;
