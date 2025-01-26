import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './questionPage.css';
import axios from 'axios';
import image3 from '../assets/image3.png';

function QuestionDetailPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [questionDetails, setQuestionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [anagramInput, setAnagramInput] = useState('');

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/questions/${questionId}`);
        setQuestionDetails(response.data);
      } catch (error) {
        setError('Error fetching question details.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionDetails();
  }, [questionId]);

  const handleSubmitMCQ = () => {
    setSubmitted(true);
    if (selectedOption) {
      const correctOption = questionDetails.options.find(option => option.isCorrectAnswer);
      if (selectedOption === correctOption.text) {
        setFeedback('Correct!');
      } else {
        setFeedback('Wrong answer!');
      }
    } else {
      setFeedback('Please select an option before submitting.');
    }
  };

  const handleSubmitAnagram = () => {
    setSubmitted(true);
    if (anagramInput.trim() === questionDetails.correctAnswer.trim()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Wrong answer!');
    }
  };

  const handleShowSolution = () => {
    setAnswerVisible(true);
  };

  const handleNextQuestion = async () => {
    if (questionDetails) {
      try {
        const response = await axios.get(`http://localhost:5001/api/questions?type=${questionDetails.type}&next=true`);
        navigate(`/question/${response.data.id}`);
      } catch (error) {
        setError('Error fetching next question.');
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="question-detail-container">
      <div className="content-container">
        <div className="question-content">
          <div className='btn1'>
            <button onClick={handleBack}>Back</button>
          </div>
          <p>Type: {questionDetails.type}</p>
          <h1>{questionDetails.title}</h1>

          {questionDetails.type === 'MCQ' && (
            <div className="mcq-options">
              {questionDetails.options.map((option, index) => (
                <button
                  key={`option-${index}`}
                  onClick={() => setSelectedOption(option.text)}
                  className={selectedOption === option.text ? 'selected' : ''}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {questionDetails.type === 'Anagram' && (
            <div className="anagram-section">
              <p>Rearrange the following:</p>
              <h3>{questionDetails.scrambledText}</h3>
              <input
                type="text"
                value={anagramInput}
                onChange={(e) => setAnagramInput(e.target.value)}
                placeholder="Type your answer here"
              />
            </div>
          )}

          {!submitted && questionDetails.type === 'MCQ' && (
            <button onClick={handleSubmitMCQ} className="submit-btn">
              Submit
            </button>
          )}
          {!submitted && questionDetails.type === 'Anagram' && (
            <button onClick={handleSubmitAnagram} className="submit-btn">
              Submit
            </button>
          )}

          {submitted && (
            <div className="feedback">
              <p>{feedback}</p>
            </div>
          )}

          {submitted && !answerVisible && (
            <button onClick={handleShowSolution} className="show-solution-btn">
              Show Solution
            </button>
          )}

          {submitted && answerVisible && (
            <div className="solution">
              <h2>Solution:</h2>
              <p>
                The correct answer is:{' '}
                {questionDetails.type === 'MCQ'
                  ? questionDetails.options.find(option => option.isCorrectAnswer).text
                  : questionDetails.correctAnswer}
              </p>
            </div>
          )}

          {submitted && (
            <button onClick={handleNextQuestion} className="next-btn">
              Next Question
            </button>
          )}
        </div>
      </div>
      <div className="image-container">
        <img src={image3} alt="Question Illustration" />
      </div>
    </div>
  );
}

export default QuestionDetailPage;
