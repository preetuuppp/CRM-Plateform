import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ContactContext } from '../context/ContactContext';

const AddContact = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const { setContacts } = useContext(ContactContext); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/contacts', formData)
      .then(response => {
        setContacts(prevData => [response.data, ...prevData]); 
        setFormData({ email: '', phone: '' });
        setSuccessMessage("Contact added successfully!");
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      <div className="flex justify-center items-center min-h-screen"> 
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md"> 
          <h2 className="text-xl font-bold mb-4 text-center">Add New Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-bold">Email:</label>
              <input 
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-bold">Phone:</label>
              <input 
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add Contact</button>
          </form>
          {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default AddContact;
