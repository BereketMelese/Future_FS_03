import cloudinaryImageMap from "@/src/features/menu/data/cloudinary-image-map.json";

const PRODUCT_IMAGE_PREFIX = "/images/products/";

const isCloudinaryEnabled =
  process.env.NEXT_PUBLIC_USE_CLOUDINARY === "true" &&
  Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

function getProductFilename(imagePath) {
  if (!imagePath?.startsWith(PRODUCT_IMAGE_PREFIX)) {
    return null;
  }

  const filenameWithExt = imagePath.slice(PRODUCT_IMAGE_PREFIX.length);
  const dotIndex = filenameWithExt.lastIndexOf(".");

  if (dotIndex === -1) {
    return filenameWithExt;
  }

  return filenameWithExt.slice(0, dotIndex);
}

function getProductFilenameWithExtension(imagePath) {
  if (!imagePath?.startsWith(PRODUCT_IMAGE_PREFIX)) {
    return null;
  }

  return imagePath.slice(PRODUCT_IMAGE_PREFIX.length);
}

export function resolveProductImageUrl(imagePath) {
  if (!isCloudinaryEnabled) {
    return imagePath;
  }

  const filenameWithExtension = getProductFilenameWithExtension(imagePath);

  if (filenameWithExtension && cloudinaryImageMap[filenameWithExtension]) {
    return cloudinaryImageMap[filenameWithExtension];
  }

  const filename = getProductFilename(imagePath);

  if (!filename) {
    return imagePath;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const encodedFilename = encodeURIComponent(filename);

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/coffee-shop/products/${encodedFilename}`;
}
