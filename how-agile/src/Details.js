import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import './Details.css'; // Import the CSS file for styling

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  const firestore = getFirestore();

  useEffect(() => {
    const fetchDetails = async () => {
      const docRef = doc(firestore, 'davenportMaturityModel', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        console.error('No such document!');
      }
    };

    fetchDetails();
  }, [id, firestore]);

  if (!details) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <h1>Submission Details</h1>
      <p><strong>Analysts:</strong> {details.analysts}</p>
      <p><strong>Analysts Description:</strong> {details.AnalystsDescription}</p>
      <p><strong>Data:</strong> {details.data}</p>
      <p><strong>Data Description:</strong> {details.DataDescription}</p>
      <p><strong>Enterprise:</strong> {details.enterprise}</p>
      <p><strong>Enterprise Description:</strong> {details.EnterpriseDescription}</p>
      <p><strong>Leadership:</strong> {details.leadership}</p>
      <p><strong>Leadership Description:</strong> {details.LeadershipDescription}</p>
      <p><strong>Targets:</strong> {details.targets}</p>
      <p><strong>Targets Description:</strong> {details.TargetsDescription}</p>
      <p><strong>Technology:</strong> {details.technology}</p>
      <p><strong>Technology Description:</strong> {details.TechnologyDescription}</p>
    </div>
  );
};

export default Details;
