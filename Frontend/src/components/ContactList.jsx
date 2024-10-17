import { useState, useEffect } from 'react';
import axios from 'axios';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://bcd-cwfk.onrender.com/contacts');
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
// console.log("contacts",contacts)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Contacts</h2>
      <ul className="space-y-2">
        {currentContacts.map((contact, index) => (
          <li key={index} className="border p-2 rounded">
            {contact.properties.email} 
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage===1}
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
