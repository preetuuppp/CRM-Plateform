import { useState, useEffect } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://backenddeploy-nmt5.onrender.com/contacts');
        setContacts(response.data.results);  
      } catch (error) {
        console.error("Error fetching contacts", error);
      }
    };
    fetchContacts();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentContacts = Array.isArray(contacts) ? contacts.slice(firstIndex, lastIndex) : [];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contacts</h2>
      {currentContacts&& currentContacts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentContacts.map((contact, index) => (
          <div key={index} className="border p-4 rounded shadow-lg bg-white">
            <h3 className="font-semibold  text-gray-800">
              Email: {contact.properties.email}
            </h3>
            <h3 className="text-gray-600">
              Phone: {contact.properties.phone}
            </h3>
          </div>
        ))}
      </div>
) :  (
  <p className="text-3xl font-bold mb-4 text-center">No Contacts Found</p>
)}
      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Prev
        </button>
        <span className='mt-2'>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(contacts.length / itemsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Contacts;
