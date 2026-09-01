"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button3D } from "@/components/ui/button-3d";
import { cn } from "@/lib/utils";
import {
  ALL_MATERIALS,
  DEFAULT_CENTER,
  PRINTER_PROVIDERS,
  distanceKm,
  type PrinterMaterial,
} from "@/lib/print-service-data";
import {
  BadgeCheck,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "@/components/print-service/icons";
import type { MappedPrinter } from "@/components/print-service/PrinterMap";

const PrinterMap = dynamic(
  () => import("@/components/print-service/PrinterMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
        Loading map...
      </div>
    ),
  },
);

type LocationState = "idle" | "loading" | "granted" | "denied";

export default function PrintServiceBrowser() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [activeMaterial, setActiveMaterial] = useState<PrinterMaterial | "All">("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const center = userLocation ?? DEFAULT_CENTER;

  const mappedPrinters = useMemo<MappedPrinter[]>(() => {
    return PRINTER_PROVIDERS.map((printer) => {
      const position: [number, number] = [
        center[0] + printer.offsetLat,
        center[1] + printer.offsetLng,
      ];
      return {
        ...printer,
        position,
        distanceKm: userLocation ? distanceKm(userLocation, position) : null,
      };
    }).sort((a, b) => {
      if (a.distanceKm == null || b.distanceKm == null) return 0;
      return a.distanceKm - b.distanceKm;
    });
  }, [center, userLocation]);

  const visiblePrinters = useMemo(() => {
    if (activeMaterial === "All") return mappedPrinters;
    return mappedPrinters.filter((printer) =>
      printer.materials.includes(activeMaterial),
    );
  }, [mappedPrinters, activeMaterial]);

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setLocationState("denied");
      toast.error("Geolocation is not supported on this device.");
      return;
    }
    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocationState("granted");
        toast.success("Location enabled. Showing makers near you.");
      },
      () => {
        setLocationState("denied");
        toast.error("Location blocked. Showing sample makers instead.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      {/* Map panel */}
      <div className="order-2 lg:order-1">
        <div className="overflow-hidden rounded-[28px] bg-card p-2.5 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-black/[0.05] dark:bg-[#181818] dark:shadow-[0_14px_0_rgba(0,0,0,0.24),0_22px_42px_rgba(0,0,0,0.38)] dark:ring-white/[0.08]">
          <div className="h-[420px] w-full overflow-hidden rounded-[20px] md:h-[520px]">
            <PrinterMap
              center={center}
              printers={visiblePrinters}
              userLocation={userLocation}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>
        </div>
        <p className="mt-3 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {userLocation
            ? "Live location on · makers placed near you (sample data)"
            : "Sample location · enable your location to see makers nearby"}
        </p>
      </div>

      {/* Controls + list */}
      <div className="order-1 flex flex-col gap-5 lg:order-2">
        <div className="rounded-[24px] border border-black/[0.05] bg-muted/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.08] dark:bg-[#242424] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4622d]">
                Find a maker
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
                {visiblePrinters.length} printers near you
              </h3>
            </div>
            <Button3D onClick={requestLocation} disabled={locationState === "loading"}>
              <Navigation size={15} strokeWidth={2} />
              {locationState === "loading"
                ? "Locating..."
                : userLocation
                  ? "Recenter"
                  : "Use my location"}
            </Button3D>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["All", ...ALL_MATERIALS] as const).map((material) => {
              const active = activeMaterial === material;
              return (
                <button
                  key={material}
                  type="button"
                  onClick={() => setActiveMaterial(material)}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "bg-[#c4622d] text-[#fff4ed]"
                      : "bg-card text-muted-foreground ring-1 ring-black/[0.06] hover:text-foreground dark:bg-[#181818] dark:ring-white/[0.08]",
                  )}
                >
                  {material}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-1">
          {visiblePrinters.map((printer) => (
            <article
              key={printer.id}
              onMouseEnter={() => setActiveId(printer.id)}
              className={cn(
                "cursor-pointer rounded-[22px] bg-card p-4 ring-1 transition-transform duration-200 hover:-translate-y-0.5 dark:bg-[#181818]",
                printer.id === activeId
                  ? "ring-2 ring-[#c4622d]"
                  : "ring-black/[0.05] dark:ring-white/[0.08]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-base font-semibold text-foreground">
                      {printer.name}
                    </h4>
                    {printer.online ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Online
                      </span>
                    ) : (
                      <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Busy
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-space text-xs text-muted-foreground">
                    by {printer.owner}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] font-semibold text-foreground">
                  <Star size={12} className="text-[#c4622d]" />
                  {printer.rating}
                </div>
              </div>

              <p className="mt-2 font-space text-sm leading-6 text-muted-foreground">
                {printer.blurb}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {printer.materials.map((material) => (
                  <span
                    key={material}
                    className="rounded-md bg-muted px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground/70"
                  >
                    {material}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-[#c4622d]" />
                  {printer.distanceKm != null
                    ? `${printer.distanceKm.toFixed(1)} km away`
                    : "Distance hidden"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} className="text-[#c4622d]" />
                  {printer.turnaround}
                </span>
                <span className="font-semibold text-foreground">
                  ₹{printer.pricePerGram}/g
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button3D
                  className="flex-1"
                  onClick={() =>
                    toast.success(`Booking request sent to ${printer.name} (demo).`)
                  }
                >
                  <BadgeCheck size={15} strokeWidth={2} />
                  Book print
                </Button3D>
                <button
                  type="button"
                  onClick={() => toast(`Call ${printer.phone} (demo).`)}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground ring-1 ring-black/[0.06] transition-colors hover:text-[#c4622d] dark:ring-white/[0.08]"
                  aria-label={`Call ${printer.name}`}
                >
                  <Phone size={16} strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}

          {visiblePrinters.length === 0 ? (
            <div className="rounded-[22px] border border-dashed border-black/10 p-6 text-center font-space text-sm text-muted-foreground dark:border-white/10">
              No makers match that material yet. Try another filter.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
