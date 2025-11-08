export const subnetOptions = Array.from({ length: 33 }, (_, i) => {
  const mask = (0xffffffff << (32 - i)) >>> 0;
  const octets = [
    (mask >> 24) & 255,
    (mask >> 16) & 255,
    (mask >> 8) & 255,
    mask & 255,
  ].join('.');
  return { cidr: i, mask: octets, label: `${i}/${octets}` };
});