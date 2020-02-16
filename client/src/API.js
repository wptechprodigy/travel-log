const API_URL = 'http://localhost:1986';

export async function listLogEntry() {
  const response = await fetch(`${API_URL}/api/logs`);

  return response.json();
}
