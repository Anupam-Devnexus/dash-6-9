import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function EditR() {
  const { clientname } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialReview = location.state?.review;

  const [form, setForm] = useState({
    clientname: "",
    profilePicture: "",
    reviewHead: "",
    review: "",
    star: 1,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (initialReview && initialReview.clientname === clientname) {
      setForm(initialReview);
      setPreviewUrl(initialReview.profilePicture || "");
    } else {
      alert("Review data not found!");
      navigate("/review");
    }
  }, [initialReview, clientname, navigate]);

  useEffect(() => {
    if (!imageFile) return;

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "star" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.profilePicture;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // Replace
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (err) {
        alert("Image upload failed");
        return;
      }
    }

    const updatedReview = {
      ...form,
      profilePicture: imageUrl,
    };

    try {
      const response = await fetch(
        `https://your-api-url.com/api/reviews/${clientname}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      setSuccessMessage("Review updated successfully!");

      setTimeout(() => {
        navigate("/admin/review");
      }, 1500);
    } catch (error) {
      console.error("Error updating review:", error);
      alert("There was a problem updating the review.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--var-red-col)]">
        ✏️ Edit Client Review
      </h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Client Name (full width) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input
            name="clientname"
            value={form.clientname}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Profile Picture (full width) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 mt-3 rounded-full object-cover border"
            />
          )}
        </div>

        {/* Review Heading */}
        <div>
          <label className="block text-sm font-medium mb-1">Review Heading</label>
          <input
            name="reviewHead"
            value={form.reviewHead}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Stars */}
        <div>
          <label className="block text-sm font-medium mb-1">Stars (1-5)</label>
          <input
            name="star"
            type="number"
            min={1}
            max={5}
            value={form.star}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Review Text (full width) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Review</label>
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Buttons (full width, right aligned) */}
        <div className="sm:col-span-2 flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/review")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--var-red-col)] text-white rounded hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
