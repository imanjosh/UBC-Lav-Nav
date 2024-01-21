import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useRef, useEffect, useMemo, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  MARKER_ANCHOR,
  COLLISION_RANKING_TIERS,
  MappedinMap,
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import useMapChanged from "./useMapChanged.tsx";
import useMapView from './useMapView.tsx';
import useVenue from "./useVenue";
import { useMapClick } from "./useMapClick.tsx";
import { TGetVenueMakerOptions } from "@mappedin/mappedin-js";
import { TMapViewOptions } from "@mappedin/mappedin-js/renderer/internal";
import "@mappedin/mappedin-js/lib/mappedin.css";
import "./App.css";
import useVenueMaker from "./useVenueMaker.ts";

import "./styles.css";

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
    <BrowserRouter>
      <div style={{ display: "flex", gap: "12px" }}>
        Examples:
        <Link to="/">Basic</Link>
        <Link to="/interactivity">Interactivity</Link>
        <Link to="/navigation">Navigation</Link>
        <Link to="/camera">Camera</Link>
      </div>
      <Routes>
        <Route path="/interactivity" element={<Interactivity />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/ams-nest" element={<AmsNest />} />
        <Route path="/life-sciences-institute" element={<LifeSciencesInstitute />} />
      </Routes>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
    </BrowserRouter>
    
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

  return (

    <div>
      <h1>AMS Nest Page</h1>
    <div id="app" ref={elementRef} />;
    </div>
  );
};

const LifeSciencesInstitute: React.FC = () => {
  return (
    <div>
      <h1>Life Sciences Institute Page</h1>
      {/* Add content for the AMS Nest page */}
    </div>
  );
};

const Interactivity: React.FC = () => {
  const credentials = useMemo<TGetVenueMakerOptions>(
    () => ({
      // mapId: "657cc670040fcba69696e69e",
      // key: "65a0422df128bbf7c7072349",
      // secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
      mapId: "659efcf1040fcba69696e7b6",
      key: "65a0422df128bbf7c7072349",
      secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
    }),
    []
  );
  const venue = useVenueMaker(credentials);
  const { elementRef, mapView } = useMapView(venue);

  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    // Enable interactivity for polygons (spaces, desks)
    mapView.addInteractivePolygonsForAllLocations();
    // Set hover colour for polygons
    venue.locations.forEach((location) => {
      // An obstruction is something like a desk
      if (location.id.includes("obstruction")) {
        location.polygons.forEach((polygon) => {
          mapView.setPolygonHoverColor(polygon, "#BFBFBF");
        });
      } else {
        location.polygons.forEach((polygon) => {
          mapView.setPolygonHoverColor(polygon, "#F0F0F0");
        });
      }
    });

    mapView.FloatingLabels.labelAllLocations({
      interactive: true // Make labels interactive
    });
  }, [mapView, venue]);

  /* This hook can be used to interact with the map on click */
  useMapClick(mapView, (props) => {
    if (!mapView || !venue) {
      return;
    }

    // We can get the clicked geolocation
    console.log(
      `[useMapClick] Clicked at ${props.position.latitude}, ${props.position.longitude}`
    );

    // Interact with clicked markers
    for (const marker of props.markers) {
      console.log(`[useMapClick] Clicked marker ID "${marker.id}"`);
      mapView.Markers.remove(marker.id);
      return;
    }

    // Interact with clicked Floating Labels
    for (const label of props.floatingLabels) {
      console.log(`[useMapClick] Clicked label "${label.text}"`);

      if (label.node) {
        mapView.FloatingLabels.remove(label.node);
      }
      return;
    }

    // Interact with clicked polygons
    for (const polygon of props.polygons) {
      console.log(`[useMapClick] Clicked polygon ID "${polygon.id}"`);

      // Get location details for the clicked polygon
      const location = mapView.getPrimaryLocationForPolygon(polygon);

      // Convert the click information to a coordinate on the map
      const clickedCoordinate = mapView.currentMap.createCoordinate(
        props.position.latitude,
        props.position.longitude
      );

      // And add a new Marker where we clicked
      mapView.Markers.add(
        clickedCoordinate,
        // Provide a HTML template string for the Marker appearance
        `<div class="marker">${location.name}</div>`,
        {
          interactive: true, // Make markers clickable
          rank: COLLISION_RANKING_TIERS.ALWAYS_VISIBLE, // Marker collision priority
          anchor: MARKER_ANCHOR.TOP // Position of the Marker
        }
      );
      return;
    }
  });

  return (
    <div id="app">
      <div id="map-container" ref={elementRef}></div>
    </div>
  );
};

const Navigation: React.FC = () => {
  const credentials = useMemo<TGetVenueMakerOptions>(
    () => ({
      // mapId: "659efcf1040fcba69696e7b6",
      // key: "65a0422df128bbf7c7072349",
      // secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
      mapId: "657cc670040fcba69696e69e",
      key: "65a0422df128bbf7c7072349",
      secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
    }),
    []
  );
  const venue = useVenueMaker(credentials);

  const mapOptions = useMemo<TMapViewOptions>(
    () => ({
      xRayPath: true, // X Ray enables seeing the path through walls
      multiBufferRendering: true // Multi buffer rendering is necessary for features like x ray
    }),
    []
  );
  const { elementRef, mapView } = useMapView(venue, mapOptions);

  /* Start navigation when the map loads */
  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    /*
     * All maps made in Maker will contain a location called "footprintcomponent"
     * which represents the exterior "footprint"
     * You can use this location to get the nearest entrance or exit
     */
    const startLocation = venue.locations.find((location) =>
      location.id.includes("footprintcomponent")
    );
    // Navigate to some location on another floor
    const endLocation = venue.locations.find((location) =>
      location.id.includes("washroom")
    );

    if (startLocation && endLocation) {
      // Generate a route between these two locations
      const directions = startLocation.directionsTo(endLocation);
      if (directions && directions.path.length > 0) {
        // The Journey class draws the path & can be configured with a few options
        mapView.Journey.draw(directions, {
          polygonHighlightColor: "#e74c3c", // Start and end polygons colour
          departureMarkerTemplate: (props) => {
            // The departure marker is the person at the start location
            return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center;">
            <div class="departure-marker">${
              props.location ? props.location.name : "Departure"
            }</div>
            ${props.icon}
            </div>`;
          },
          destinationMarkerTemplate: (props) => {
            // The destination marker is the pin at the end location
            return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center;">
            <div class="destination-marker">${
              props.location ? props.location.name : "Destination"
            }</div>
            ${props.icon}
            </div>`;
          },
          connectionTemplate: (props) => {
            // The connection marker is the button to switch floors on the map
            return `<div class="connection-marker">Take ${props.type} ${props.icon}</div>`;
          },
          pathOptions: {
            nearRadius: 0.25, // The path size in metres at the nearest zoom
            farRadius: 1, // The path size in metres at the furthest zoom
            color: "#40A9FF", // Path colour
            displayArrowsOnPath: false, // Arrow animation on path
            showPulse: true, // Pulse animation on path
            pulseIterations: Infinity // How many times to play the pulse animation
          }
        });

        // Set the map (floor level) to start at the beginning of the path
        mapView.setMap(directions.path[0].map);
      }
    }
    // Update the selected map state
    setSelectedMap(mapView.currentMap);
  }, [mapView, venue]);

  // Track the selected map with state, for the UI
  const [selectedMap, setSelectedMap] = useState<MappedinMap | undefined>();

  /* Monitor floor level changes and update the UI */
  useMapChanged(mapView, (map) => {
    setSelectedMap(map);
  });

  return (
    <div id="app">
      <div id="ui">
        {venue?.venue.name ?? "Loading..."}
        {venue && selectedMap && (
          <select
            value={selectedMap.id}
            onChange={(e) => {
              if (!mapView || !venue) {
                return;
              }

              const floor = venue.maps.find((map) => map.id === e.target.value);
              if (floor) {
                mapView.setMap(floor);
              }
            }}
          >
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
