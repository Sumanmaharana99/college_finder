import { useState, useEffect } from 'react';
import { getColleges } from '../services/api';
import CollegeCard from '../components/CollegeCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Query state
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState({ location: '', maxFees: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const data = await getColleges({ keyword, ...filters, page });
      // If it's page 1, replace array, otherwise append (for infinite scroll / pagination simulation)
      if (page === 1) {
        setColleges(data.colleges);
      } else {
        setColleges((prev) => [...prev, ...data.colleges]);
      }
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch colleges');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [keyword, filters, page]);

  const handleSearch = (term) => {
    setKeyword(term);
    setPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 bg-white rounded-3xl shadow-sm border border-gray-100 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Discover Your <span className="text-primary-600">Dream College</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore top colleges, compare fees, check placements, and make the best choice for your future.
        </p>
        <div className="mt-8">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-64 animate-pulse">
                  <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500 text-lg">No colleges found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college._id} college={college} />
                ))}
              </div>
              
              {page < totalPages && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-white border-2 border-primary-600 text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
