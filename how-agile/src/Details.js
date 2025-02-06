import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import './Details.css'; // Import the CSS file for styling

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
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

    const fetchUserSubmissions = async () => {
      const q = query(collection(firestore, 'davenportMaturityModel'), where('userId', '==', id));
      const querySnapshot = await getDocs(q);
      const submissions = [];
      querySnapshot.forEach((doc) => {
        submissions.push(doc.data());
      });
      setChartData(formatDataForChart(submissions));
    };

    fetchDetails();
    fetchUserSubmissions();
  }, [id, firestore]);

  const formatDataForChart = (data) => {
    const labels = data.map(item => new Date(item.timestamp.seconds * 1000).toLocaleDateString());
    const values = data.map(item =>
      item.analystsValue + item.dataValue + item.enterpriseValue + item.leadershipValue + item.targetsValue + item.technologyValue
    );

    return {
      labels: labels,
      datasets: [
        {
          label: 'Sum of Values Over Time',
          data: values,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        }
      ]
    };
  };

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
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default Details;
