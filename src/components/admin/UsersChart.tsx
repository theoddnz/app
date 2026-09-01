import { ArrowUpRight } from "@/components/ui/tabler-icons";

type Point = { label: string; count: number };

export function UsersChart({ data }: { data: Point[] }) {
  const width = 640;
  const height = 220;
  const padX = 16;
  const padTop = 16;
  const padBottom = 34;
  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;

  const total = data.reduce((sum, point) => sum + point.count, 0);
  const maxCount = Math.max(1, ...data.map((point) => point.count));
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0;

  const coords = data.map((point, index) => {
    const x = padX + stepX * index;
    const y = padTop + innerH - (point.count / maxCount) * innerH;
    return { x, y, ...point };
  });

  const linePath = coords
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const areaPath =
    coords.length > 0
      ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${padTop + innerH} L ${coords[0].x.toFixed(1)} ${padTop + innerH} Z`
      : "";

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">New users</h2>
          <p className="text-sm text-muted-foreground">Sign-ups over the last {data.length} months</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c4622d]/10 px-2.5 py-1 text-xs font-semibold text-[#c4622d]">
          <ArrowUpRight className="size-3.5" />
          {total} total
        </span>
      </div>

      <div className="mt-5">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" preserveAspectRatio="none" role="img" aria-label="New users per month">
          <defs>
            <linearGradient id="usersArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4622d" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#c4622d" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridLines.map((ratio) => {
            const y = padTop + innerH * ratio;
            return (
              <line
                key={ratio}
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            );
          })}

          {areaPath ? <path d={areaPath} fill="url(#usersArea)" /> : null}
          {linePath ? <path d={linePath} fill="none" stroke="#c4622d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> : null}

          {coords.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="3.5" fill="#c4622d" />
              <circle cx={point.x} cy={point.y} r="7" fill="#c4622d" fillOpacity="0.15" />
              <text x={point.x} y={height - 12} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
