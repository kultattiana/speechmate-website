import configuration from "~/configuration";

export const STORAGE_BUCKET =
  configuration.environment === "production" ? "speechmate-dub" : "speechmate-dub-dev";
