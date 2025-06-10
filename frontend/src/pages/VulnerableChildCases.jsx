import React from 'react';
import Navbar from '../components/Navbar';
import BasicInformation from './VulnerableChildCases/BasicInformation'; // New import
import DetailsOfTheChild from './VulnerableChildCases/DetailsOfTheChild';
import DetailsOfTheChildParentGuardian from './VulnerableChildCases/DetailsOfTheChildParentGuardian';
import DetailsOfTheChildSiblings from './VulnerableChildCases/DetailsOfTheChildSiblings';
import DetailsOfTheVulnerability from './VulnerableChildCases/DetailsOfTheVulnerability';
import TheActionTaken from './VulnerableChildCases/TheActionTaken';


const VulnerableChildCases = () => {
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

      {/* White container for <h2> */}
      <div className="bg-white p-6 rounded-md shadow-lg max-w-3xl mx-auto mt-12 mb-8 flex justify-center items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Vulnerable Children Database
        </h2>
      </div>

      {/* Basic Information */}
      <div className="max-w-3xl mx-auto">
        <BasicInformation /> 
      </div>

      {/* Details of the Child */}
      <div className="max-w-3xl mx-auto">
        <DetailsOfTheChild /> 
      </div>

      {/* Details of the Child's Parent */}
      <div className="max-w-3xl mx-auto">
        <DetailsOfTheChildParentGuardian /> 
      </div>

      {/* Details of the Child's Brother/Sister */}
      <div className="max-w-3xl mx-auto">
        <DetailsOfTheChildSiblings /> 
      </div>

      {/* Details of the Vulnerability */}
      <div className="max-w-3xl mx-auto">
        <DetailsOfTheVulnerability /> 
      </div>

      {/* The Action Taken */}
      <div className="max-w-3xl mx-auto">
        <TheActionTaken /> 
      </div>

    </div>
  );
};

export default VulnerableChildCases;
