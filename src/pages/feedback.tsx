import React, { useState } from "react";

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ background: "#14D9C5", minHeight: "200vh", padding: "20px" }}>
      <div className="container ">
        <h1 className="text-2xl ml-6">Contact and Feedback</h1>
        <form onSubmit={handleSubmit} className="mt-10">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              className="ml-8 mb-6"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              className="ml-9 mb-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Subject:</label>
            <select
              value={subject}
              className="ml-6 mb-6 w-48"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="feedback">Feedback</option>
              <option value="inquiry">Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="ml-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="ml-48 mt-12"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#45a049")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4CAF50")
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
