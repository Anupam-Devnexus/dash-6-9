import React, { useState } from "react";
import reviewsData from "../../DataStore/Review.json";
import ReviewCard from "../../Components/Card/ReviewCard";
import Confirm from "../../Components/PopUp/Confirm";
import { useNavigate } from "react-router-dom";

export default function Review() {
  const [reviews, setReviews] = useState(reviewsData);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const navigate = useNavigate();

  // Navigate to edit page with review data passed as state
  const handleEdit = (review) => {
    navigate(`/admin/review/${encodeURIComponent(review.clientname)}/edit`, { state: { review } });
  };

  // Update local reviews state after edit
  const handleSave = (updatedReview) => {
    const updated = reviews.map((r) =>
      r.clientname === updatedReview.clientname ? updatedReview : r
    );
    setReviews(updated);
  };

  // Open confirm popup on delete
  const handleDelete = (review) => {
    setReviewToDelete(review);
  };

  // Confirm deletion and update state
  const confirmDelete = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((r) => r.clientname !== reviewToDelete.clientname));
      setReviewToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setReviewToDelete(null);
  };

  return (
    <div className="max-w-full mx-auto p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">
          📝 Client Reviews ({reviews.length})
        </h1>
        <button
          onClick={() => navigate("/admin/review/addReview")}
          className="cursor-pointer px-3 py-1 bg-[var(--var-red-col)] text-white font-semibold rounded-md"
        >
          Add Review
        </button>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.clientname} // better key if unique clientname
            review={review}
            onEdit={handleEdit}
            onDelete={handleDelete}
           
          />
        ))}
      </div>

      {reviewToDelete && (
        <Confirm
          isOpen={Boolean(reviewToDelete)}
          clientName={reviewToDelete.clientname}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
