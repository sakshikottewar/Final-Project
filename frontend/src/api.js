const API_BASE = "https://final-project-kohl-eight.vercel.app/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `Request failed: ${response.status}`
    );
  }

  return data;
}

export const getDashboard = () => request("/dashboard");

export const getFacilities = () => request("/facilities");

export const createFacility = (data) =>
  request("/facilities", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const getInspections = () => request("/inspections");

export const createInspection = (data) =>
  request("/inspections", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const getComplaints = () => request("/complaints");

export const createComplaint = (data) =>
  request("/complaints", {
    method: "POST",
    body: JSON.stringify(data)
  });