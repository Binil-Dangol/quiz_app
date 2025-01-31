import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OptionButton from "./OptionButton";
import ScoreDisplay from "./ScoreDisplay";
import axios from "axios";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateOptions = (correctOption, pool) => {
  const filteredPool = pool.filter((country) => country !== correctOption);
  const randomOptions = shuffleArray(filteredPool).slice(0, 3);
  const allOptions = [...randomOptions, correctOption];
  return shuffleArray(allOptions);
};

const QuizLogic = ({ quizType }) => {
  const location = useLocation();
  const region = location.state?.region || "worldwide";
  const navigate = useNavigate();
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lifelines, setLifelines] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // New method to update score on backend
  const updateScoreOnBackend = async () => {
    try {
      const token = localStorage.getItem("token");

      // Map region to backend subcategory format
      const subcategoryMap = {
        worldwide: "Worldwide",
        africa: "Africa",
        asia: "Asia",
        australia: "Australia and Oceania",
        europe: "Europe",
        "north-america": "North America",
        "south-america": "South America",
      };

      const subcategory = subcategoryMap[region] || "Worldwide";

      // Determine category based on quizType
      const category = quizType === "flag" ? "flags" : "maps";

      await axios.post(
        "http://localhost:5000/api/scores/update-score",
        {
          category,
          subcategory,
          score,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to update score:", error);
    }
  };

  // Use useCallback to memoize the fetchQuizData function
  const fetchQuizData = useCallback(() => {
    setLoading(true);
    // Fetch questions and countries simultaneously
    Promise.all([
      axios.get("http://localhost:5000/api/questions"),
      axios.get("http://localhost:5000/api/countries"),
    ])
      .then(([questionsRes, countriesRes]) => {
        // Filter questions by quiz type and region
        let filteredQuestions = questionsRes.data.filter(
          (question) =>
            question.type === quizType &&
            (region === "worldwide" || question.region === region)
        );

        // Filter countries by region
        let filteredCountries = countriesRes.data;
        if (region !== "worldwide") {
          filteredCountries = filteredCountries.filter(
            (country) => country.region === region
          );
        }

        const countryNames = filteredCountries.map((country) => country.name);

        // Shuffle and set questions
        const shuffled = shuffleArray(filteredQuestions);
        setShuffledQuestions(shuffled);
        setCountries(countryNames);

        // Set initial options if questions exist
        if (shuffled.length > 0) {
          setOptions(generateOptions(shuffled[0].correctOption, countryNames));
        }

        // Reset quiz state
        setCurrentQuestion(0);
        setScore(0);
        setLifelines(3);
        setSelectedOption(null);
        setQuizCompleted(false);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [quizType, region]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const handleOptionClick = (option) => {
    if (quizCompleted) return;

    setSelectedOption(option);

    setTimeout(() => {
      if (option === shuffledQuestions[currentQuestion].correctOption) {
        setScore((prevScore) => prevScore + 1);
      } else {
        const newLifelines = lifelines - 1;
        setLifelines(newLifelines);

        if (newLifelines === 0) {
          // Update score on backend when lifelines are depleted
          updateScoreOnBackend();
          setQuizCompleted(true);
          return;
        }
      }

      if (currentQuestion < shuffledQuestions.length - 1) {
        const nextQuestionIndex = currentQuestion + 1;
        setCurrentQuestion(nextQuestionIndex);
        setOptions(
          generateOptions(
            shuffledQuestions[nextQuestionIndex].correctOption,
            countries
          )
        );
      } else {
        setQuizCompleted(true);
        // Update score on backend when quiz is completed normally
        updateScoreOnBackend();
      }
      setSelectedOption(null);
    }, 100);
  };

  const handleRestart = () => {
    fetchQuizData();
  };

  if (loading) return <h1>Loading...</h1>;

  const renderLifelines = () => {
    return "❤️".repeat(lifelines);
  };

  if (quizCompleted)
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Quiz Completed!</h1>
          <h3>Your Score: {score}</h3>
          {lifelines > 0 && <h3>Remaining Lifelines: {renderLifelines()}</h3>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={handleRestart}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Restart Quiz
            </button>
            <button
              onClick={() => navigate("/quiz")}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Back to Quiz Selection
            </button>
          </div>
        </div>
        <ScoreDisplay />
      </div>
    );

  if (shuffledQuestions.length === 0) return <h1>Loading...</h1>;

  const question = shuffledQuestions[currentQuestion];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>
          {question.type === "flag"
            ? "Which country's flag is this?"
            : "Which country is shown on the map?"}
        </h2>
        <img
          src={question.imageUrl}
          alt="Quiz Visual"
          style={{ width: "300px", height: "200px" }}
        />
        <div>
          {options.map((option, index) => (
            <OptionButton
              key={index}
              text={option}
              selected={selectedOption === option}
              correct={option === question.correctOption}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3>Score: {score}</h3>
          {lifelines > 0 && <h3>Remaining Lifelines: {renderLifelines()}</h3>}
          <button
            onClick={() => navigate("/quiz")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Back to Quiz Selection
          </button>
        </div>
      </div>
      <ScoreDisplay />
    </div>
  );
};

export default QuizLogic;