import { Link, useNavigate } from 'react-router-dom';
import { School, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary-600">
          <School size={28} />
          <span className="text-xl font-bold">CollegeFinder</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/compare" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Compare</Link>
          <Link to="/saved" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Saved</Link>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-medium flex items-center gap-2">
                <User size={18} /> {userInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                title="Logout"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
              <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
