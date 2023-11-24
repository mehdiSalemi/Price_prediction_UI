import React, { useContext, useEffect, useState } from "react";
import L, { point } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { Distance, Points } from "./Countext";



const LeafletRoutingMachine = () => {
        const map = useMap();
        const {points,setPoints} = useContext(Points)
        points.map((point)=>{
            L.marker(point).addTo(map);
        })

        let DefaultIcon = L.icon({
            iconUrl: "/marche.gif",
            iconSize: [20, 20],
        });

        useEffect(()=>{
            console.log("mehdi")
            console.log(points)
            if(points.length > 2){
                setPoints([])
            }else
            if(points.length === 2 ){
               
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
           
           
        },[points])

        map.on("click", function (e) {
            console.log(e)
             setPoints([...points,[e.latlng.lat, e.latlng.lng]])
           

});

  return null;
};

export default LeafletRoutingMachine;


