import React, { useState } from 'react';
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
    { id: 'south-america', name: 'South America' },
  ];

  const handleSubcategorySelect = (subcategory) => {
    if (quizType === 'flag') {
      navigate('/flags-quiz', { state: { region: subcategory.id } });
    } else {
      navigate('/maps-quiz', { state: { region: subcategory.id } });
    }
  };

  // State to track the hovered card
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Select {quizType === 'flag' ? 'Flags' : 'Maps'} Quiz Region
      </h1>
      <div style={styles.subcategoryGrid}>
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            style={{
              ...styles.card,
              ...(hoveredCard === subcategory.id ? styles.cardHover : {}),
            }}
            onClick={() => handleSubcategorySelect(subcategory)}
            onMouseEnter={() => setHoveredCard(subcategory.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardContent}>
              <p style={styles.cardText}>{subcategory.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/quiz')} style={styles.backButton}>
        Back to Quiz Selection
      </button>
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#eaf6f6', // Light Teal
    minHeight: '100vh',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '2.5em',
    color: '#2c7873', // Deep Teal
    marginBottom: '30px',
    marginTop: 0,
  },
  subcategoryGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    width: '200px',
    height: '100px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)', // Slightly stronger shadow on hover
    // No background color change
  },
  cardContent: {
    padding: '10px',
  },
  cardText: {
    fontSize: '1.2em',
    color: '#2c7873',
    margin: 0,
    textAlign: 'center',
  },
  backButton: {
    marginTop: '40px',
    padding: '12px 30px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#17a2b8', // Bootstrap Info Blue
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontFamily: 'inherit',
    transition: 'background-color 0.2s',
  },
};

export default QuizSubcategory;