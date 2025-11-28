// src/components/sections/activityTimeline.js

const API_BASE = "http://localhost:5000/api/activity";

export async function fetchActivity() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error(`Failed to fetch activity (status ${res.status})`);
  }
  return res.json();
}

export async function createActivity(payload) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create activity");
  }
  return res.json();
}

export async function updateActivity(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to update activity");
  }
  return res.json();
}

export async function deleteActivity(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete activity");
  }
  return res.json();
}
