import React, { useContext, useEffect, useState } from "react";
import L, { point } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { Distance, Points } from "./Countext";


const LeafletRoutingMachine = () => {
const map = useMap();
const {distance,setDistance} = useContext(Distance)
// const [points,setPoints] = useState([Points])
const [points,setPoints] = useState([])



let DefaultIcon = L.icon({
    iconUrl: "/marche.gif",
    iconSize: [20, 20],
});

useEffect(()=>{
    console.log(points)
    if(points.length === 2 ){
        L.marker(points[1]).addTo(map);
        L.Routing.control({
            waypoints: [
            L.latLng(points[0]),
            L.latLng(points[1]),
            ],
            lineOptions: {
            styles: [
                {
                color: "blue",
                weight: 4,
                opacity: 0.7,
                },
            ],
            },
            routeWhileDragging: false,
            // geocoder: L.Control.Geocoder.nominatim(),
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
        })
            // .on("routesfound", function (e) {
            // e.routes[0].coordinates.forEach((c, i) => {
            //     setTimeout(() => {
            //     marker1.setLatLng([c.lat, c.lng]);
            //     }, 500 * i);
            // });
            // })
            .addTo(map);
    }
    const h3Tag = document.querySelector('.leaflet-routing-alt  h3')
    if (h3Tag) {
        // Set a new value for the <h3> tag
        // h3Tag.textContent = 'New value set by JavaScript';
        const h3Tag_val = h3Tag.textContent.split(',')

        setDistance([h3Tag_val[0].replace('km',''),h3Tag_val[1].replace('min','')])
      } else {
        console.log('No <h3> tag found within the element with class "mehdi"');
      }

},[points])


 
// var marker1 = L.marker(points[0], { icon: DefaultIcon }).addTo( map  );

map.on("click", function (e) {
    
 
    setPoints([...points,[e.latlng.lat, e.latlng.lng]])


});

  return null;
};

export default LeafletRoutingMachine;
