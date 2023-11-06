export default function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusMiles: number = 3958.8; // Radius of the Earth in miles
  const dLat: number = degreesToRadians(lat2 - lat1);
  const dLon: number = degreesToRadians(lon2 - lon1);
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = earthRadiusMiles * c;
  return distance;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
