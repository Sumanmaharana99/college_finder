import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Star, BookmarkPlus } from 'lucide-react';
import { saveCollege } from '../services/api';
import { useState } from 'react';

const CollegeCard = ({ college, showSaveButton = true }) => {
  const [isSaving, setIsSaving] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userInfo) return alert('Please login to save colleges');
    
    setIsSaving(true);
    try {
      await saveCollege(college._id);
      alert('College saved successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving college');
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-700 relative">
        {/* Placeholder for college image */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold text-gray-800 flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-current" /> {college.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{college.name}</h3>
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" /> {college.location}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-400" /> ${college.fees.toLocaleString()} / year
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/college/${college._id}`}
            className="text-primary-600 font-medium hover:text-primary-800 transition-colors"
          >
            View Details &rarr;
          </Link>
          {showSaveButton && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-gray-400 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-primary-50"
              title="Save College"
            >
              <BookmarkPlus size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
