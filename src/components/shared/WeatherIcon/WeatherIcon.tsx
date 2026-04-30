import { useEffect, useState } from "react";
import { resolveIconSlug } from "./utils";

const icons = import.meta.glob("/node_modules/@meteocons/svg/**/*.svg", {
  query: "?url",
  import: "default",
});

interface WeatherIconProps {
  code?: number;
  style?: "fill" | "flat" | "line" | "monochrome";
  size?: number;
  className?: string;
  isDay?: boolean;
}

export function WeatherIcon({
  code,
  style = "fill",
  size = 64,
  isDay = true,
  className = "",
}: WeatherIconProps) {
  const [src, setSrc] = useState<string>("");

  // determine final icon name
  const resolvedSlug = resolveIconSlug(code, isDay);

  useEffect(() => {
    let isMounted = true;

    const loadIcon = async () => {
      const path = `/node_modules/@meteocons/svg/${style}/${resolvedSlug}.svg`;
      const fallbackPath = `/node_modules/@meteocons/svg/${style}/cloudy.svg`;

      try {
        let srcModule;
        if (icons[path]) {
          srcModule = await icons[path]();
        } else if (icons[fallbackPath]) {
          srcModule = await icons[fallbackPath]();
        }

        if (isMounted && srcModule) {
          setSrc(srcModule as string);
        }
      } catch (err) {
        console.error("Failed to load meteocons icon", err);
      }
    };

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, [resolvedSlug, style]);

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={resolvedSlug}
      width={size}
      height={size}
      className={className}
    />
  );
}
