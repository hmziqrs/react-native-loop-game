import domtoimage from "dom-to-image";

export async function captureNShare(ref: React.RefObject<any>) {
  const node = ref.current;
  if (!node) {
    return;
  }
  const dataUrl = await domtoimage.toPng(node);
  const shareData = {
    title: "Loop Game",
    text: "Check out this level",
    url: dataUrl,
    dialogTitle: "Share this level",
  };
  await navigator.share(shareData);
}
