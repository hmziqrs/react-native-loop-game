export function sleep(data = null, duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}
