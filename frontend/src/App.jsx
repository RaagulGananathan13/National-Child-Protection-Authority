// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LogMainComplaintPage from './pages/LogMainComplaintPage'; // Import the new complaint page
import AddVictimForm from "./pages/LogComplaint/AddVictimForm";
import AddParentGuardianForm from "./pages/LogComplaint/AddParentGuardianForm";
import AddSuspectForm from "./pages/LogComplaint/AddSuspectForm";
import AddSuspectVictimRelationshipForm from "./pages/LogComplaint/AddSuspectVictimRelationshipForm";
import LawEnforcementPage from "./pages/LawEnforcementPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import UpdateSubTaskPage from "./pages/UpdateSubTaskPage";
import LogPoliceCase from "./pages/LogPoliceCase";
import LogVideoCase from "./pages/logVideoCase";
import VulnerableChildCases from "./pages/VulnerableChildCases";

import DataConfigurations from "./pages/DataConfigurations";
import FirstSquareDashboard from "./pages/DataConfigurations/firstSquare/FirstSquareDashboard";
import Districts from "./pages/DataConfigurations/firstSquare/districts";
import DivisionalSecretariats from "./pages/DataConfigurations/firstSquare/divisionalSecretariats";
import GNDivisions from "./pages/DataConfigurations/firstSquare/gnDivisions";
import PoliceDivisions from "./pages/DataConfigurations/firstSquare/policeDivisions";
import SecondSquareDashboard from "./pages/DataConfigurations/secondSquare/SecondSquareDashboard";
import Schools from "./pages/DataConfigurations/secondSquare/Schools";
import SchoolTypes from "./pages/DataConfigurations/secondSquare/SchoolTypes";
import EducationZones from "./pages/DataConfigurations/secondSquare/EducationZones";
import ProvincialEducationDepartments from "./pages/DataConfigurations/secondSquare/ProvincialEducationDepartments";
import ThirdSquareDashboard from "./pages/DataConfigurations/thirdSquare/ThirdSquareDashboard";
import BasicOffenceTypes from "./pages/DataConfigurations/thirdSquare/BasicOffenceTypes";
import MainOffenceTypes from "./pages/DataConfigurations/thirdSquare/MainOffenceTypes";
import VulnerabilitiesConfigurePage from "./pages/DataConfigurations/forthSquare/VulnerabilitiesConfigurePage";
import SixthSquareDashboard from "./pages/DataConfigurations/sixthSquare/SixthSquareDashboard";
import Courts from "./pages/DataConfigurations/sixthSquare/Courts";
import Divisions from "./pages/DataConfigurations/sixthSquare/Divisions";
import PoliceStations from "./pages/DataConfigurations/sixthSquare/PoliceStations"
import RegionalOffices from "./pages/DataConfigurations/sixthSquare/RegionalOffices";
import Designations from "./pages/DataConfigurations/seventhSquare/Designations";
import MediumsOfComplaints from "./pages/DataConfigurations/eighthSquare/MediumsOfComplaints";




function App() {
  return (
    <Router>
      {/* Only render Navbar if not on the LoginPage */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/log-main-complaint" element={<LogMainComplaintPage />} />
        <Route path="/add-victim" element={<AddVictimForm />} />
        <Route path="/add-parent-guardian" element={<AddParentGuardianForm />} />
        <Route path="/add-suspect-form" element={<AddSuspectForm />} />
        <Route path="/add-suspect-victimrelationshipform" element={<AddSuspectVictimRelationshipForm />} />

        <Route path="/first-square-dashboard" element={<FirstSquareDashboard />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/divisional-secretariats" element={<DivisionalSecretariats />} />
        <Route path="/gn-divisions" element={<GNDivisions />} />
        <Route path="/police-divisions" element={<PoliceDivisions />} />

        <Route path="/second-square-dashboard" element={<SecondSquareDashboard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/school-types" element={<SchoolTypes />} />
        <Route path="/education-zones" element={<EducationZones />} />
        <Route path="/provincial-education-departments" element={<ProvincialEducationDepartments />} />

        <Route path="/third-square-dashboard" element={<ThirdSquareDashboard />} />
        <Route path="/basic-offence-types" element={<BasicOffenceTypes />} />
        <Route path="/main-offence-types" element={<MainOffenceTypes />} />

        <Route path="/forth-square-dashboard" element={<VulnerabilitiesConfigurePage />} />

        <Route path="/sixth-square-dashboard" element={<SixthSquareDashboard />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/head-office-sections" element={<Divisions />} />
        <Route path="/police-stations" element={<PoliceStations />} />
        <Route path="/regional-offices" element={<RegionalOffices />} />

        <Route path="/seventh-square-dashboard" element={<Designations />} />

        <Route path="/eighth-square-dashboard" element={<MediumsOfComplaints />} />

        <Route path="/law-enforcement" element={<LawEnforcementPage />} />
        <Route path="/update-task" element={<UpdateTaskPage />} />
        <Route path="/update-subtask" element={<UpdateSubTaskPage />} />
        <Route path="/log-police-case" element={<LogPoliceCase />} />
        <Route path="/log-video-case" element={<LogVideoCase />} />
        <Route path="/vulnerable-child-case" element={<VulnerableChildCases />} />
        <Route path="/data-configurations" element={<DataConfigurations />} />
       



        <Route path="/*" element={<><Navbar /><Dashboard /></>} /> {/* Include Navbar and Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;