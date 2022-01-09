import React, { useCallback, useState } from "react";
import useSound from "use-sound";
import { NAIL_BITING_DETECTOR_MODEL } from "../app/Model";
import { routes } from "../app/Routes";
import { Page } from "../components/Page";
import { Webcam } from "../components/Webcam";
import { useModel } from "../hooks/useModel";
import { useNotification } from "../hooks/useNotification";

export function NailBitingDetectorPage() {
  const MESSAGE_STOP = "STOP IT!";

  const { notify } = useNotification();
  const [play] = useSound(routes.sounds.alert);
  const [detected, setDetected] = useState(false);

  // Load the model
  const { isModelLoaded, predictClass } = useModel(NAIL_BITING_DETECTOR_MODEL);

  // Callback that runs every time the webcam is updated
  const onUpdate = useCallback(
    async (image: HTMLCanvasElement) => {
      if (!isModelLoaded) {
        return;
      }
      const isDetected = !!(await predictClass(image, "nail-biting", 0.9));
      if (isDetected) {
        play();
        notify(MESSAGE_STOP);
      }
      setDetected(isDetected);
    },
    [isModelLoaded, notify, play, predictClass]
  );

  return (
    <Page title={routes.nav.nbd.name} showBack>
      <Webcam canvas={{ width: 250, height: 250 }} updateInterval={100} onUpdate={onUpdate} />
      {detected && <span className="alert blink-fast">{MESSAGE_STOP}</span>}
    </Page>
  );
}
