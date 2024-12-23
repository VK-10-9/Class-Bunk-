import SHA256 from 'crypto-js/sha256';

export const getDeviceHash = () => {
  const userAgent = navigator.userAgent;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const deviceFingerprint = `${userAgent}-${screenResolution}-${timezone}`;
  return SHA256(deviceFingerprint).toString();
};