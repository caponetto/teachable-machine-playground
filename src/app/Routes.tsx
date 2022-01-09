export const routes = {
  nav: {
    root: { path: "/", name: "" },
    home: { path: "/home", name: "Home" },
    nbd: { path: "/nail-biting-detector", name: "Nail-Biting Detector" },
    // Your new route goes here
  },

  images: {
    robot: "/static/images/robot.png",
  },

  sounds: {
    alert: "/static/sounds/alert.mp3",
  },

  models: {
    nbd: {
      modelJson: "/static/models/nail-biting-detector/model.json",
      metadataJson: "/static/models/nail-biting-detector/metadata.json",
    },
    // Your new model goes here
  },
};
