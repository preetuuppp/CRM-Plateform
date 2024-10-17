// src/components/TicketsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://api.hubapi.com/crm/v3/objects/tickets', {
          headers: {
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          },
          params: {
            limit: 100,
            properties: 'pipeline,stage',
          },
        });
        setTickets(response.data.results);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="p-4 border rounded shadow">
            <p>Pipeline: {ticket.properties.pipeline}</p>
            <p>Stage: {ticket.properties.stage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsList;
