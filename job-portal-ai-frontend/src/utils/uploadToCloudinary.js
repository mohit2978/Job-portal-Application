const CLOUD_NAME   = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME   || "dcpesbd8q"
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "job-portal"

/**
 * Uploads a file to Cloudinary using an unsigned upload preset.
 * Configure VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} The secure URL of the uploaded image
 */
export async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  formData.append("folder", "job-portal/avatars")

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err.error?.message || "Image upload failed"

    // Give a helpful message if the preset is wrong
    if (msg.toLowerCase().includes("preset") || res.status === 400) {
      throw new Error(
        `Cloudinary upload preset "${UPLOAD_PRESET}" not found or disabled. ` +
        `Go to cloudinary.com → Settings → Upload Presets and create an unsigned preset named "${UPLOAD_PRESET}".`
      )
    }
    throw new Error(msg)
  }

  const data = await res.json()
  return data.secure_url
}
