import React, { useState, useEffect } from "react";
import OptionButton from "./OptionButton";
import axios from "axios";

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

// Generate random options for a question
const generateOptions = (correctOption, pool) => {
  const filteredPool = pool.filter((country) => country !== correctOption);
  const randomOptions = shuffleArray(filteredPool).slice(0, 3); // Select 3 incorrect options
  const allOptions = [...randomOptions, correctOption];
  return shuffleArray(allOptions); // Shuffle the final options
};

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lifelines, setLifelines] = useState(3);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizType, setQuizType] = useState(null); // Tracks the selected quiz type
  const [options, setOptions] = useState([]); // Tracks options for the current question
  const [loading, setLoading] = useState(false); // Tracks loading state

  // Fetch questions and countries from backend
  useEffect(() => {
    if (quizType) {
      setLoading(true); // Set loading state to true
      axios
        .get("http://localhost:5000/api/questions")
        .then((res) => {
          const filteredQuestions = res.data.filter(
            (question) => question.type === quizType
          );
          const shuffled = shuffleArray(filteredQuestions);
          setShuffledQuestions(shuffled);

          axios
            .get("http://localhost:5000/api/countries")
            .then((countryRes) => {
              const countryNames = countryRes.data.map((country) => country.name);
              setCountries(countryNames);

              if (shuffled.length > 0) {
                setOptions(generateOptions(shuffled[0].correctOption, countryNames));
              }
              setLoading(false); // Set loading state to false after data is loaded
            })
            .catch((err) => {
              console.error("Error fetching countries:", err);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.error("Error fetching questions:", err);
          setLoading(false);
        });
    }
  }, [quizType]);

  const startQuiz = (type) => {
    setQuizType(type); // Set the quiz type ("flag" or "map")
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setLifelines(3);
    setSelectedOption(null);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizType(null);
    setShuffledQuestions([]);
    setOptions([]);
    setQuizCompleted(false);
  };

  const handleOptionClick = (option) => {
    if (!quizStarted || quizCompleted) return;

    setSelectedOption(option);

    if (option === shuffledQuestions[currentQuestion].correctOption) {
      setScore(score + 1);
    } else {
      const newLifelines = lifelines - 1;
      setLifelines(newLifelines);

      // If lifelines reach 0, end the quiz immediately
      if (newLifelines === 0) {
        setQuizCompleted(true);
        return;
      }
    }

    // Move to the next question or mark quiz as completed
    setTimeout(() => {
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
        setQuizCompleted(true); // End the quiz if all questions are answered
      }
      setSelectedOption(null);
    }, 500);
  };

  if (!quizStarted) {
    // Home screen with quiz type selection
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Start Quiz</h1>
        <p>Select a quiz type to get started:</p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
          onClick={() => startQuiz("flag")}
        >
          Flags
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => startQuiz("map")}
        >
          Others
        </button>
      </div>
    );
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (quizCompleted) {
    // Results screen
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Quiz Completed!</h1>
        <h3>Your Score: {score}</h3>
        <h3>Remaining Lifelines: {lifelines}</h3>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={restartQuiz}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return <h1>Loading...</h1>;
  }

  const question = shuffledQuestions[currentQuestion];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
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
        <h3>Lifelines Remaining: {lifelines}</h3>
      </div>
      {quizStarted && (
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={restartQuiz}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default Quiz;