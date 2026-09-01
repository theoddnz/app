"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { PrinterProvider } from "@/lib/print-service-data";

export type MappedPrinter = PrinterProvider & {
  position: [number, number];
  distanceKm: number | null;
};

type PrinterMapProps = {
  center: [number, number];
  printers: MappedPrinter[];
  userLocation: [number, number] | null;
  activeId: string | null;
  onSelect: (id: string) => void;
};

function makePrinterIcon(active: boolean, online: boolean) {
  const bg = active ? "#c4622d" : online ? "#29445b" : "#8a8a8a";
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display:flex;align-items:center;justify-content:center;
        width:34px;height:34px;border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${bg};
        box-shadow:0 6px 14px rgba(13,38,58,0.35);
        border:2px solid #fff4ed;">
        <div style="transform:rotate(45deg);color:#fff4ed;font-size:15px;line-height:1;">&#9635;</div>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
}

const userIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:20px;height:20px;">
      <span style="position:absolute;inset:0;border-radius:9999px;background:rgba(41,68,91,0.25);animation:opp-ping 1.6s ease-out infinite;"></span>
      <span style="position:absolute;inset:4px;border-radius:9999px;background:#29445b;border:2px solid #fff;"></span>
    </div>
    <style>@keyframes opp-ping{75%,100%{transform:scale(2.2);opacity:0}}</style>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 0.8 });
  }, [center, map]);
  return null;
}

export default function PrinterMap({
  center,
  printers,
  userLocation,
  activeId,
  onSelect,
}: PrinterMapProps) {
  const markers = useMemo(
    () =>
      printers.map((printer) => ({
        printer,
        icon: makePrinterIcon(printer.id === activeId, printer.online),
      })),
    [printers, activeId],
  );

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full"
      style={{ background: "#e8e6e1" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter center={center} />

      {userLocation ? (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      ) : null}

      {markers.map(({ printer, icon }) => (
        <Marker
          key={printer.id}
          position={printer.position}
          icon={icon}
          eventHandlers={{ click: () => onSelect(printer.id) }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong>{printer.name}</strong>
              <div style={{ fontSize: 12, color: "#555" }}>{printer.owner}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                ₹{printer.pricePerGram}/g · ★ {printer.rating}
                {printer.distanceKm != null
                  ? ` · ${printer.distanceKm.toFixed(1)} km`
                  : ""}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
