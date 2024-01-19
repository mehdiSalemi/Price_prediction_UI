import React from 'react'
import { useState, useEffect,useContext } from 'react';
import { MapContainer,TileLayer } from 'react-leaflet';
import LeafletRoutingMachine from '../LeafletRoutingMachine';
import SearchBox from './SearchBox';
import Country from './Country';





export default function Tab() {
const [toggle,setToggle] = useState(1)
const position = [49.8153, 6.1296];



function updateToggle(id){
    setToggle(id)
}
  return (
    <div>
    <div> You should select address through one of the other methods on the followin</div>
    <div class="topnav">
            <a href="#Map" onClick={()=>updateToggle(1)} title='You should select sender and resiver place on the map' >Map</a>
            <a href="#Postal code" onClick={()=>updateToggle(2)} title='you should find sender and resiver location by postal code'>Postal code</a>
            <a href="#Country" onClick={()=>updateToggle(3)}title='you should select sender and resiver country then sould enter distance'>country</a>
      
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
  )
}
