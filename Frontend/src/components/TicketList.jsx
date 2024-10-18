import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
         const response = await axios.get('http://localhost:8080/tickets');

        setTickets(response.data.results);
      } catch (err) {
        console.log('Error fetching tickets.', err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Tickets List</h2>
      {tickets && tickets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-4 bg-gray-100 rounded-lg shadow-lg">
              <p className="font-semibold text-gray-800">
                <strong>Subject:</strong> {ticket.properties.subject}
              </p>
              <p className="text-gray-600">
                <strong>Pipeline:</strong> {ticket.properties.hs_pipeline}
              </p>
              <p className="text-gray-600">
                <strong>Stage:</strong> {ticket.properties.hs_pipeline_stage}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-3xl font-bold mb-4 text-center">No Tickets Found</p>
      )}
    </div>
  );
};

export default TicketList;
