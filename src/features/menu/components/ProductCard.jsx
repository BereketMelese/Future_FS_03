"use client";

import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import Button from "@/src/components/ui/Button";
import { resolveProductImageUrl } from "@/src/lib/image-url";

const formatPrice = (value) => `ETB${value.toFixed(2)}`;
const CARD_IMAGE_SIZES =
  "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";
const MENU_SHIMMER_BLUR_DATA_URL =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='0'%3E%3Cstop stop-color='%232a2a2a' offset='20%25'/%3E%3Cstop stop-color='%23333434' offset='50%25'/%3E%3Cstop stop-color='%232a2a2a' offset='80%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3C/svg%3E";

function ProductCard({ product, onCustomize, priority = false }) {
  const resolvedImageSrc = useMemo(
    () => resolveProductImageUrl(product.image),
    [product.image],
  );
  const [imageSrc, setImageSrc] = useState(resolvedImageSrc);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(resolvedImageSrc);
    setIsImageLoaded(false);
  }, [resolvedImageSrc]);

  return (
    <article className="glass-panel group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-[rgba(245,233,220,0.2)] hover:shadow-[0_18px_38px_rgba(0,0,0,0.34)]">
      <div className="menu-image-shell relative h-48 w-full">
        <div
          className={`menu-image-loading-layer ${
            isImageLoaded ? "menu-image-loading-layer-hidden" : ""
          }`}
        />
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes={CARD_IMAGE_SIZES}
          priority={priority}
          placeholder="blur"
          blurDataURL={MENU_SHIMMER_BLUR_DATA_URL}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => {
            if (imageSrc !== product.image) {
              setImageSrc(product.image);
              setIsImageLoaded(false);
              return;
            }

            setIsImageLoaded(true);
          }}
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl leading-tight">{product.name}</h3>
          <span className="text-lg text-(--accent)">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="menu-description-clamp text-sm text-muted">
          {product.description}
        </p>
        {onCustomize ? (
          <div className="pt-2">
            <Button variant="ghost" onClick={() => onCustomize(product)}>
              Build Your Coffee
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default memo(ProductCard);
