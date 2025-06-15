
export const openDishInMaps = (dishName: string) => {
  const encodedDishName = encodeURIComponent(dishName);
  
  // Try to get user's current location for more precise "near me" search
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Use coordinates for precise location
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://maps.google.com/maps?q=${encodedDishName}&ll=${latitude},${longitude}&z=15`;
        window.open(googleMapsUrl, '_blank');
      },
      (error) => {
        console.log('Geolocation denied or unavailable, using "near me" fallback');
        // Fallback to "near me" which will use the device's location services
        const googleMapsUrl = `https://maps.google.com/maps?q=${encodedDishName}+near+me`;
        window.open(googleMapsUrl, '_blank');
      },
      {
        timeout: 5000,
        enableHighAccuracy: false
      }
    );
  } else {
    // Fallback for browsers without geolocation support
    const googleMapsUrl = `https://maps.google.com/maps?q=${encodedDishName}+near+me`;
    window.open(googleMapsUrl, '_blank');
  }
};
