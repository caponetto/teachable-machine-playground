import { routes } from "./Routes";

export interface ModelDescriptor {
  name: string;
  classes: string[];
  modelJson: string;
  metadataJson: string;
}

export const NAIL_BITING_DETECTOR_MODEL: Readonly<ModelDescriptor> = {
  name: "nail-biting-detector",
  classes: ["normal", "nail-biting"],
  modelJson: routes.models.nbd.modelJson,
  metadataJson: routes.models.nbd.metadataJson,
};

// You new model goes here
