import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config'; // Make sure this path matches your file structure
import './Assessments.css'; // Import the CSS file

const Assessments = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const docRef = await addDoc(collection(db, "submissions"), {
        name: name,
        email: email,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      // Reset form fields
      setName('');
      setEmail('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
      </label>
      <br />
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default Assessments;
