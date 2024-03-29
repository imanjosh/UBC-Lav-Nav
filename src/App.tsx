import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import React, { useRef, useEffect, useMemo } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mappedin/mappedin-js/lib/mappedin.css";
import useMapView from './useMapView.tsx';
import useVenue from "./useVenue";
import { Link } from 'react-router-dom';
import Navigation from "./Navigation.tsx";
import Interactivity from "./Interactivity.tsx";
import Camera from "./Camera.tsx";
import NavigationLSI from "./NavigationLSI.tsx"


import {
  TGetVenueMakerOptions,
  MARKER_ANCHOR,
  COLLISION_RANKING_TIERS
} from "@mappedin/mappedin-js";
import { TMapViewOptions } from "@mappedin/mappedin-js/renderer/internal";
import "@mappedin/mappedin-js/lib/mappedin.css";
import "./App.css";
import useVenueMaker from "./useVenueMaker.ts";

import useMapClick from "./useMapClick";


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
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.2456762611106, 49.26423103672272],
        },
        properties: {
          title: "UBC Hospital",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25314248131448, 49.266061050763426],
        },
        properties: {
          title: "UBC Chemistry Building",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25514720949033, 49.266640776882724],
        },
        properties: {
          title: "UBC Koerner Library",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.2539754452042, 49.26834143064795],
        },
        properties: {
          title: "UBC Buchanan",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.2425072899799, 49.266672932376736],
        },
        properties: {
          title: "UBC Mcdonald's",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25203414494928, 49.263179299778415],
        },
        properties: {
          title: "UBC Earth Sciences Building",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.2542644753265, 49.262861594635666],
        },
        properties: {
          title: "UBC Swing Space",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.2416327299978, 49.26004429397963],
        },
        properties: {
          title: "UBC Thunderbird Arena",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.26185757041759, 49.26123130155392],
        },
        properties: {
          title: "UBC Wreck Beach",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.23680237943631, 49.25466730147801],
        },
        properties: {
          title: "UBC Save-On-Foods",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.24442796301986, 49.256721048051986],
        },
        properties: {
          title: "FPInnovations",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.2488600097989, 49.26114210356761],
        },
        properties: {
          title: "UBC ICICS",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25146003572073, 49.260517710592836],
        },
        properties: {
          title: "UBC OC",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25755850213645, 49.270229062179396],
        },
        properties: {
          title: "UBC Department of Anthropology",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.25190673888444, 49.26436102438785],
        },
        properties: {
          title: "UBC BIOSCI Building",
          description: "... washrooms",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123.24763794898352, 49.26457072947733],
        },
        properties: {
          title: "UBC Woodward Library",
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


      el.addEventListener("click", () => {
        // Navigate to another page when AMS Nest marker is clicked
        if (feature.properties.title === "AMS Nest") {
          window.location.href = '/ams-nest';
        } else {
          window.location.href = '/life-sciences-institute';
        }
      });

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
      );

      el.addEventListener("mouseenter", () => {
        // Show the popup on hover
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
          .setPopup(popup)
          .addTo(map)
          .togglePopup(); // Open the popup
      });

      el.addEventListener("mouseleave", () => {
        // Close the popup on mouse leave
        popup.remove();
      });

      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates as mapboxgl.LngLatLike)
        .addTo(map);
    }

    return () => map.remove();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/ams-nest" element={<AmsNest />} />
        <Route path="/ams-nest/interactivity" element={<Interactivity />} />
        <Route path="/ams-nest/navigation" element={<Navigation mapID = "659efcf1040fcba69696e7b6"/>} />
        <Route path="/ams-nest/camera" element={<Camera />} />
        <Route path="/life-sciences-institute" element={<LifeSciencesInstitute />} />
        <Route path="/life-sciences-institute/interactivity" element={<Interactivity />} />
        <Route
    path="/life-sciences-institute/navigation"
    element={<Navigation mapID = "657cc670040fcba69696e69e"/>}
  />
        <Route path="/life-sciences-institute/camera" element={<Camera />} />
      </Routes>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </Router>
  );
};

const AmsNest: React.FC = () => {


  const mapRef = useRef();
  // See Trial API key Terms and Conditions
  // https://developer.mappedin.com/api-keys
  const options = useMemo<TGetVenueMakerOptions>(
    () => ({
      mapId: "659efcf1040fcba69696e7b6",
      key: "65a0422df128bbf7c7072349",
      secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
    }),
    []
  );

  const venue = useVenueMaker(options);

  const mapOptions = useMemo<TMapViewOptions>(
    () => ({
      backgroundColor: "#CFCFCF" // Background colour behind the map
    }),
    []
  );

  const { elementRef, mapView } = useMapView(venue, mapOptions);

  /* Map setup should be done in a useEffect */
  useEffect(() => {
    // Check that the map and venue were created successfully
    if (!mapView || !venue) {
      return;
    }

    // Label all spaces and desks which have a name
    mapView.FloatingLabels.labelAllLocations();
  }, [mapView, venue]);

  useEffect(() => {
    // Check that the map and venue were created successfully
    if (!mapView || !venue) {
      return;
    }

    // Label all spaces and desks which have a name
    mapView.FloatingLabels.labelAllLocations();
  }, [mapView, venue]);

  return (
    <div id="app">
      <div id="ui">
      <div style={{ display: "flex", gap: "12px" }}>
        Examples:
        <Link to="/ams-nest">Basic</Link>
        <Link to="/ams-nest/interactivity">Interactivity</Link>
        <Link to="/ams-nest/navigation">Navigation</Link>
        <Link to="/ams-nest/camera">Camera</Link>
      </div>
        {/* Render some map details to the UI */}
        {venue?.venue.name ?? "Loading..."}
        {venue && (
          <select
            onChange={(e) => {
              if (!mapView || !venue) {
                return;
              }

              // When the floor select changes we can find and set the map to that ID
              const floor = venue.maps.find((map) => map.id === e.target.value);
              if (floor) {
                mapView.setMap(floor);
              }
            }}
          >
            {/* The venue "maps" represent each floor */}
            {venue?.maps.map((level, index) => {
              return (
                <option value={level.id} key={index}>
                  {level.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div id="map-container" ref={elementRef}></div>
    </div>
  );
};

const LifeSciencesInstitute: React.FC = () => {
  const mapRef = useRef();
  // See Trial API key Terms and Conditions
  // https://developer.mappedin.com/api-keys
  const options = useMemo<TGetVenueMakerOptions>(
    () => ({
      mapId: "657cc670040fcba69696e69e",
      key: "65a0422df128bbf7c7072349",
      secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
    }),
    []
  );

  const venue = useVenueMaker(options);

  const mapOptions = useMemo<TMapViewOptions>(
    () => ({
      backgroundColor: "#CFCFCF" // Background colour behind the map
    }),
    []
  );

  const { elementRef, mapView } = useMapView(venue, mapOptions);

  return (
    <div id="app">
      <div id="ui">
      <div style={{ display: "flex", gap: "12px" }}>
        Examples:
        <Link to="/life-sciences-institute">Basic</Link>
        <Link to="/life-sciences-institute/interactivity">Interactivity</Link>
        <Link to="/life-sciences-institute/navigation">Navigation</Link>
        <Link to="/life-sciences-institute/camera">Camera</Link>
      </div>
        {/* Render some map details to the UI */}
        {venue?.venue.name ?? "Loading..."}
        {venue && (
          <select
            onChange={(e) => {
              if (!mapView || !venue) {
                return;
              }

              // When the floor select changes we can find and set the map to that ID
              const floor = venue.maps.find((map) => map.id === e.target.value);
              if (floor) {
                mapView.setMap(floor);
              }
            }}
          >
            {/* The venue "maps" represent each floor */}
            {venue?.maps.map((level, index) => {
              return (
                <option value={level.id} key={index}>
                  {level.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div id="map-container" ref={elementRef}></div>
    </div>
  );
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
