import { openChat } from "zmp-sdk";
import appConfig from "../../app-config.json";

export function getConfig<T>(getter: (config: typeof appConfig) => T) {
  return getter(appConfig);
}

export const openSupportChat = async (message: string) => {
  openChat({
    type: "oa",
    id: "66966497448427332",
    message: message,
    success: () => {},
    fail: (err) => {},
  });
};
