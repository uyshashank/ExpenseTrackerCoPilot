import './App.css';
import React, { useState } from 'react';
import Auth from './Auth';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  if (!token) {
    return <Auth onAuth={setToken} />;
  }

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <button onClick={() => setToken(null)}>Logout</button>
      <ExpenseForm token={token} onExpenseAdded={() => setRefresh(r => !r)} />
      <ExpenseList token={token} key={refresh ? 'refresh' : 'no-refresh'} />
    </div>
  );
};

export default App;
