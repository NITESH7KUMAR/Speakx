import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';

function HomePage() {
    const [query, setQuery] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const itemsPerPage = 5;

    const handleSearch = useCallback(async () => {
        if (!query) {
            setQuestions([]);
            setTotalQuestions(0);
            setPage(1); // Reset the page number
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:5001/api/questions?query=${query}&page=${page}&limit=${itemsPerPage}`
            );
            setQuestions(response.data.questions || []);
            setTotalQuestions(response.data.total || 0);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

        setLoading(false);
    }, [query, page]);

    const handleNextPage = () => {
        if (questions.length === itemsPerPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    useEffect(() => {
        handleSearch();
    }, [query, page, handleSearch]);

    return (
        <div className="home-container">
            {/* Left Image */}
            <div className="image-section left-image">
                <img src={image1} alt="Learning Illustration Left" className="home-image" />
            </div>

            {/* Search Section */}
            <div className="content-section">
                <h1>Welcome to Project SpeakX</h1>
                <p>This is a platform to help users learn and practice speaking in various languages.</p>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Search for a question"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">
                        Search
                    </button>
                </div>

                {loading && <p className='no-result'>Loading...</p>}
                {questions.length === 0 && !loading && query && <p className='no-result'>No results found</p>}

                {questions.length > 0 && (
                    <>
                        <div className="questions-list">
                            {questions.map((question) => (
                                <div key={question._id} className="question-card">
                                    <p className="question-type">Type: {question.type}</p>
                                    <h3 className="question-title">{question.title}</h3>
                                    <Link to={`/questions/${question._id}`}>View Details</Link>
                                </div>
                            ))}
                        </div>

                        <div className="pagination">
                            <button onClick={handlePreviousPage} disabled={page === 1}>
                                Prev
                            </button>
                            <span>
                                Page {page} of {Math.ceil(totalQuestions / itemsPerPage)}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={questions.length < itemsPerPage || page * itemsPerPage >= totalQuestions}
                            >
                                Next
                            </button>
                        </div>
                        <p>
                            Showing {Math.min(page * itemsPerPage, totalQuestions)} of {totalQuestions} results
                        </p>
                    </>
                )}
            </div>

            {/* Right Image */}
            <div className="image-section right-image">
                <img src={image2} alt="Learning Illustration Right" className="home-image" />
            </div>
        </div>
    );
}

export default HomePage;
