import { Check, X } from 'lucide-react';

const ComparisonTable = ({ colleges }) => {
  if (!colleges || colleges.length === 0) {
    return <div className="text-center py-10 text-gray-500">No colleges selected for comparison.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 border-b border-r font-bold text-gray-700 w-1/4">Features</th>
            {colleges.map((college) => (
              <th key={college._id} className="p-4 border-b text-center font-bold text-primary-700 w-1/4">
                {college.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border-b border-r font-medium text-gray-600 bg-gray-50">Location</td>
            {colleges.map((college) => (
              <td key={college._id} className="p-4 border-b text-center text-gray-800">{college.location}</td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-r font-medium text-gray-600 bg-gray-50">Fees (per year)</td>
            {colleges.map((college) => (
              <td key={college._id} className="p-4 border-b text-center text-gray-800 font-semibold">
                ${college.fees.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-r font-medium text-gray-600 bg-gray-50">Rating</td>
            {colleges.map((college) => (
              <td key={college._id} className="p-4 border-b text-center text-gray-800">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">{college.rating} / 5</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-r font-medium text-gray-600 bg-gray-50">Placement %</td>
            {colleges.map((college) => (
              <td key={college._id} className="p-4 border-b text-center text-gray-800">
                {college.placementPercentage}%
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-r font-medium text-gray-600 bg-gray-50">Top Courses</td>
            {colleges.map((college) => (
              <td key={college._id} className="p-4 border-b text-center text-gray-800 text-sm">
                <div className="flex flex-wrap gap-1 justify-center">
                  {college.courses.slice(0, 3).map((course, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">{course}</span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
