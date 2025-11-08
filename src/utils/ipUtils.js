export function isIpValid(ip) {
  return (
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) &&
    ip.split('.').every((octet) => {
      const num = Number(octet);
      return num >= 0 && num <= 255;
    })
  );
}

export function getNetworkAddress(ip, mask) {
  const ipOctets = ip.split('.');
  const maskOctets = mask.split('.');
  const result = [];

  for (let i = 0; i < 4; i++) {
    result.push(Number(ipOctets[i]) & Number(maskOctets[i]));
  }

  return `${result[0]}.${result[1]}.${result[2]}.${result[3]}`;
}

export function getAddressesCount(mask) {
  let binaryMask = '';
  for (const octet of mask.split('.')) {
    binaryMask += Number(octet).toString(2).padStart(8, '0');
  }
  const ones = binaryMask.replaceAll('0', '').length;
  const zeros = 32 - ones;

  if (zeros === 0) return 1;
  if (zeros === 1) return 2;

  return Math.pow(2, zeros) - 2;
}
