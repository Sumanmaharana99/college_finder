import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollegeById, saveCollege } from '../services/api';
import { MapPin, DollarSign, Star, Briefcase, BookOpen, BookmarkPlus } from 'lucide-react';

const CollegeDetail = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await getCollegeById(id);
        setCollege(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch college details');
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  const handleSave = async () => {
    if (!userInfo) return alert('Please login to save colleges');
    try {
      await saveCollege(id);
      alert('College saved successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving college');
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading details...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!college) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-64 bg-gradient-to-r from-primary-600 to-primary-800 relative">
          <button 
            onClick={handleSave}
            className="absolute top-6 right-6 bg-white text-primary-600 px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-md"
          >
            <BookmarkPlus size={20} /> Save
          </button>
        </div>
        <div className="p-8 relative -mt-16 mx-8 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{college.name}</h1>
              <p className="text-lg text-gray-600 flex items-center gap-2">
                <MapPin className="text-primary-500" /> {college.location}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-yellow-200">
                <Star className="fill-current" /> {college.rating} / 5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="text-primary-500" /> Overview
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{college.description}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses Offered</h2>
            <div className="flex flex-wrap gap-3">
              {college.courses.map((course, idx) => (
                <span key={idx} className="bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg font-medium">
                  {course}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl border border-primary-200 shadow-sm">
            <h3 className="text-xl font-bold text-primary-900 mb-6">Key Statistics</h3>
            <div className="space-y-6">
              <div>
                <p className="text-primary-700 text-sm font-semibold uppercase tracking-wider mb-1">Annual Fees</p>
                <p className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <DollarSign size={28} className="text-primary-500" />
                  {college.fees.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-primary-700 text-sm font-semibold uppercase tracking-wider mb-1">Placement Rate</p>
                <p className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                  <Briefcase size={28} className="text-primary-500" />
                  {college.placementPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
