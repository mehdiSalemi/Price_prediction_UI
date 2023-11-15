import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css'

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


export default function MapWithRouting() {
  const center = [51.505, -0.09]; // Set the initial center of the map
  const zoom = 13; // Set the initial zoom level

  const waypoints = [
    L.latLng(51.5, -0.09), // Start point
    L.latLng(51.51, -0.1), // Waypoint
    L.latLng(51.52, -0.12), // Waypoint
    L.latLng(51.53, -0.14), // Waypoint
    L.latLng(51.54, -0.16), // End point
  ];

  const routeOptions = {
    waypoints,
    routeWhileDragging: true,
  };

  return (
    <div className='row'>
    <div className='col text-center'>
        <div className='col'>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mEsBIlAG4G16W5wZArn5"
                />
              <Marker position={waypoints[0]} />
              <Marker position={waypoints[waypoints.length - 1]} />

              {/* Add the routing control */}
        
              <L.RoutingControl waypoints={waypoints} routeOptions={routeOptions} />

              {/* Add popups for each waypoint */}
              {waypoints.map((waypoint, index) => (
                <Marker key={index} position={waypoint}>
                  <Popup>{`Waypoint ${index + 1}`}</Popup>
                </Marker>
              ))}
            </MapContainer>
        </div>
        </div>
   </div>
  )
}
