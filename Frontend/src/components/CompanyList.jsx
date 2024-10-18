import { useEffect, useState } from 'react';
import axios from 'axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://backenddeploy-nmt5.onrender.com/companies');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {companies.map(company => (
          <div key={company.id} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="font-semibold text-gray-800">{company.properties.domain}</h3>
            <p className="text-gray-600">{company.properties.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
