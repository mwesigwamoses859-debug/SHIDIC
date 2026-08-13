import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export function MapRoute({ pickup, dropoff, onDistanceCalculated }: { pickup: string, dropoff: string, onDistanceCalculated?: (distKm: number) => void }) {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [markers, setMarkers] = useState<[number, number][]>([]);
  
  useEffect(() => {
    if (!pickup || !dropoff) {
      setRouteCoords([]);
      setMarkers([]);
      return;
    }

    let isMounted = true;

    async function fetchRoute() {
      try {
        // Geocode pickup
        const pickupRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pickup + ', Uganda')}`);
        const pickupData = await pickupRes.json();
        
        // Geocode dropoff
        const dropoffRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(dropoff + ', Uganda')}`);
        const dropoffData = await dropoffRes.json();

        if (pickupData.length > 0 && dropoffData.length > 0) {
          const pLat = parseFloat(pickupData[0].lat);
          const pLon = parseFloat(pickupData[0].lon);
          const dLat = parseFloat(dropoffData[0].lat);
          const dLon = parseFloat(dropoffData[0].lon);

          if (!isMounted) return;
          setMarkers([[pLat, pLon], [dLat, dLon]]);

          // Get route using OSRM
          const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${pLon},${pLat};${dLon},${dLat}?overview=full&geometries=geojson`);
          const osrmData = await osrmRes.json();

          if (osrmData.routes && osrmData.routes.length > 0 && isMounted) {
            const coords = osrmData.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
            setRouteCoords(coords);
            if (onDistanceCalculated) {
              onDistanceCalculated(osrmData.routes[0].distance / 1000);
            }
          }
        }
      } catch (e) {
        console.error("Routing error", e);
      }
    }

    const timeout = setTimeout(fetchRoute, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [pickup, dropoff]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-inner border border-gray-200 relative z-0">
      <MapContainer 
        center={[0.347596, 32.582520]} // Kampala
        zoom={12} 
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        maxBounds={[[-1.5, 29.5], [4.5, 35.0]]}
        maxBoundsViscosity={1.0}
        minZoom={6}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((pos, i) => (
          <Marker key={i} position={pos as [number, number]} />
        ))}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords as [number, number][]} color="#E60000" weight={5} />
        )}
        <MapBounds coords={routeCoords} />
      </MapContainer>
    </div>
  );
}

function MapBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}
