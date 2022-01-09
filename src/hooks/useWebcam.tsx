import { Webcam } from "@teachablemachine/image";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseWebcamArgs {
  canvas: {
    width: number;
    height: number;
    containerRef: RefObject<HTMLDivElement>;
  };
  updateInterval: number;
  onUpdate: (image: HTMLCanvasElement) => Promise<void>;
}

export function useWebcam(args: UseWebcamArgs) {
  const requestAnimationRef = useRef(0);
  const canUpdateRef = useRef(false);
  const [ready, setReady] = useState(false);

  const webcam = useMemo(
    () => new Webcam(args.canvas.width, args.canvas.height, true),
    [args.canvas.height, args.canvas.width]
  );

  const update = useCallback(async () => {
    if (!ready || !canUpdateRef.current) {
      return;
    }

    webcam.update();
    await args.onUpdate(webcam.canvas);

    setTimeout(() => {
      requestAnimationRef.current = requestAnimationFrame(update);
    }, args.updateInterval);
  }, [args, ready, webcam]);

  const setup = useCallback(async () => {
    if (ready) {
      return;
    }

    await webcam.setup();

    args.canvas.containerRef.current?.append(webcam.canvas);

    canUpdateRef.current = true;
    setReady(true);
  }, [args.canvas.containerRef, ready, webcam]);

  useEffect(() => {
    if (ready) {
      return;
    }

    setup().then(webcam.play);
  }, [ready, setup, webcam]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    setTimeout(() => {
      requestAnimationRef.current = requestAnimationFrame(update);
    }, 100);

    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, [webcam, ready, update]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    return () => {
      webcam.stop();
      cancelAnimationFrame(requestAnimationRef.current);
      canUpdateRef.current = false;
      setReady(false);
    };
  }, [webcam, ready]);

  return {
    isWebcamReady: ready,
  };
}
