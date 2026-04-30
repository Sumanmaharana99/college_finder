import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSavedColleges } from '../services/api';
import CollegeCard from '../components/CollegeCard';

const Saved = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchSaved = async () => {
      if (!userInfo) {
        setLoading(false);
        return;
      }

      try {
        const data = await getSavedColleges();
        setColleges(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load saved colleges');
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Saved Colleges</h1>
        <p className="text-gray-600 mb-6">You need to be logged in to view your saved colleges.</p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-full shadow-sm hover:bg-primary-700 transition-colors"
        >
          Login to continue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in py-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-gray-900">Saved Colleges</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here are the colleges you have saved. Click on a college to view more details.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Loading saved colleges...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center">{error}</div>
      ) : colleges.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-gray-100 text-center">
          <p className="text-gray-500 text-lg">You have not saved any colleges yet.</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-full shadow-sm hover:bg-primary-700 transition-colors"
          >
            Explore colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <CollegeCard key={college._id} college={college} showSaveButton={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
