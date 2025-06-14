
export const openDishInMaps = (dishName: string) => {
  const encodedDishName = encodeURIComponent(dishName);
  
  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isMobile) {
    if (isIOS) {
      // iOS - try to open Apple Maps first, fallback to Google Maps
      const appleMapsUrl = `maps://?q=${encodedDishName}+Singapore`;
      const googleMapsUrl = `https://maps.google.com/maps?q=${encodedDishName}+near+Singapore`;
      
      // Try Apple Maps first
      window.location.href = appleMapsUrl;
      
      // Fallback to Google Maps after a short delay if Apple Maps doesn't open
      setTimeout(() => {
        window.open(googleMapsUrl, '_blank');
      }, 1000);
    } else {
      // Android - use Google Maps
      const googleMapsUrl = `https://maps.google.com/maps?q=${encodedDishName}+near+Singapore`;
      window.open(googleMapsUrl, '_blank');
    }
  } else {
    // Desktop - open Google Maps in browser
    const googleMapsUrl = `https://maps.google.com/maps?q=${encodedDishName}+near+Singapore`;
    window.open(googleMapsUrl, '_blank');
  }
};
