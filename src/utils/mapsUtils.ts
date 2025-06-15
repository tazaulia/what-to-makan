
export const openDishInMaps = (dishName: string) => {
  const encodedDishName = encodeURIComponent(dishName);
  
  // Use simple "near me" search - Google Maps will handle location automatically
  // This URL format works better for triggering app selection on mobile devices
  const googleMapsUrl = `https://maps.google.com/?q=${encodedDishName}+near+me`;
  window.open(googleMapsUrl, '_blank');
};
