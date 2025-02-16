import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config'; // Make sure this path matches your file structure
import './CX.css'; // Import the CSS file
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const CX = () => {
  const [capabilityEfforts, setCapabilityEfforts] = useState('');
  const [capabilityLeadership, setCapabilityLeadership] = useState('');
  const [capabilityResources, setCapabilityResources] = useState('');
  const [cxObjectives, setCxObjectives] = useState('');
  const [metricsMeasures, setMetricsMeasures] = useState('');
  const [opportunityOne, setOpportunityOne] = useState('');
  const [opportunityTwo, setOpportunityTwo] = useState('');
  const [opportunityThree, setOpportunityThree] = useState('');
  const [strengthOne, setStrengthOne] = useState('');
  const [strengthTwo, setStrengthTwo] = useState('');
  const [strengthThree, setStrengthThree] = useState('');
  const [symptomsAssociates, setSymptomsAssociates] = useState('');
  const [symptomsAwareness, setSymptomsAwareness] = useState('');
  const [symptomsBrand, setSymptomsBrand] = useState('');
  const [symptomsBudget, setSymptomsBudget] = useState('');
  const [symptomsCustomer, setSymptomsCustomer] = useState('');
  const [symptomsExecutive, setSymptomsExecutive] = useState('');
  const [symptomsImprovement, setSymptomsImprovement] = useState('');
  const [symptomsInnovation, setSymptomsInnovation] = useState('');
  const [symptomsInsights, setSymptomsInsights] = useState('');
  const [symptomsListening, setSymptomsListening] = useState('');
  const [symptomsStrategy, setSymptomsStrategy] = useState('');
  const [threatOne, setThreatOne] = useState('');
  const [threatTwo, setThreatTwo] = useState('');
  const [threatThree, setThreatThree] = useState('');
  const [weaknessOne, setWeaknessOne] = useState('');
  const [weaknessTwo, setWeaknessTwo] = useState('');
  const [weaknessThree, setWeaknessThree] = useState('');    
  const [userId, setUserId] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  let navigate = useNavigate();
  const dropdownValues = {
    '1': "Starting",
    '2': "Developing",
    '3': "Managing",
    '4': "Optimizing",
    '5' : "Pioneering"
  };
  const radioValues = {
    '0': "No",
    '1': "Yes"
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
      const docRef = await addDoc(collection(db, "cxCompetencyAssessment"), {
        userId: userId, // Include the user's ID
        capabilityEfforts: capabilityEfforts,
        capabilityEffortsValue: dropdownValues[capabilityEfforts],
        capabilityLeadership: capabilityLeadership,
        capabilityLeadershipValue: dropdownValues[capabilityLeadership],
        capabilityResources: capabilityResources,
        capabilityResourcesValue: dropdownValues[capabilityResources],
        cxObjectives: cxObjectives,
        cxObjectivesValue: dropdownValues[cxObjectives],
        metricsMeasures: metricsMeasures,
        metricsMeasuresValue: dropdownValues[metricsMeasures],
        opportunityOne: opportunityOne,
        opportunityTwo: opportunityTwo,
        opportunityThree: opportunityThree,
        strengthOne: strengthOne,
        strengthTwo: strengthTwo,
        strengthThree: strengthThree,
        symptomsAssociates: symptomsAssociates,
        symptomsAssociatesValue: radioValues[symptomsAssociates],
        symptomsAwareness: symptomsAwareness,
        symptomsAwarenessValue: radioValues[symptomsAwareness],
        symptomsBrand: symptomsBrand,
        symptomsBrandValue: radioValues[symptomsBrand],
        symptomsBudget: symptomsBudget,
        symptomsBudgetValue: radioValues[symptomsBudget],
        symptomsCustomer: symptomsCustomer,
        symptomsCustomerValue: radioValues[symptomsCustomer],
        symptomsExecutive: symptomsExecutive,
        symptomsExecutiveValue: radioValues[symptomsExecutive],
        symptomsImprovement: symptomsImprovement,
        symptomsImprovementValue: radioValues[symptomsImprovement],
        symptomsInnovation: symptomsInnovation,
        symptomsInnovationValue: radioValues[symptomsInnovation],
        symptomsInsights: symptomsInsights,
        symptomsInsightsValue: radioValues[symptomsInsights],
        symptomsListening: symptomsListening,
        symptomsListeningValue: radioValues[symptomsListening],
        symptomsStrategy: symptomsStrategy,
        symptomsStrategyValue: radioValues[symptomsStrategy],
        threatOne: threatOne,
        threatTwo: threatTwo,
        threatThree: threatThree,
        weaknessOne: weaknessOne,
        weaknessTwo: weaknessTwo,
        weaknessThree: weaknessThree,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      // Reset form fields
      setCapabilityEfforts('');
      setCapabilityLeadership('');
      setCapabilityResources('');
      setCxObjectives('');
      setMetricsMeasures('');
      setOpportunityOne('');
      setOpportunityTwo('');
      setOpportunityThree('');
      setStrengthOne('');
      setStrengthTwo('');
      setStrengthThree('');
      setSymptomsAssociates('');
      setSymptomsAwareness('');
      setSymptomsBrand('');
      setSymptomsBudget('');
      setSymptomsCustomer('');
      setSymptomsExecutive('');
      setSymptomsImprovement('');
      setSymptomsInnovation('');
      setSymptomsInsights('');
      setSymptomsListening('');
      setSymptomsStrategy('');
      setThreatOne('');
      setThreatTwo('');
      setThreatThree('');
      setWeaknessOne('');
      setWeaknessTwo('');
      setWeaknessThree('');
      // Scroll to the top of the page
      window.scrollTo(0, 0);
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
      <h1>Customer Experience Competency Assessment Survey</h1>
      <p>The objective of completion of the following customer experience assessment is to determine your organization's maturity with
            respect to its customer experience capability. It will determine which of four stages (starting, developing, managing, optimizing) 
            your organization is currently performing. 
      </p>
      <h3>Distinctive Customer Experience (CX) Capability</h3>
      <div className="form-row">
        <label>The way in your company approach customer experience strategically and in day-to-day operations is best described as
                follows:
        </label>
        <select value={capabilityResources} onChange={(e) => setCapabilityResources(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Starting">CX is important but recieves limited resources</option>
          <option value="Developing">CX formalized programs begin to emerge for gathering feedback</option>
          <option value="Managing">CX is critical and executives are actively involved</option>
          <option value="Optimizing">CX is central to the company strategy</option>
        </select>
      </div>
      <div className="form-row">
        <label>The way in your company approach customer experience strategically and in day-to-day operations is best described as
        follows:</label>
        <select value={capabilityEfforts} onChange={(e) => setCapabilityEfforts(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Starting">CX is various disparate efforts and may not support company distinct capability</option>
          <option value="Developing">CX investments in capital begin</option>
          <option value="Managing">Company understands the impact of CX on growth and profit</option>
          <option value="Optimizing">Process shifts from process improvements to innovative breakthroughs</option>
        </select>
      </div>
      <div className="form-row">
        <label>The way in your company approach customer experience strategically and in day-to-day operations is best described as
            follows:
        </label>
        <select value={capabilityLeadership} onChange={(e) => setCapabilityLeadership(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Starting">CX has low/no leadership</option>
          <option value="Developing">Intensified focus on problem resolution</option>
          <option value="Managing">Focus on redesigning processes with CX as the centerpiece</option>
          <option value="Optimizing">Employee engagement focuses on cultivating a customer-centric culture</option>
        </select>
      </div>
      <h3>Symptoms of Customer Experience Capability</h3>
      <div className="form-row">
        <label>The way in your company has focused , installed, or invested in the following as it relates to customer experience
            assists in identifying your companies' maturity level. Please answer the following:
        </label>
        <label>Does your company have a customer experience budget?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Budget" value="1" onChange={(e) => setSymptomsBudget(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Budget" value="0" onChange={(e) => setSymptomsBudget(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you have an executive in charge of customer experience?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Executive" value="1" onChange={(e) => setSymptomsExecutive(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Executive" value="0" onChange={(e) => setSymptomsExecutive(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Is customer experience part of your company value proposition or brand promise?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Brand" value="1" onChange={(e) => setSymptomsBrand(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Brand" value="0" onChange={(e) => setSymptomsBrand(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you collect associate feedback on what can be improved?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Associates" value="1" onChange={(e) => setSymptomsAssociates(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Associates" value="0" onChange={(e) => setSymptomsAssociates(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you act on associate feedback for improvement?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Improvement" value="1" onChange={(e) => setSymptomsImprovement(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Improvement" value="0" onChange={(e) => setSymptomsImprovement(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you collect customer feedback?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Customer" value="1" onChange={(e) => setSymptomsCustomer(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Customer" value="0" onChange={(e) => setSymptomsCustomer(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you leverage key insights from customer feedback to make improvements in the customer experience?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Insights" value="1" onChange={(e) => setSymptomsInsights(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Insights" value="0" onChange={(e) => setSymptomsInsights(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you create broad awareness of feedback and clear ownership for improvement actions?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Awareness" value="1" onChange={(e) => setSymptomsAwareness(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Awareness" value="0" onChange={(e) => setSymptomsAwareness(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Are executives actively engaged in listening?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Listening" value="1" onChange={(e) => setSymptomsListening(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Listening" value="0" onChange={(e) => setSymptomsListening(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Is the customer experience a central part of the company strategy?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Strategy" value="1" onChange={(e) => setSymptomsStrategy(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Strategy" value="0" onChange={(e) => setSymptomsStrategy(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        <label>Do you leverage customer experience feedback to innovate differently?</label>
        <div className="radio-group">
            <div className="radio-input-container">
                <input type="radio" name="Innovation" value="1" onChange={(e) => setSymptomsInnovation(e.target.value)} className="radio-input" />
                <span>Yes</span>
            </div>
            <div className="radio-input-container">
                <input type="radio" name="Innovation" value="0" onChange={(e) => setSymptomsInnovation(e.target.value)} className="radio-input" />
                <span>No</span>
            </div>
        </div>
        </div>
        <h3>Customer Experience Objectives</h3>
        <div className="form-row">
        <label>The company objective as it relates to the use of customer experience capabilities is best described as follows:</label>
        <select value={cxObjectives} onChange={(e) => setCxObjectives(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Starting">Get customer experience feedback to improve our operations</option>
          <option value="Developing">Use customer experience feedback to improve one or more functional areas</option>
          <option value="Managing">Use customer experience feedback to improve distinctive capability</option>
          <option value="Optimizing">Build broad customer experience capability for differentiation</option>
          <option value="Pioneering">Customer experience master competing with CX as a differentiator</option>
        </select>
      </div>
      <h3>Metrics Measures and Value</h3>
        <div className="form-row">
        <label>The use of data analytics at your company are best described as follows:</label>
        <select value={metricsMeasures} onChange={(e) => setMetricsMeasures(e.target.value)} required>
          <option value="" disabled>Select an option</option>
          <option value="Starting">None</option>
          <option value="Developing">ROI of individual application</option>
          <option value="Managing">Future performance and market value</option>
          <option value="Optimizing">Analytics are an important driver of performance and value</option>
          <option value="Pioneering">Analytics are the primary driver of performance and value</option>
        </select>
      </div>
      <h3>SWOT Analysis!</h3>
      <div className="form-row">
        <label>List your company's top 3 strengths in data analytics:</label>
        <input type="text" placeholder="Strength #1" value={strengthOne} onChange={(e) => setStrengthOne(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Strength #2" value={strengthTwo} onChange={(e) => setStrengthTwo(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Strength #3" value={strengthThree} onChange={(e) => setStrengthThree(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>List your company's top 3 weaknesses in data analytics:</label>
        <input type="text" placeholder="Weakness #1" value={weaknessOne} onChange={(e) => setWeaknessOne(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Weakness #2" value={weaknessTwo} onChange={(e) => setWeaknessTwo(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Weakness #3" value={weaknessThree} onChange={(e) => setWeaknessThree(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>List your company's top 3 opportunities in data analytics:</label>
        <input type="text" placeholder="Opportunity #1" value={opportunityOne} onChange={(e) => setOpportunityOne(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Opportunity #2" value={opportunityTwo} onChange={(e) => setOpportunityTwo(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Opportunity #3" value={opportunityThree} onChange={(e) => setOpportunityThree(e.target.value)} className="form-input" required />
      </div>
      <div className="form-row">
        <label>List your company's top 3 threats in data analytics:</label>
        <input type="text" placeholder="Threat #1" value={threatOne} onChange={(e) => setThreatOne(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Threat #2" value={threatTwo} onChange={(e) => setThreatTwo(e.target.value)} className="form-input" required />
        <input type="text" placeholder="Threat #3" value={threatThree} onChange={(e) => setThreatThree(e.target.value)} className="form-input" required />
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
  )}
</div>
    );
};

export default CX;
