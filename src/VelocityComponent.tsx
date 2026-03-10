import {
  createElementHook,
  createElementObject,
  useLayerLifecycle,
  useLeafletContext,
} from "@react-leaflet/core";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const L: any;

//new não existe no código exemplo da lib

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createVelocity(props: any, context: any) {
  const velocityLayer = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      showCardinal: true,
      velocityType: "Vento |",

      // 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
      position: "topleft",

      // no data at cursor

      emptyString: "Sem dados de vento",

      // direction label prefix
      directionString: "Direção",

      // speed label prefix
      speedString: "Velocidade",

      // 'kt' | 'k/h' | 'mph' | 'm/s'
      speedUnit: "m/s",

      // Could be any combination of 'bearing' (angle toward which the flow goes) or
      // 'meteo' (angle from which the flow comes) and 'CW' (angle value increases clock-wise)
      // or 'CCW' (angle value increases counter clock-wise)
      angleConvention: "bearingCW",
    },
    // see demo/*.json, or wind-js-server for example data service
    data: props.data,

    // OPTIONAL
    particleAge: 64,
    particleMultiplier: 1 / 300,
    particlelineWidth: 1,
    frameRate: 15,
    minVelocity: 0,
    maxVelocity: 10,
    velocityScale: 0.01,
    // opacity: 0.97,
    // define your own array of hex/rgb colors
    colorScale: [],
    onAdd: () => console.log(props.data),
    onRemove: () => console.log("onRemove"),
    // optional pane to add the layer, will be created if doesn't exist
    // leaflet v1+ only (falls back to overlayPane for < v1)
    paneName: "overlayPane",
  });
  return createElementObject(velocityLayer, context);
}

// eslint-disable-next-line react-hooks/refs
function updateVelocity(instance: any, props: any, prevProps: any) {
  return;
}

const useVelocityElement = createElementHook(createVelocity, updateVelocity);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VelocityLayer(props: any): any {
  const context = useLeafletContext();
  const elementRef = useVelocityElement(props, context);
  useLayerLifecycle(elementRef.current, context);
  return null;
}
