import React, { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [succesMessage, setSuccesMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/contacts', { email, phone });
      setSuccesMessage("Contact added successfully!");
    } catch (error) {
      setSuccesMessage("Error adding contact.");
    }
    setEmail('')
    setPhone("")
  };

  return (
    <div className="flex justify-center items-center min-h-screen"> 
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md"> 
        <h2 className="text-xl font-bold mb-4 text-center">Add New Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold">Email:</label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Add Contact</button>
        </form>
        {succesMessage && <p className="mt-4 text-green-500 text-center">{succesMessage}</p>}
      </div>
    </div>
  );
};

export default AddContact;
