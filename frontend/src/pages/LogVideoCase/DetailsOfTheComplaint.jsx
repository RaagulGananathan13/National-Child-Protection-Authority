import React, { useState } from 'react';

const DetailsOfTheComplaint = () => {
  const [mainSubCategory, setMainSubCategory] = useState('');

  const handleChange = (e) => {
    setMainSubCategory(e.target.value);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Details of the Complaint</h2>

      <div className="mb-4">
        {/* Main Sub Category */}
        <div className="flex flex-col">
          <label htmlFor="mainSubCategory" className="text-sm font-semibold text-gray-700 mb-2">Main Sub Category (*)</label>
          <select
            name="mainSubCategory"
            value={mainSubCategory}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Nothing selected</option>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
            <option value="Category3">Category 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DetailsOfTheComplaint;
