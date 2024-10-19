import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ContactContext } from '../context/ContactContext';

const Contacts = () => {
  const { contacts, setContacts } = useContext(ContactContext);
  const [currentPage, setCurrentPage] = useState(1); 
  const contactsPerPage = 100;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/contacts');
        const fetchedContacts = response.data.results;
        
        if (fetchedContacts) {
          const uniqueContacts = fetchedContacts.filter(e => 
            !contacts.some(existingContact => existingContact.id === e.id) 
          );
          setContacts(prevContacts => [...prevContacts, ...uniqueContacts]); 
        } else {
          console.error('Not fetching data');
        }
      } catch (error) {
        console.error('Error :', error);
      }
    };

    fetchContacts();
  }, []); 

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const totalPages = Math.ceil(contacts.length / contactsPerPage); 

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contacts</h2>

      {currentContacts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentContacts.map((contact, index) => (
            <div key={index} className="border p-4 rounded shadow-lg bg-white">
              <h3 className="font-semibold text-gray-800">
                Email: {contact.properties.email}
              </h3>
              <h3 className="text-gray-600">
                Phone: {contact.properties.phone}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-3xl font-bold mb-4 text-center">No Contacts Found</p>
      )}

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          Prev
        </button>
        <span className="mt-2">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Contacts;