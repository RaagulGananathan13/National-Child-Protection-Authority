import React from 'react';
import Navbar from '../components/Navbar';
import VideoEvidenceCaseType from './LogVideoCase/videoEvidenceCaseType';
import OriginOfTheComplaint from './LogVideoCase/OriginOfTheComplaint';
import DetailsOfTheVictim from './LogVideoCase/DetailsOfTheVictim';
import DetailsOfTheVictimsParentGuardian from './LogVideoCase/DetailsOfTheVictimsParentGuardian';
import DetailsOfComplaint from './LogVideoCase/DetailsOfTheComplaint';
import VideoEvidenceRecordingDetails from './LogVideoCase/VideoEvidenceRecordingDetails';
import EvidenceReleaseDetails from './LogVideoCase/EvidenceReleaseDetails';





const LogVideoCase = () => {
  return (
    <div
      className="bg-gray-100 min-h-screen p-6"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      
      {/* Navbar fixed at the top */}
      <div className="fixed w-full top-0 left-0 z-50">
        <Navbar />
      </div>

      <div className="bg-white p-6 rounded-md shadow-lg max-w-3xl mx-auto mt-12 mb-8 flex justify-center items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Video Evidence Handling Sub Database
        </h2>
      </div>

      <div className="max-w-3xl mx-auto ">
        <VideoEvidenceCaseType />
        <OriginOfTheComplaint />
        <DetailsOfTheVictim /> 
        <DetailsOfTheVictimsParentGuardian />
        <DetailsOfComplaint />
        <VideoEvidenceRecordingDetails />
        <EvidenceReleaseDetails />

      </div>
    </div>
  );
};

export default LogVideoCase;
