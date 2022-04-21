export function popup(url, target, { width, height }) {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const sx =
    window.innerWidth ||
    (document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width);
  const sy =
    window.innerHeight ||
    (document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height);

  const systemZoom = sx / window.screen.availWidth;
  const left = (sx - width) / 2 / systemZoom + dualScreenLeft;
  const top = (sy - height) / 2 / systemZoom + dualScreenTop;

  return window.open(
    url,
    target,
    `toolbar=0,menubar=0,resizable=0,scrollbars=1,width=${
      width / systemZoom
    },height=${height / systemZoom},top=${top},left=${left}`
  );
};
