import { useState, useEffect } from 'react';
import { getColleges, compareColleges } from '../services/api';
import ComparisonTable from '../components/ComparisonTable';
import { Search, X } from 'lucide-react';

const Compare = () => {
  const [allColleges, setAllColleges] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch a list of colleges for the dropdown/selection
    const fetchAll = async () => {
      try {
        const data = await getColleges({ limit: 50 }); // Fetch top 50 for selection
        setAllColleges(data.colleges);
      } catch (error) {
        console.error('Failed to fetch colleges for comparison');
      }
    };
    fetchAll();
  }, []);

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 3) {
      alert('You can compare up to 3 colleges at a time.');
      return;
    }
    setSelectedIds([...selectedIds, id]);
    setSearch('');
  };

  const handleRemove = (id) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    setComparisonData(comparisonData.filter(college => college._id !== id));
  };

  useEffect(() => {
    const fetchComparison = async () => {
      if (selectedIds.length === 0) {
        setComparisonData([]);
        return;
      }
      try {
        const data = await compareColleges(selectedIds);
        setComparisonData(data);
      } catch (error) {
        console.error('Failed to fetch comparison data');
      }
    };
    fetchComparison();
  }, [selectedIds]);

  const filteredColleges = allColleges.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) && !selectedIds.includes(c._id)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Compare Colleges</h1>
        <p className="text-lg text-gray-600">Select up to 3 colleges to compare their features side-by-side.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
            placeholder="Search and add a college to compare..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          {search && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <div
                    key={college._id}
                    onClick={() => handleSelect(college._id)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                  >
                    <div className="font-semibold text-gray-900">{college.name}</div>
                    <div className="text-sm text-gray-500">{college.location}</div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-center">No colleges found</div>
              )}
            </div>
          )}
        </div>

        {/* Selected Badges */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {comparisonData.map(college => (
              <div key={college._id} className="bg-primary-50 border border-primary-200 text-primary-800 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                {college.name}
                <button onClick={() => handleRemove(college._id)} className="hover:text-primary-900 bg-primary-100 rounded-full p-1">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIds.length > 0 ? (
        <ComparisonTable colleges={comparisonData} />
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">Search and select colleges above to start comparing.</p>
        </div>
      )}
    </div>
  );
};

export default Compare;
