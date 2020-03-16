export function sleep(data = null, duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}

export function socialLink(username, platform) {
  const base = 'https://';
  const coms = ['facebook', 'instagram', 'dribbble', 'fiverr'];
  const nets = ['behance'];

  if (username == null) {
    return null;
  }

  if (coms.indexOf(platform) > -1) {
    return `${base + platform}.com/${username}`;
  }
  if (nets.indexOf(platform) > -1) {
    return `${base + platform}.net/${username}`;
  }
  if (platform === 'skype') {
    return `skype:${username}?chat`;
  }
  if (platform === 'email') {
    return `mailto:${username}`;
  }
  if (platform === 'phone') {
    return `tel:${username}`;
  }
  if (platform === 'whatsapp') {
    return `https://api.whatsapp.com/send?phone=${username}`;
  }
  if (platform === 'linkedin') {
    return `${base}/linkedin.com/in/${username}`;
  }
  return null;
}
