import React, { useEffect, useState } from 'react';
import { getExpenses } from './api';

interface ExpenseListProps {
  token: string;
}

interface Expense {
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ token }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getExpenses(token).then(setExpenses);
  }, [token]);

  return (
    <div className="expense-list">
      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((e, i) => (
          <li key={i}>
            <strong>{e.category}</strong>: ${e.amount} - {e.description} <em>({new Date(e.date).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
