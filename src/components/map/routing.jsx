import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export default function Routing({ wayPoints }) {
  const map = useMap();
  console.log(wayPoints);

  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: wayPoints,
      show: true,
      autoRoute: true,
      draggableWaypoints: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, wayPoints]);

  return null;
}
