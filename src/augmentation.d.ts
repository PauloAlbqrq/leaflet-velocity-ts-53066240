import "leaflet";

declare module "leaflet" {
  export let CanvasLayer: any;
  export function canvasLayer(): any;

  export let VelocityLayer: any;
  export function velocityLayer(options?: any): any;

  export namespace Control {
    class Velocity extends Control {
      constructor(options?: any);
      options: any;
    }
  }

  export namespace control {
    function velocity(options?: any): Control.Velocity;
  }
}
