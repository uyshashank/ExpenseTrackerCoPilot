// API utility for authentication and expenses
export const API_URL = 'https://expensetrackercopilot.onrender.com';

export async function register(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/expenses/categories`);
  return res.json();
}

export async function addExpense(token: string, amount: number, category: string, description: string) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount, category, description })
  });
  return res.json();
}

export async function getExpenses(token: string) {
  const res = await fetch(`${API_URL}/expenses`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}
