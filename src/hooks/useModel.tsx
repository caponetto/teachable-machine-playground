import { ClassifierInputSource, CustomMobileNet, load } from "@teachablemachine/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelDescriptor } from "../app/Model";

export interface Prediction {
  className: string;
  probability: number;
}

export function useModel(descriptor: ModelDescriptor) {
  const [model, setModel] = useState<CustomMobileNet>();
  const loaded = useMemo(() => !!model, [model]);

  const predictAll = useCallback(
    async (image: ClassifierInputSource) => {
      if (!model) {
        throw new Error("Model not loaded");
      }

      return (await model.predict(image)) as Prediction[];
    },
    [model]
  );

  const predictClass = useCallback(
    async (image: ClassifierInputSource, targetClass: string, threshold: number) => {
      if (!model) {
        throw new Error("Model not loaded");
      }
      if (!descriptor.classes.includes(targetClass)) {
        throw new Error(`Unknown class: ${targetClass}`);
      }
      const predictions = await predictAll(image);
      return predictions.find((p) => p.probability >= threshold && p.className === targetClass);
    },
    [descriptor.classes, model, predictAll]
  );

  useEffect(() => {
    load(descriptor.modelJson, descriptor.metadataJson)
      .then((m) => setModel(m))
      .catch((err) => console.error(err));
  }, [descriptor.metadataJson, descriptor.modelJson]);

  return { isModelLoaded: loaded, predictAll, predictClass };
}
