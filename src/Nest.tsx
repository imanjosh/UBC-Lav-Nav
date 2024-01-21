import { TGetVenueMakerOptions } from "@mappedin/mappedin-js";
import { TMapViewOptions } from "@mappedin/mappedin-js/renderer/internal";
import "@mappedin/mappedin-js/lib/mappedin.css";
import { useMemo, useRef } from "react";
import "./App.css";
import useMapView from "./useMapView.tsx";
import React from 'react';
import useVenueMaker from "./useVenueMaker.ts";
import ReactDOM from 'react-dom';

export default function App() {
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

  return <div id="app" ref={elementRef} />;
}