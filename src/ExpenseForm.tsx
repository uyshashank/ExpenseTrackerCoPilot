import React, { useState, useEffect } from 'react';
import { getCategories, addExpense } from './api';

interface ExpenseFormProps {
  token: string;
  onExpenseAdded: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ token, onExpenseAdded }) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!category) {
      setError('Please select a category');
      return;
    }
    try {
      const res = await addExpense(token, amount, category, description);
      if (res.message === 'Expense added') {
        setAmount(0);
        setCategory('');
        setDescription('');
        onExpenseAdded();
      } else {
        setError(res.message || 'Failed to add expense');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        required
      />
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Expense</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ExpenseForm;
