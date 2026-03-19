const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARYCLOUDNAME,
  api_key: process.env.CLOUDINARYAPIKEY,
  api_secret: process.env.CLOUDINARYAPISECRET,
});

const imagesPath = path.join(__dirname, "../public/images/products");
const outputMapPath = path.join(
  __dirname,
  "../src/features/menu/data/cloudinary-image-map.json",
);
const imageFiles = fs.readdirSync(imagesPath);

function loadExistingMap() {
  if (!fs.existsSync(outputMapPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(outputMapPath, "utf-8"));
  } catch {
    return {};
  }
}

async function uploadImages() {
  console.log(`📸 Found ${imageFiles.length} images to upload...`);
  const imageMap = loadExistingMap();

  for (const file of imageFiles) {
    try {
      const publicId = `coffee-shop/products/${path.parse(file).name}`;

      const result = await cloudinary.uploader.upload(
        path.join(imagesPath, file),
        {
          public_id: publicId,
          overwrite: true,
          use_filename: true,
        },
      );

      imageMap[file] = result.secure_url;

      console.log(`✅ Uploaded: ${file} -> ${result.public_id}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }

  fs.writeFileSync(outputMapPath, `${JSON.stringify(imageMap, null, 2)}\n`);
  console.log(`🗺️  Saved Cloudinary map to ${outputMapPath}`);
}

uploadImages();
