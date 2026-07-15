// TODO: Replace with your actual Cloudinary values from dashboard
const CLOUD_NAME = "your_cloud_name"
const UPLOAD_PRESET = "your_upload_preset"

export async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  formData.append("folder", "job-portal/avatars")

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || "Image upload failed")
  }

  const data = await res.json()
  return data.secure_url
}
