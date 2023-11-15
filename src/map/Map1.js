import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine'


import LocationMarker from './LocationMarker'


export default function Map() {

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
                   {/* <LocationMarker/> */}
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
