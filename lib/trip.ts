export function formatTripDuration(pickup: string, dropoff: string) {
  const pickupDate = new Date(pickup);
  const dropoffDate = new Date(dropoff);
  const durationMs = dropoffDate.getTime() - pickupDate.getTime();
  const minutes = Math.floor(durationMs / (1000 * 60));

  return minutes < 1 ? `1 min` : `${minutes} min`;
}
