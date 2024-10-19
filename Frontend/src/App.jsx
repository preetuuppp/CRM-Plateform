import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddContact from './components/AddContactForm';
import Companies from './components/CompanyList';
import TicketList from './components/TicketList';
import Contacts from './components/ContactList';
import { ContactProvider } from './context/ContactContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
   <Router>
      <ContactProvider>
      <div className="bg-gray-100 min-h-screen">
      <Navbar/>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<AddContact />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/tickets" element={<TicketList />} />
          </Routes>
        </div>
      </div>
      </ContactProvider>

    </Router>
  );
};

export default App;