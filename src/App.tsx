import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import React, { useRef, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const App: React.FC = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaW1hbmpvc2giLCJhIjoiY2xxYnYwMjFtMXliZzJybnVyb3I2czd0ayJ9.b5OwsS6qkjYrWIgRF0Q5OA";
  const mapContainer = useRef<HTMLDivElement>(null);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.24453867410907, 49.262421987342734],
        },
        properties: {
          title: "Life Sciences Institute",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25004716061741, 49.26667498031302],
        },
        properties: {
          title: "AMS Nest",
          description: "... washrooms",
        },
      },
    ],
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-123.2341542337127, 49.26149879578355],
      zoom: 12.9,
    });

    map.on("load", () => {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken!,
        mapboxgl: mapboxgl,
      });

      map.addControl(geocoder);
    });

    map.on("click", (e) => {
      console.log(e.lngLat);
    });

    for (const feature of geojson.features) {
      const el = document.createElement("div");
      el.className = "marker";

      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
        )
        .addTo(map);
    }

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default App;


// import "./App.css";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// import React, { useRef, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// const App = () => {
//   mapboxgl.accessToken =
//     "pk.eyJ1IjoiaW1hbmpvc2giLCJhIjoiY2xxYnYwMjFtMXliZzJybnVyb3I2czd0ayJ9.b5OwsS6qkjYrWIgRF0Q5OA";
//   const mapContainer = useRef();

//   const geojson = {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [-123.24453867410907, 49.262421987342734],
//         },
//         properties: {
//           title: "Life Sciences Institute",
//           description: "... washrooms",
//         },
//       },
//       {
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [-123.25004716061741, 49.26667498031302],
//         },
//         properties: {
//           title: "AMS Nest",
//           description: "... washrooms",
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [-123.2341542337127, 49.26149879578355],
//       zoom: 12.9,
//     });

//     map.on("load", () => {
//       const geocoder = new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//       });

//       map.addControl(geocoder);
//     });

//     map.on("click", (e) => {
//       console.log(e.lngLat);
//     });

//     for (const feature of geojson.features) {
//       const el = document.createElement("div");
//       el.className = "marker";

//       new mapboxgl.Marker(el)
//         .setLngLat(feature.geometry.coordinates)
//         .setPopup(
//           new mapboxgl.Popup({ offset: 25 }).setHTML(
//             `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
//           )
//         )
//         .addTo(map);
//     }

//     return () => map.remove();
//   }, []);

//   return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
// };

// export default App;
