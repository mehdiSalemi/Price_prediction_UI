import React, { useState,useContext } from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import "./SearchBox.css"
import { Points } from '../Countext';
import { point } from 'leaflet';


const NOMIATIM_URL= "https://nominatim.openstreetmap.org/search?";

export default function SearchBox() {
    const [searchText,setSearchText] =useState();
    const [listPlaces,setLIstPlaces] =useState([]);
    const {points,setPoints} = useContext(Points)

   

  return (
    <div>
        {/* <OutlinedInput value={searchText} onChange={(e)=>{
             setSearchText(e.target.value)
            }}
        /> */}
        
       <div className='block'>
        <label>Pickup address:</label>
        <input style={{width:"70%", margin:"5px"}} type="text" id="startPoint" onChange={(e)=>{
                setSearchText(e.target.value)
                }} 
                onKeyUp={()=>{
                    const params ={
                        q:searchText,
                        format:'json',
                        addressdetails: 1,
                        polygon_geojson:0
                    };
                    const queryString = new URLSearchParams(params);
                    console.log(queryString)
            
                    const requestOptions ={
                        methode: "GET",
                        redirect: "follow"
                    };
                
                    fetch(`${NOMIATIM_URL}${queryString}`,requestOptions)
                    .then((response) => response.text())
                    .then((ressult) => {
                        setLIstPlaces(JSON.parse(ressult))
                    })
                    .catch((err)=>{console.log(err); setLIstPlaces([])})
                }}
                
                placeholder="You should enter dlivery address or postal code"
                
                title="Type in a name"></input>

            {/* <Button variant='contained' color='primary' onClick={()=>{
                const params ={
                    q:searchText,
                    format:'json',
                    addressdetails: 1,
                    polygon_geojson:0
                };
                const queryString = new URLSearchParams(params);
            
        
                const requestOptions ={
                    methode: "GET",
                    redirect: "follow"
                };
                fetch(`${NOMIATIM_URL}${queryString}`,requestOptions)
                .then((response) => response.text())
                .then((ressult) => {
                    console.log(JSON.parse(ressult))
                    setLIstPlaces(JSON.parse(ressult))
                })
                .catch((err)=>console.log(err))
            }}>
                search

        </Button> */}

       </div>
       <div className='block'>
       <label>Delivery address:</label>
        <input style={{width:"70%",margin:"5px"}} type="text" id="endPoint" onChange={(e)=>{
                setSearchText(e.target.value)
                }} 
                onKeyUp={()=>{
                    const params ={
                        q:searchText,
                        format:'json',
                        addressdetails: 1,
                        polygon_geojson:0
                    };
                    const queryString = new URLSearchParams(params);
                    console.log(queryString)
            
                    const requestOptions ={
                        methode: "GET",
                        redirect: "follow"
                    };
                
                    fetch(`${NOMIATIM_URL}${queryString}`,requestOptions)
                    .then((response) => response.text())
                    .then((ressult) => {
                        setLIstPlaces(JSON.parse(ressult))
                    })
                    .catch((err)=>{console.log(err); setLIstPlaces([])})
                }}
                
                placeholder="You should enter dlivery address or postal code"
                
                title="Type in a name"></input>

            {/* <Button variant='contained' color='primary' onClick={()=>{
                const params ={
                    q:searchText,
                    format:'json',
                    addressdetails: 1,
                    polygon_geojson:0
                };
                const queryString = new URLSearchParams(params);
            
        
                const requestOptions ={
                    methode: "GET",
                    redirect: "follow"
                };
                fetch(`${NOMIATIM_URL}${queryString}`,requestOptions)
                .then((response) => response.text())
                .then((ressult) => {
                    console.log(JSON.parse(ressult))
                    setLIstPlaces(JSON.parse(ressult))
                })
                .catch((err)=>console.log(err))
            }}>
                search

        </Button> */}

       </div>
            

            <ul id="myUL">
                {
                    listPlaces.map((place)=>{
                        return(  
                            <li onClick={(e)=>
                                {
                                    setPoints([...points, [place.lat,place.lon]])
                                    setLIstPlaces([])
                                    let a = points.length ==0 ? "startPoint" :"endPoint"
                                    document.getElementById(a).value = place.display_name
                                    
                                }
                            }>
                                <a>{place.display_name}</a>
                            </li>)
                    })
                }   

            </ul>

            
 
    </div>
  )
}
