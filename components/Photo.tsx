"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export interface PhotoProps extends Omit<ImageProps, "onError"> {
  fallback?: React.ReactNode;
  onError?: () => void;
}

export function Photo({
  src,
  alt = "",
  fill,
  sizes,
  priority = false,
  className = "",
  style,
  fallback = null,
  onError,
  ...rest
}: PhotoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={
        sizes ??
        (fill
          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          : undefined)
      }
      priority={priority}
      className={className}
      style={{
        objectFit: "cover",
        ...style,
      }}
      onError={() => {
        setError(true);
        onError?.();
      }}
      {...rest}
    />
  );
}

