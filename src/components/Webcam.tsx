import React, { useRef } from "react";
import { useWebcam } from "../hooks/useWebcam";

interface WebcamProps {
  canvas: {
    width: number;
    height: number;
  };
  updateInterval: number;
  onUpdate: (image: HTMLCanvasElement) => Promise<void>;
}

export function Webcam(props: WebcamProps) {
  const webcamDivRef = useRef<HTMLDivElement>(null);

  const { isWebcamReady } = useWebcam({
    canvas: {
      width: props.canvas.width,
      height: props.canvas.height,
      containerRef: webcamDivRef,
    },
    updateInterval: props.updateInterval,
    onUpdate: props.onUpdate,
  });

  return (
    <div className="webcam" style={{ width: props.canvas.width, height: props.canvas.height }} ref={webcamDivRef}>
      {!isWebcamReady && <span className="blink-slow">{"Waiting for camera permission..."}</span>}
    </div>
  );
}
