// src/styles/utils.ts

/**
 * convert hex to rgba with alpha
 */
export const hexToRgba = (hex: string, alpha = 1) => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * clamp helper for fluid typography if needed (string return)
 * Example: clamp(1rem, 0.5rem + 2vw, 1.5rem)
 */
export const clamp = (min: string, val: string, max: string) =>
  `clamp(${min}, ${val}, ${max})`;
