import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function ComplaintPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    facility_id: "",
    reported_by: "",
    title: "",
    description: "",
    priority: "Medium"
  });

  const loadComplaints = async () => {
    try {
      const res = await fetch(`${API}/complaints`);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load complaints");
      }

      setComplaints(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD COMPLAINTS ERROR:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.facility_id) {
      alert("Please enter Facility ID");
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter Complaint Title");
      return;
    }

    setLoading(true);

    try {
      const complaintData = {
        facility_id: Number(form.facility_id),
        reported_by: form.reported_by
          ? Number(form.reported_by)
          : null,
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority
      };

      console.log("SENDING COMPLAINT:", complaintData);

      const res = await fetch(`${API}/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(complaintData)
      });

      const data = await res.json();

      console.log("COMPLAINT RESPONSE:", data);

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create complaint"
        );
      }

      alert("Complaint created successfully!");

      setForm({
        facility_id: "",
        reported_by: "",
        title: "",
        description: "",
        priority: "Medium"
      });

      await loadComplaints();

    } catch (error) {
      console.error("CREATE COMPLAINT ERROR:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Complaints</h1>

      <div className="card">
        <h2>Register Complaint</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            placeholder="Facility ID"
            value={form.facility_id}
            onChange={(e) =>
              setForm({
                ...form,
                facility_id: e.target.value
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Reported By (User ID)"
            value={form.reported_by}
            onChange={(e) =>
              setForm({
                ...form,
                reported_by: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Complaint Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value
              })
            }
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
          />

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value
              })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

        </form>
      </div>

      <div className="card">
        <h2>Complaint History</h2>

        <table>
          <thead>
            <tr>
              <th>Facility</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length > 0 ? (
              complaints.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.facility_name || item.facility_id}
                  </td>

                  <td>{item.title}</td>

                  <td>{item.description}</td>

                  <td>{item.priority}</td>

                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}