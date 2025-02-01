import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define default scores structure with all categories and subcategories outside the component
const defaultScores = {
  flags: {
    'Africa': 0,
    'Asia': 0,
    'Australia and Oceania': 0,
    'Europe': 0,
    'North America': 0,
    'South America': 0,
    'Worldwide': 0,
  },
  maps: {
    'Africa': 0,
    'Asia': 0,
    'Australia and Oceania': 0,
    'Europe': 0,
    'North America': 0,
    'South America': 0,
    'Worldwide': 0,
  },
};

const ScoreDisplay = () => {
  const [scores, setScores] = useState(defaultScores);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/scores/scores', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Create a new scores object starting with default values
        const organizedScores = {
          flags: { ...defaultScores.flags },
          maps: { ...defaultScores.maps },
        };

        // Update only the scores that exist in the response
        response.data.scores.forEach((score) => {
          if (organizedScores[score.category]) {
            organizedScores[score.category][score.subcategory] = score.highestScore;
          }
        });

        setScores(organizedScores);
      } catch (error) {
        console.error('Failed to fetch scores:', error);
        // If there's an error, maintain the default scores
        setScores(defaultScores);
      }
    };

    fetchScores();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Highest Scores</h2>

      {/* Flags Section */}
      <div style={styles.categorySection}>
        <h3 style={{ ...styles.categoryTitle, borderColor: '#28a745' }}>Flags</h3>
        {Object.entries(scores.flags).map(([region, score]) => (
          <div key={`flags-${region}`} style={styles.scoreRow}>
            <span style={styles.regionText}>{region}</span>
            <span style={{ ...styles.scoreText, color: score > 0 ? '#28a745' : '#6c757d' }}>
              {score}
            </span>
          </div>
        ))}
      </div>

      {/* Maps Section */}
      <div style={styles.categorySection}>
        <h3 style={{ ...styles.categoryTitle, borderColor: '#17a2b8' }}>Maps</h3>
        {Object.entries(scores.maps).map(([region, score]) => (
          <div key={`maps-${region}`} style={styles.scoreRow}>
            <span style={styles.regionText}>{region}</span>
            <span style={{ ...styles.scoreText, color: score > 0 ? '#17a2b8' : '#6c757d' }}>
              {score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    height: '100%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowY: 'auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c7873', // Deep Teal
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  categorySection: {
    marginBottom: '30px',
  },
  categoryTitle: {
    color: '#2c7873',
    borderBottom: '2px solid',
    paddingBottom: '5px',
    marginBottom: '15px',
    fontSize: '1.4rem',
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  regionText: {
    color: '#2c7873',
    fontSize: '1em',
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: '1em',
  },
};

export default ScoreDisplay;