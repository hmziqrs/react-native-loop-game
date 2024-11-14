import { perf } from "@/service/firebase";
import { captureRef } from "react-native-view-shot";
import share from "react-native-share";

export async function captureNShare(ref: React.RefObject<any>) {
  const trace = await perf.startTrace("capture_screenshot");

  const base64 = await captureRef(ref.current, {
    format: "jpg",
    quality: 1.0,
    result: "base64",
  });
  await trace.stop();

  await share.open({
    url: `data:image/jpeg;base64,${base64}`,
    filename: `rn-loop-game-${new Date().getTime()}.jpg`,
  });
}
