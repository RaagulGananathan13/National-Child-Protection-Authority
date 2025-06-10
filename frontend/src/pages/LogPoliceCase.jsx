import React from 'react';
import Navbar from '../components/Navbar';
import OriginOfComplaint from './LogPoliceCase/OriginOfComplaint';
import DetailsOfComplaint from './LogPoliceCase/DetailsOfComplaint';
import DetailsOfVictim from './LogPoliceCase/DetailsOfVictim';
import MagistrateCourtReportDetails from './LogPoliceCase/MagistrateCourtReportDetails';
import DetailsOfSuspect from './LogPoliceCase/DetailsOfSuspect';
import InvestigationOfficerDetails from './LogPoliceCase/InvestigationOfficerDetails';
import FurtherInvestigationByPolice from './LogPoliceCase/FurtherInvestigationByPolice'; // Import the new component

const LogPoliceCase = () => {
  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'auto',
      }}
    >
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Main content with padding-top to avoid overlapping with the navbar */}
      <div className="pt-20">  {/* Added padding-top to offset the navbar */}
        {/* Header Section */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6"> {/* Added margin-bottom */}
          <h1 className="text-2xl font-bold mb-4">Police Complaint Database</h1>
        </div>

        {/* Other Sections with a margin-top for spacing */}
        <OriginOfComplaint className="mt-6" /> {/* Added margin-top to the first component */}
        <DetailsOfComplaint />
        <DetailsOfVictim />
        <MagistrateCourtReportDetails />
        <DetailsOfSuspect />
        <InvestigationOfficerDetails />

        {/* Further Investigation by the Police */}
        <FurtherInvestigationByPolice />  {/* Add the new component */}
      </div>
    </div>
  );
};

export default LogPoliceCase;
