const API_BASE = "http://localhost:5000/api";

async function request(path, options = {}) {

  const response = await fetch(
    `${API_BASE}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    }
  );

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {
      message: text
    };
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed: ${response.status}`
    );
  }

  return data;
}


// Dashboard
export const getDashboard = () =>
  request("/dashboard");


// Facilities
export const getFacilities = () =>
  request("/facilities");

export const createFacility = (facility) =>
  request("/facilities", {
    method: "POST",
    body: JSON.stringify(facility)
  });


// Complaints
export const getComplaints = () =>
  request("/complaints");

export const createComplaint = (complaint) =>
  request("/complaints", {
    method: "POST",
    body: JSON.stringify(complaint)
  });


// Inspections
export const getInspections = () =>
  request("/inspections");

export const createInspection = (inspection) =>
  request("/inspections", {
    method: "POST",
    body: JSON.stringify(inspection)
  });