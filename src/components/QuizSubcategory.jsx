import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizSubcategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizType = location.state?.quizType;

  const subcategories = [
    { id: 'worldwide', name: 'Worldwide' },
    { id: 'africa', name: 'Africa' },
    { id: 'asia', name: 'Asia' },
    { id: 'australia', name: 'Australia and Oceania' },
    { id: 'europe', name: 'Europe' },
    { id: 'north-america', name: 'North America' },
    { id: 'south-america', name: 'South America' }
  ];

  const handleSubcategorySelect = (subcategory) => {
    if (quizType === 'flag') {
      navigate('/flags-quiz', { state: { region: subcategory.id } });
    } else {
      navigate('/maps-quiz', { state: { region: subcategory.id } });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Select {quizType === 'flag' ? 'Flags' : 'Maps'} Quiz Region</h1>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
        maxWidth: '300px',
        margin: '20px auto'
      }}>
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => handleSubcategorySelect(subcategory)}
            style={{
              padding: "15px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
      <button
        onClick={() => navigate('/quiz')}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px"
        }}
      >
        Back to Quiz Selection
      </button>
    </div>
  );
};

export default QuizSubcategory;