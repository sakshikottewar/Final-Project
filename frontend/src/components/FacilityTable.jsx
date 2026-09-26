import React, { useState } from 'react';

export default function FacilityTable({ facilities }) {
  const [search, setSearch] = useState('');
  const filtered = facilities.filter(f =>
    `${f.name} ${f.location} ${f.facility_type}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input className="search" placeholder="Search facilities..." value={search} onChange={e=>setSearch(e.target.value)} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Status</th><th>Department</th></tr></thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id}><td>{f.name}</td><td>{f.location}</td><td>{f.facility_type}</td><td><span className="badge">{f.status}</span></td><td>{f.department_name || '—'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
