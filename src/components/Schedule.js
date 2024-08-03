import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'github_dashboard';
const DB_VERSION = 1;

async function getSchedules() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('schedules');
}

async function saveSchedule(schedule) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.put('schedules', schedule, schedule.id);
}

async function deleteSchedule(id) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.delete('schedules', id);
}

function Schedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function fetchSchedules() {
      const scheduleList = await getSchedules();
      setSchedules(scheduleList);
    }
    fetchSchedules();
  }, []);

  const handleAdd = () => {
    const time = prompt('Enter schedule time (HH:MM):');
    const id = Date.now().toString();
    saveSchedule({ id, time }).then(() => {
      setSchedules([...schedules, { id, time }]);
    });
  };

  const handleDelete = (id) => {
    deleteSchedule(id).then(() => {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    });
  };

  return (
    <div>
      <h2>Schedules</h2>
      <button onClick={handleAdd}>Add Schedule</button>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            {schedule.time}
            <button onClick={() => handleDelete(schedule.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
