import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const L: any;

export default function VelocityLayerComponent(data: any, context: any): null {
  // const context = useLeafletContext();
  useEffect(() => {
    if (!data) return;
    //new não existe no código exemplo da lib
    const velocityLayer = new L.velocityLayer({
      displayValues: true,
      displayOptions: {
        showCardinal: true,
        velocityType: "Vento | ",

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
      data: data,

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
      onAdd: () => console.log(data),
      onRemove: () => console.log("onRemove"),
      // optional pane to add the layer, will be created if doesn't exist
      // leaflet v1+ only (falls back to overlayPane for < v1)
      paneName: "overlayPane",
    });

    const container = context.layerContainer || context.map;
    const timeout = setTimeout(() => container.addLayer(velocityLayer), 100);

    return () => {
      clearTimeout(timeout);
      container.removeLayer(velocityLayer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return null;
}
