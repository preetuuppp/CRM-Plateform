import { useEffect, useState } from 'react';
import axios from 'axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; 
   const totalCompanies = 500; 
  

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/companies');
      setCompanies(response.data.results);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []); 

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Companies</h2>
      {companies && companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {companies.map(company => (
            <div key={company.id} className="p-4 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="font-semibold text-gray-800">Name: {company.properties.name}</h3>
              <p className="text-gray-600">Domain: {company.properties.domain}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-3xl font-bold mb-4 text-center">No Companies Found</p>
      )}
      
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Prev
        </button>
        <span className='mt-2'> {currentPage} </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalCompanies / itemsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Companies;
