import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Results.css'; // Import the CSS file for styling

const Results = () => {
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null);

  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchResults(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const fetchResults = async (uid) => {
    const q = query(collection(firestore, 'davenportMaturityModel'), where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    const resultsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setResults(resultsData);
  };

  return (
    <div className="results-container">
      <h1>My Submissions</h1>
      {results.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id} className="result-item">
              <p><strong>Collection:</strong> davenportMaturityModel</p>
              <p><strong>Date:</strong> {new Date(result.timestamp.seconds * 1000).toLocaleDateString()}</p>
              <Link to={`/details/${result.id}`}>
                <button className="details-button">Details</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
