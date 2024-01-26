// FeedbackForm.tsx
import React, { useState } from "react";
import Rating from "react-rating-stars-component";

interface FeedbackFormProps {
  orderId: string;
  onSubmitFeedback: (orderId: string, rating: number, feedback: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  orderId,
  onSubmitFeedback,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedbackInput, setShowFeedbackInput] = useState<boolean>(false);

  const handleRating = (newRating: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    setRating(newRating);
    setShowFeedbackInput(true);
  };

  const handleSubmit = () => {
    onSubmitFeedback(orderId, rating, feedback);
  };

  return (
    <div>
      <Rating
        count={5}
        onChange={(rate, event) => handleRating(rate, event)}
        size={24}
        activeColor="#ffd700"
        value={rating}
      />
      {showFeedbackInput && (
        <>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Leave your feedback..."
          />
          <button onClick={handleSubmit}>Submit Feedback</button>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
