import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config'; // Make sure this path matches your file structure
import './Davenport.css'; // Import the CSS file
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Davenport = () => {
  const [analysts, setAnalysts] = useState('');
  const [DataDescription, setDataDescription] = useState('');
  const [data, setData] = useState('');
  const [EnterpriseDescription, setEnterpriseDescription] = useState('');
  const [enterprise, setEnterprise] = useState('');
  const [LeadershipDescription, setLeadershipDescription] = useState('');
  const [leadership, setLeadership] = useState('');
  const [TargetsDescription, setTargetsDescription] = useState('');
  const [targets, setTargets] = useState('');
  const [TechnologyDescription, setTechnologyDescription] = useState('');
  const [technology, setTechnology] = useState('');
  const [AnalystsDescription, setAnalystsDescription] = useState('');
  const [userId, setUserId] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  let navigate = useNavigate();
  const dropdownValues = {
    'Analytically Impaired': 1,
    'Localized Analytics': 2,
    'Analytical Aspirations': 3,
    'Analytical Companies': 4,
    'Analytical Competitors': 5
  };

  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid); // Store the user's ID
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "davenportMaturityModel"), {
        userId: userId, // Include the user's ID
        analysts: analysts,
        analystsValue: dropdownValues[analysts],
        DataDescription: DataDescription,
        data: data,
        dataValue: dropdownValues[data],
        EnterpriseDescription: EnterpriseDescription,
        enterprise: enterprise,
        enterpriseValue: dropdownValues[enterprise],
        LeadershipDescription: LeadershipDescription,
        leadership: leadership,
        leadershipValue: dropdownValues[leadership],
        TargetsDescription: TargetsDescription,
        targets: targets,
        targetsValue: dropdownValues[targets],
        TechnologyDescription: TechnologyDescription,
        technology: technology,
        technologyValue: dropdownValues[technology],
        AnalystsDescription: AnalystsDescription,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      // Reset form fields
      setAnalysts('');
      setDataDescription('');
      setData('');
      setEnterpriseDescription('');
      setEnterprise('');
      setLeadershipDescription('');
      setLeadership('');
      setTargetsDescription('');
      setTargets('');
      setTechnologyDescription('');
      setTechnology('');
      setAnalystsDescription('');
      // Show success message 
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  return (
    <div className="form-container">
    {submissionSuccess ? (
      <div className="submission-message">
        <h2>Thank you for your submission!</h2>
        <button className="results-button" onClick={() => navigate('/results')}>View Results</button>
      </div>
    ) : (   
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <label>Data:</label>
        <select value={data} onChange={(e) => setData(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Analytically Impaired">Inconsistent, poor quality, poorly organized</option>
          <option value="Localized Analytics">Data useable, but in functional or process silos</option>
          <option value="Analytical Aspirations">Organization beginning to create centralized data repository</option>
          <option value="Analytical Companies">Integrated, accurate, common data in central warehouse</option>
          <option value="Analytical Competitors">Relentless search for new data and metrics</option>
        </select>
      </div>
      <div className="form-row">
        <label>Data Description:</label>
        <input type="text" value={EnterpriseDescription} onChange={(e) => setEnterpriseDescription(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>Enterprise:</label>
        <select value={enterprise} onChange={(e) => setEnterprise(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Analytically Impaired">n/a</option>
          <option value="Localized Analytics">Islands of data, technology, and expertise</option>
          <option value="Analytical Aspirations">Early stages of an enterprise‐wide approach</option>
          <option value="Analytical Companies">Key data, technology and analysts are centralized or networked</option>
          <option value="Analytical Competitors">All key analytical resources centrally managed</option>
        </select>
      </div>
      <div className="form-row">
        <label>Enterprise Description:</label>
        <input type="text" value={LeadershipDescription} onChange={(e) => setLeadershipDescription(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>Leadership:</label>
        <select value={leadership} onChange={(e) => setLeadership(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Analytically Impaired">No awareness or interest</option>
          <option value="Localized Analytics">Only at the function or process level</option>
          <option value="Analytical Aspirations">Leaders beginning to recognize importance of analytics</option>
          <option value="Analytical Companies">Leadership support for analytical competence</option>
          <option value="Analytical Competitors">Strong leadership passion for analytical competition</option>
        </select>
      </div>
      <div className="form-row">
        <label>Leadership Description:</label>
        <input type="text" value={TargetsDescription} onChange={(e) => setTargetsDescription(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>Targets:</label>
        <select value={targets} onChange={(e) => setTargets(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Analytically Impaired">n/a</option>
          <option value="Localized Analytics">Multiple disconnected targets that may not be strategically important</option>
          <option value="Analytical Aspirations">Analytical efforts coalescing behind a small set of targets</option>
          <option value="Analytical Companies">Analytical activity centered on a few key domains</option>
          <option value="Analytical Competitors">Analytics support the firm’s distinctive capability and strategy</option>
        </select>
      </div>
      <div className="form-row">
        <label>Targets Description:</label>
        <input type="text" value={TechnologyDescription} onChange={(e) => setTechnologyDescription(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>Technology:</label>
        <select value={technology} onChange={(e) => setTechnology(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Analytically Impaired">Option1</option>
          <option value="Localized Analytics">Option2</option>
          <option value="Analytical Aspirations">Option3</option>
          <option value="Analytical Companies">Option4</option>
          <option value="Analytical Competitors">Option5</option>
        </select>
      </div>
      <div className="form-row">
        <label>Technology Description:</label>
        <input type="text" value={AnalystsDescription} onChange={(e) => setAnalystsDescription(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>Analysts:</label>
        <select value={analysts} onChange={(e) => setAnalysts(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Analytically Impaired">Few skills, and these attached to specific functions</option>
          <option value="Localized Analytics">Isolated pockets of analysts with no communication</option>
          <option value="Analytical Aspirations">Influx of analysts in key target areas</option>
          <option value="Analytical Companies">Highly capable analysts in central or networked organization</option>
          <option value="Analytical Competitors">World‐class professional analysts and attention to analytical amateurs</option>
        </select>
      </div>
      <div className="form-row">
        <label>Analysts Description:</label>
        <input type="text" value={DataDescription} onChange={(e) => setDataDescription(e.target.value)} className="form-input" required />
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
  )}
</div>
    );
};

export default Davenport;
