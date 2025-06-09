import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditMedia() {
  const location = useLocation();
  const navigate = useNavigate();
  const media = location.state?.media;

 const [formData, setFormData] = useState({
  text: "",
  image: "",
  link: "",
});


  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
  if (media) {
    setFormData({
      text: media.text || "",
      image: media.image || "",
      link: media.link || "",
    });
    setPreviewUrl(media.image || "");
  }
}, [media]);


  useEffect(() => {
    if (!selectedFile) return;
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!media || !media.id) {
      alert("Original media info is missing.");
      return;
    }

    try {
      let imageToSend = formData.mediaImage;

      if (selectedFile) {
        imageToSend = await toBase64(selectedFile);
      }

      const updatedMedia = {
        ...formData,
        mediaImage: imageToSend,
      };

      const response = await fetch(
        `https://your-api.com/api/admin/update-media/${media.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMedia),
        }
      );

      if (!response.ok) throw new Error("Failed to update media");

      setSuccessMessage("Media updated successfully!");

      setTimeout(() => {
        navigate("/admin/media");
      }, 1500);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!media) {
    return (
      <div className="p-6 text-red-600 font-semibold text-center">
        No media data found. Please navigate from the Media page.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-4 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4 text-[var(--var-red-col)]">Edit Media</h2>

      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

   <form onSubmit={handleSubmit} className="space-y-6">
  {/* Text Field (e.g. Client Name or Description) */}
  <div className="flex flex-col">
    <label htmlFor="text" className="font-semibold text-gray-700 mb-2">
      Description / Title
    </label>
    <input
      id="text"
      name="text"
      type="text"
      value={formData.text}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-md px-4 py-2"
    />
  </div>

  {/* Media Link Field */}
  <div className="flex flex-col">
    <label htmlFor="link" className="font-semibold text-gray-700 mb-2">
      Media Link (e.g., YouTube)
    </label>
    <input
      id="link"
      name="link"
      type="text"
      value={formData.link}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-md px-4 py-2"
    />
  </div>

  {/* Image Upload Field */}
  <div className="flex flex-col">
    <label htmlFor="image" className="font-semibold text-gray-700 mb-2">
      Media Image
    </label>
    <div className="grid md:grid-cols-2 items-center gap-4">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Media preview"
          className="h-36 object-cover rounded border border-gray-300"
        />
      )}
      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-300 rounded-md px-4 py-2"
      />
    </div>
  </div>

  {/* Buttons */}
  <div className="flex justify-between gap-4">
    <button
      type="button"
      onClick={() => navigate("/admin/media")}
      className="flex-1 px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 px-6 py-2 rounded-md bg-[var(--var-red-col)] text-white hover:bg-red-700 transition"
    >
      Save Changes
    </button>
  </div>
</form>

    </div>
  );
}
