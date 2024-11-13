import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config'; // Make sure this path matches your file structure
import './Profile.css'; // Import the CSS file for styling

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyIndustry: ''
  });

  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchProfileData(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const fetchProfileData = async (uid) => {
    const profileDoc = await getDoc(doc(firestore, 'userProfile', uid));
    if (profileDoc.exists()) {
      setProfileData(profileDoc.data());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(firestore, 'userProfile', userId), {
        ...profileData,
        uid: userId // Add the user's UID to the document
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Company Industry:</label>
          <input
            type="text"
            name="companyIndustry"
            value={profileData.companyIndustry}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
