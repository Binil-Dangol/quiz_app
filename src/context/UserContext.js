import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // For fetching user data

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/getUser', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user); // Assuming the user data is in response.data.user
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Value to be passed to context consumers
  const value = { user, setUser, loading };

  return (
    <UserContext.Provider value={value}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);