import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddContact from './components/AddContactForm';
import Contacts from './components/ContactList';
import Companies from './components/CompanyList';

const App = () => {
  return (
   <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex justify-center space-x-8">
            <li><Link to="/" className="hover:underline">Add Contact</Link></li>
            <li><Link to="/contacts" className="hover:underline">Contacts</Link></li>
            <li><Link to="/companies" className="hover:underline">Companies</Link></li>
          </ul>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<AddContact />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;