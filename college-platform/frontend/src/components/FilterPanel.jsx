import { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
  const [location, setLocation] = useState('');
  const [maxFees, setMaxFees] = useState('');

  const handleApply = () => {
    onFilterChange({ location, maxFees });
  };

  const handleClear = () => {
    setLocation('');
    setMaxFees('');
    onFilterChange({ location: '', maxFees: '' });
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4 sticky top-24">
      <h3 className="font-bold text-gray-900 text-lg border-b pb-2">Filters</h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="e.g. New York"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Max Fees ($)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="e.g. 50000"
          value={maxFees}
          onChange={(e) => setMaxFees(e.target.value)}
        />
      </div>

      <div className="pt-4 flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
