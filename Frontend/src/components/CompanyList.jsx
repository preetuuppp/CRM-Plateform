import  { useEffect, useState } from 'react';
import axios from 'axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://bcd-cwfk.onrender.com/companies');
      setCompanies(response.data.results);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Companies</h2>
      <ul className="space-y-3">
        {companies.map(company => (
          <li key={company.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
            <span>{company.properties.name}</span>
            <span>{company.properties.domain}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Companies;
