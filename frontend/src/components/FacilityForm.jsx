import React, { useState } from 'react';

export default function FacilityForm({ onSubmit }) {
  const [form, setForm] = useState({ name:'', location:'', facility_type:'', status:'Active' });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.location || !form.facility_type) {
      setMessage('Please fill all required fields.');
      return;
    }
    try {
      await onSubmit(form);
      setForm({ name:'', location:'', facility_type:'', status:'Active' });
      setMessage('Facility added successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <label>Facility Name *<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
      <label>Location *<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label>
      <label>Type *<input value={form.facility_type} onChange={e=>setForm({...form,facility_type:e.target.value})}/></label>
      <label>Status
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>Active</option><option>Maintenance</option><option>Inactive</option>
        </select>
      </label>
      <button type="submit">Add Facility</button>
      {message && <small className="form-message">{message}</small>}
    </form>
  );
}
