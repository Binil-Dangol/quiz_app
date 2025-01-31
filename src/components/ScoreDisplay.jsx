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
    'Worldwide': 0
  },
  maps: {
    'Africa': 0,
    'Asia': 0,
    'Australia and Oceania': 0,
    'Europe': 0,
    'North America': 0,
    'South America': 0,
    'Worldwide': 0
  }
};

const ScoreDisplay = () => {
  const [scores, setScores] = useState(defaultScores);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/scores/scores', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Create a new scores object starting with default values
        const organizedScores = {
          flags: { ...defaultScores.flags },
          maps: { ...defaultScores.maps }
        };

        // Update only the scores that exist in the response
        response.data.scores.forEach(score => {
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
    <div className="score-display" style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      height: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        color: '#333',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>Your Highest Scores</h2>
      
      {/* Flags Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          color: '#4CAF50', 
          borderBottom: '2px solid #4CAF50',
          paddingBottom: '5px',
          marginBottom: '10px',
          fontSize: '1.2rem'
        }}>Flags</h3>
        {Object.entries(scores.flags).map(([region, score]) => (
          <div key={`flags-${region}`} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #ddd'
          }}>
            <span>{region}:</span>
            <span style={{ 
              fontWeight: 'bold',
              color: score > 0 ? '#4CAF50' : '#666'
            }}>{score}</span>
          </div>
        ))}
      </div>

      {/* Maps Section */}
      <div>
        <h3 style={{ 
          color: '#008CBA', 
          borderBottom: '2px solid #008CBA',
          paddingBottom: '5px',
          marginBottom: '10px',
          fontSize: '1.2rem'
        }}>Maps</h3>
        {Object.entries(scores.maps).map(([region, score]) => (
          <div key={`maps-${region}`} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #ddd'
          }}>
            <span>{region}:</span>
            <span style={{ 
              fontWeight: 'bold',
              color: score > 0 ? '#008CBA' : '#666'
            }}>{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreDisplay;