import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function InspectionPage() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    facility_id: "",
    inspector_id: "",
    inspection_date: "",
    score: "",
    status: "Completed",
    notes: ""
  });

  const loadInspections = async () => {
    try {
      const res = await fetch(`${API}/inspections`);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to load inspections"
        );
      }

      setInspections(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("LOAD INSPECTIONS ERROR:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    loadInspections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.facility_id) {
      alert("Please enter Facility ID");
      return;
    }

    if (!form.inspection_date) {
      alert("Please select inspection date");
      return;
    }

    if (form.score === "") {
      alert("Please enter score");
      return;
    }

    setLoading(true);

    try {
      const inspectionData = {
        facility_id: Number(form.facility_id),

        inspector_id: form.inspector_id
          ? Number(form.inspector_id)
          : null,

        inspection_date: form.inspection_date,

        score: Number(form.score),

        status: form.status,

        notes: form.notes.trim()
      };

      console.log(
        "SENDING INSPECTION:",
        inspectionData
      );

      const res = await fetch(`${API}/inspections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inspectionData)
      });

      const data = await res.json();

      console.log(
        "INSPECTION RESPONSE:",
        data
      );

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create inspection"
        );
      }

      alert("Inspection created successfully!");

      setForm({
        facility_id: "",
        inspector_id: "",
        inspection_date: "",
        score: "",
        status: "Completed",
        notes: ""
      });

      await loadInspections();

    } catch (error) {
      console.error(
        "CREATE INSPECTION ERROR:",
        error
      );

      alert("Error: " + error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">

      <h1>Inspections</h1>

      <div className="card">

        <h2>Add Inspection</h2>

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
            placeholder="Inspector ID"
            value={form.inspector_id}
            onChange={(e) =>
              setForm({
                ...form,
                inspector_id: e.target.value
              })
            }
          />

          <input
            type="date"
            value={form.inspection_date}
            onChange={(e) =>
              setForm({
                ...form,
                inspection_date: e.target.value
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Score"
            min="0"
            max="100"
            value={form.score}
            onChange={(e) =>
              setForm({
                ...form,
                score: e.target.value
              })
            }
            required
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value
              })
            }
          >
            <option value="Completed">
              Completed
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Failed">
              Failed
            </option>
          </select>

          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Adding..."
              : "Add Inspection"}
          </button>

        </form>

      </div>

      <div className="card">

        <h2>Inspection History</h2>

        <table>

          <thead>
            <tr>
              <th>Facility</th>
              <th>Date</th>
              <th>Score</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>

            {inspections.length > 0 ? (

              inspections.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.facility_name ||
                      item.facility_id}
                  </td>

                  <td>
                    {item.inspection_date}
                  </td>

                  <td>
                    {item.score}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {item.notes}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="5">
                  No inspections found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}