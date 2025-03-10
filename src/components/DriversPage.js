import React, { useState, useEffect } from 'react';

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', contact: '', vehicle: '', status: 'available' });

  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/drivers');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleInputChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const addDriver = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDriver),
      });
      if (response.ok) {
        setNewDriver({ name: '', contact: '', vehicle: '', status: 'available' });
        fetchDrivers();
      }
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      const response = await fetch(`/api/drivers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchDrivers();
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Drivers</h2>
      <form onSubmit={addDriver}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newDriver.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newDriver.contact}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="vehicle"
          placeholder="Vehicle Details"
          value={newDriver.vehicle}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Driver</button>
      </form>
      <ul>
        {drivers.map(driver => (
          <li key={driver.id}>
            {driver.name} - {driver.contact} - {driver.vehicle} - {driver.status}
            <button onClick={() => deleteDriver(driver.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriversPage;
