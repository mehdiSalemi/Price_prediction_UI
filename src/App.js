
import { MapContainer,TileLayer } from 'react-leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


import LeafletRoutingMachine from './LeafletRoutingMachine';
import { useState } from 'react';
import { Distance, Points } from './Countext';

import CountriesList from './components/CalculationForm';
import CalculationForm from './components/CalculationForm';


function test (){
  const coord = [49.8153, 6.1296] 
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coord[0]}&lon=${coord[1]}&format=json`, {
    headers: {
      'User-Agent': 'ID of your APP/service/website/etc. v0.1'
    }
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      console.log(res.display_name)
      console.log(res.address)
  })
}

function App() {
  const position = [49.8153, 6.1296];

  const [points,setPoints] = useState([])
  


return (
    <div className="App">

      <Points.Provider value={{points,setPoints}}>          
 
          
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mEsBIlAG4G16W5wZArn5"
                            />
                {/*  <LeafletGeocoder /> */}
                <LeafletRoutingMachine />
              
            </MapContainer>

          

            <CalculationForm/>

        </Points.Provider>

    </div>
  );
}

export default App;
