import domtoimage from "dom-to-image";

export async function captureNShare(ref: React.RefObject<any>) {
  const node = ref.current;
  if (!node) {
    return;
  }
  const dataUrl = await domtoimage.toJpeg(node);
  const shareData = {
    title: "Loop Game",
    text: "Check out this level",
    url: dataUrl,
    dialogTitle: "Share this level",
  };
  if (!navigator.canShare(shareData)) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `rn-loop-game-${new Date().getTime()}.jpg`;

    // Append to document, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    navigator.share(shareData);
  }
}
