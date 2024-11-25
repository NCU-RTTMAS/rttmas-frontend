<script setup>
import { ref, computed, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet-routing-machine'
import * as turf from '@turf/turf';

let map

const initMap = () => {
    map = L.map('map').setView([24.956960, 121.199508], 18);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map)
}

import { KalmanFilter } from 'kalman-filter';



// const drawNodes = (pathData) => {

//     let waypoints = []

//     for (const [reportTime, report] of Object.entries(pathData)) {
//         let currentCoordinatePair = L.latLng(report.latitude, report.longitude)
//         waypoints.push(currentCoordinatePair)
//     }

//     // waypoints.forEach(waypoint => {
//     //     let circle = L.circle(waypoint, { // Example coordinates
//     //         color: 'green',
//     //         fillColor: 'green',
//     //         fillOpacity: 1,
//     //         radius: 2 // Radius in meters
//     //     }).addTo(map);
//     // })


//     let control = L.Routing.control({
//         waypoints: waypoints,
//         routeWhileDragging: true,
//         draggableWaypoints : false,
//         addWaypoints : false,
//         // geocoder: L.Control.Geocoder,
//         createMarker: function() { return null; },
//         show: false,
//     })

//     control.addTo(map)

    
//     control.on('routeselected', function(e) {
//         let coord = e.route.coordinates;        

//         let nearestPoints = findNearestPoints(waypoints, e.route.coordinates)
//         console.log(nearestPoints)

//         let finalPoints = []

//         nearestPoints.forEach(point => {
//             let circle = L.circle(point.nearestPoint, { // Example coordinates
//                 color: 'red',
//                 fillColor: 'red',
//                 fillOpacity: 1,
//                 radius: 2 // Radius in meters
//             }).addTo(map);

//             finalPoints.push(point.nearestPoint)
//         })

//         // control.remove()

//         const polyline = L.polyline(finalPoints, { color: 'blue' }).addTo(map);
//     });
// }


// Function to find the nearest point in arrayB for each point in arrayA
// const findNearestPoints = (arrayA, arrayB) => {
//     const nearestPoints = [];

//     arrayA.forEach(pointA => {
//         let minDistance = Infinity;
//         let nearestPoint = null;

//         arrayB.forEach(pointB => {
//             // Calculate distance using Turf.js
//             const distance = turf.distance(
//                 turf.point([pointA.lng, pointA.lat]), // Note the order: [lng, lat]
//                 turf.point([pointB.lng, pointB.lat]), // Note the order: [lng, lat]
//                 { units: 'kilometers' }
//             );

//             // Check if this is the nearest point
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 nearestPoint = pointB;
//             }
//         });

//         nearestPoints.push({
//             pointA: pointA,
//             nearestPoint: nearestPoint,
//             distance: minDistance
//         });
//     });

//     return nearestPoints;
// }


const drawPath = (pathData) => {
    const layer = L.layerGroup()
    const waypoints = smoothenPath(pathData)

    // for (const [reportTime, report] of Object.entries(pathData)) {
    //     let currentCoordinatePair = L.latLng(report.latitude, report.longitude)
    //     waypoints.push(currentCoordinatePair)
        
    //     L.circle(currentCoordinatePair, { // Example coordinates
    //         color: 'red',
    //         fillColor: 'red',
    //         fillOpacity: 1,
    //         radius: 2 // Radius in meters
    //     })
    //     .bindPopup(`Time: ${reportTime}<br>Latitude: ${report.latitude}<br>Longitude: ${report.longitude}`)
    //     .addTo(layer)
    // }
    waypoints.forEach(waypoint => {
        
        L.circle(waypoint, { // Example coordinates
            color: 'red',
            fillColor: 'red',
            fillOpacity: 1,
            radius: 2 // Radius in meters
        })
        // .bindPopup(`Time: ${reportTime}<br>Latitude: ${report.latitude}<br>Longitude: ${report.longitude}`)
        .addTo(layer)
    })


    const polyline = L.polyline(waypoints, { color: 'red' }).addTo(layer);
    layer.addTo(map)

    let bounds = new L.LatLngBounds(waypoints);
    map.fitBounds(bounds)
}

const smoothenPath = (pathData) => {

    let waypoints = []
    let results = []
    for (const [reportTime, report] of Object.entries(pathData))
        waypoints.push([report.latitude, report.longitude])


    const obsletiance = 1e10;
    const kFilter = new KalmanFilter({
        observation: {
            sensorDimension: 2,
            name: 'sensor'
        },
        dynamic: {
            name: 'constant-acceleration',// observation.sensorDimension * 3 == state.dimension
            timeStep: 0.1,
            coletiance: [3, 3, 4, 4, 5, 5]// equivalent to diag([3, 3, 4, 4, 5, 5])
        }
    });
    // waypoints = kFilter.filterAll(waypoints)
    
    waypoints.forEach(waypoint => {
        results.push(L.latLng(waypoint[0], waypoint[1]))
    })
    
    return results
}

const updateForObject = (identifier, object) => {
    
    if (object.mapLayer)
        object.mapLayer.clearLayers()

    object.mapLayer = L.layerGroup()
    object.mapNodes = {}
    object.mapLines = {}

    // const waypoints = smoothenPath(object.pathHistory)
    let waypoints = []
    let previousWaypoint = null


    let color = getRandomColor()

    for (let [reportTime, report] of Object.entries(object.pathHistory)) {
        const waypoint = [report.latitude, report.longitude]
        waypoints.push(waypoint)
        
        object.mapNodes[reportTime] = L.circle(waypoint, {
            color: color,
            fillColor: color,
            fillOpacity: 1,
            radius: 2 // Radius in meters
        })
        .bindPopup(`Object: ${identifier}<br>Time: ${reportTime}<br>Latitude: ${report.latitude}<br>Longitude: ${report.longitude}<br>Speed: ${report.speed} km/h<br>Heading: ${report.heading}`)

        if (previousWaypoint != null)
            object.mapLines[reportTime] = L.polyline([previousWaypoint, waypoint], { color: color })
        else
            object.mapLines[reportTime] = null
        
        previousWaypoint = waypoint
    }

    object.mapLayer.addTo(map)

    let bounds = new L.LatLngBounds(waypoints);
    map.fitBounds(bounds)
}

const getRandomColor = () => {
    let color;
    let r = Math.floor(Math.random() * 220);
    let g = Math.floor(Math.random() * 220);
    let b = Math.floor(Math.random() * 220);
    return `rgb(${r}, ${g}, ${b})`
}

const getMap = () => map

defineExpose({
  initMap, drawPath, updateForObject, getMap
})

onMounted(() => {
    initMap()
})
</script>

<template>
    <div id="map" class="
        w-full h-[75vh]
        border border-gray-300
        outline-0 rounded-lg
        overflow-hidden
    "></div>
</template>