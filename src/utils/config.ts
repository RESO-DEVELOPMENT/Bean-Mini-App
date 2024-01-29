import { openChat } from "zmp-sdk";
import appConfig from "../../app-config.json";

export function getConfig<T>(getter: (config: typeof appConfig) => T) {
  return getter(appConfig);
}

export const openSupportChat = async () => {
  openChat({
    type: "oa",
    id: "1968989846992650935",
    message: "Tôi cần hỗ trợ",
    success: () => {},
    fail: (err) => {},
  });
};
