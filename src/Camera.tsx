import {
    CAMERA_EASING_MODE,
    TGetVenueMakerOptions
  } from "@mappedin/mappedin-js";
  import "@mappedin/mappedin-js/lib/mappedin.css";
  import { useCallback, useEffect, useMemo } from "react";
  import useMapClick from "./useMapClick.ts";
  import useMapView from "./useMapView.tsx";
  import useVenueMaker from "./useVenueMaker.ts";
  import "./styles.css";
  import React from 'react';
  
  /* This demo shows you how to move the camera. */
  export default function CameraExample() {
    const credentials = useMemo<TGetVenueMakerOptions>(
      () => ({
        mapId: "657cc670040fcba69696e69e",
        key: "65a0422df128bbf7c7072349",
        secret: "5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4"
      }),
      []
    );
    const venue = useVenueMaker(credentials);
    const { elementRef, mapView } = useMapView(venue);
  
    /* Basic map setup */
    useEffect(() => {
      if (!mapView || !venue) {
        return;
      }
  
      mapView.FloatingLabels.labelAllLocations();
      mapView.Camera.minZoom = 50; // Min camera zoom in approx metres
      mapView.Camera.set({
        tilt: 0.4, // tilt from 0 (top down) to 1 (side view)
        rotation: 1, // rotation in radians
        zoom: 1000 // altitude in approximate metres
      });
    }, [mapView, venue]);
  
    /* Focus on a single polygon to zoom */
    const focusOnPolygon = useCallback(() => {
      if (!mapView || !venue) {
        return;
      }
      const LOCATION_ID = "mappedin";
      const location = venue.locations.find((location) =>
        location.id.includes(LOCATION_ID)
      );
      if (location) {
        mapView.Camera.focusOn(
          {
            polygons: location.polygons,
            nodes: location.nodes
          },
          {
            tilt: 0,
            duration: 500, // time in ms
            easing: CAMERA_EASING_MODE.EASE_IN_OUT, // animation easing
            updateZoomLimits: false // if this animation should update global min zoom
          }
        );
      } else {
        console.warn(`[Mappedin]: Location with ID ${LOCATION_ID} not found.`);
      }
    }, [mapView, venue]);
  
    /* Focus on all polygons in the current map to zoom out */
    const focusOnMap = useCallback(() => {
      if (!mapView || !venue) {
        return;
      }
      const polygonsOnMap = venue.polygons.filter(
        (polygon) => polygon.map.id === mapView.currentMap.id
      );
      if (polygonsOnMap.length > 0) {
        mapView.Camera.focusOn(
          {
            polygons: polygonsOnMap
          },
          {
            tilt: 0.9,
            rotation: 0,
            duration: 1000, // time in ms
            easing: CAMERA_EASING_MODE.EASE_OUT, // animation easing
            updateZoomLimits: false // if this animation should update global min zoom
          }
        );
      } else {
        console.warn(`[Mappedin]: No polygons on current map.`);
      }
    }, [mapView, venue]);
  
    /* Focus on a specific point using map click events */
    useMapClick(mapView, (props) => {
      if (!mapView || !venue) {
        return;
      }
      const coordinate = mapView.currentMap.createCoordinate(
        props.position.latitude,
        props.position.longitude
      );
      mapView.Camera.focusOn(
        {
          coordinates: [coordinate]
        },
        {
          duration: 1500, // time in ms
          easing: CAMERA_EASING_MODE.EASE_OUT, // animation easing
          minZoom: 500, // min zoom in metres of the animation
          updateZoomLimits: false // if this animation should update global min zoom
        }
      );
    });
  
    return (
      <div id="app">
        <div id="ui">
          Camera Actions
          <button onClick={focusOnPolygon}>Focus On A Polygon</button>
          <button onClick={focusOnMap}>Focus On Entire Map</button>
          <p>Click anywhere to focus on a point</p>
        </div>
        <div id="map-container" ref={elementRef}></div>
      </div>
    );
  }
  