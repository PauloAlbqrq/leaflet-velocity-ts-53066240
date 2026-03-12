import {
  createElementHook,
  createElementObject,
  useLayerLifecycle,
  useLeafletContext,
} from "@react-leaflet/core";
import L from "leaflet";

const EMPTY_VELOCITY_DATA = [
  {
    header: {
      parameterCategory: 2,
      parameterNumber: 2,
      parameterNumberName: "eastward_wind",
      parameterUnit: "m.s-1",
      nx: 0,
      ny: 0,
      lo1: 0,
      lo2: 0,
      la1: 0,
      la2: 0,
      dx: 1.0,
      dy: 1.0,
      refTime: "2000-01-01 00:00:00",
    },
    data: [0],
  },
  {
    header: {
      parameterCategory: 2,
      parameterNumber: 3,
      parameterNumberName: "northward_wind",
      parameterUnit: "m.s-1",
      nx: 0,
      ny: 0,
      lo1: 0,
      lo2: 0,
      la1: 0,
      la2: 0,
      dx: 1.0,
      dy: 1.0,
      refTime: "2000-01-01 00:00:00",
    },
    data: [0],
  },
];

interface velocityLayerProps {
  displayValues: boolean;
  displayOptions: {
    showCardinal: boolean;
    velocityType: string;
    position: "topleft" | "topright" | "bottomleft" | "bottomright";
    emptyString: string;
    directionString: string;
    speedString: string;
    speedUnit: "kt" | "k/h" | "mph" | "m/s";
    angleConvention: "bearingCW" | "bearingCCW" | "meteoCW" | "meteoCCW";
  };
  data: any[] | null;
  particleAge?: number;
  particleMultiplier?: number;
  particlelineWidth?: number;
  frameRate?: number;
  minVelocity?: number;
  maxVelocity?: number;
  velocityScale?: number;
  opacity?: number;
  colorScale?: string[];
  onAdd?: () => void;
  onRemove?: () => void;
  paneName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createVelocity(props: velocityLayerProps, context: any) {
  const layerProps = props.data
    ? props
    : { ...props, data: EMPTY_VELOCITY_DATA };
  const velocityLayer = L.velocityLayer(layerProps);
  return createElementObject(velocityLayer, context);
}

// eslint-disable-next-line react-hooks/refs
function updateVelocity(
  instance: any,
  props: velocityLayerProps,
  prevProps: velocityLayerProps,
) {
  if (prevProps.data !== props.data) {
    instance.setData(props.data);
  }
}

const useVelocityElement = createElementHook(createVelocity, updateVelocity);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VelocityLayer(props: velocityLayerProps): null {
  const context = useLeafletContext();
  const elementRef = useVelocityElement(props, context);
  useLayerLifecycle(elementRef.current, context);
  return null;
}
