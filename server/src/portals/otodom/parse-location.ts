export default function parseLocation(location: string): string {
  const locationTextParts = location.split(': ');
  
  if (locationTextParts[1]) {
    return locationTextParts[1].trim();
  } else {
    return '';
  }
}