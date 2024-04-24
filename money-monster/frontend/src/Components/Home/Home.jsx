import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import {useNavigate} from "react-router-dom"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Home.css"
import 'reactjs-popup/dist/index.css';

import neutralMonster from '../Assets/neutral.png'
import happyMonster from '../Assets/happy.png';
import angryMonster from '../Assets/angry.png';


export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [budgetValue, setBudgetValue] = useState('-');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Check if state exists and if yes, update the budgetValue and expenses
    if (location.state) {
        setBudgetValue(location.state.budget);
        setExpenses([{ title: 'Previous Expense Total', amount: location.state.totalExpenses }]);
    }
}, [location.state]);

  const triggerTimeAction = (close) => {
    const budget = inputValue;
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('No token found, please log in.');
        navigate('/login');
        return;
    }

    axios.post('http://localhost:8081/api/update-budget', {
        budget: budget
    }, {
        headers: {
            'Authorization': `Bearer ${token}`  // Correctly setting the authorization header
        }
    }).then(response => {
        console.log(response.data.message);
        setBudgetValue(budget); // Update state only on successful API response
        setInputValue('');
        close();
    }).catch(error => {
        console.error('Failed to update budget:', error);
        if (error.response && error.response.status === 401) {
            alert('Session expired or invalid token. Please log in again.');
            navigate('/login');
        }
    });
};

const handleExpenseSubmit = (close) => {
  // Calculate the new total expenses first
  const newExpenseAmountNumber = Number(newExpenseAmount);
  const updatedTotalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0) + newExpenseAmountNumber;

  const token = localStorage.getItem('userToken');
  if (!token) {
      alert('No token found, please log in.');
      navigate('/login');
      return;
  }

  // Posting the updated total expenses instead of just the new expense
  axios.post('http://localhost:8081/api/add-expense', {
      amount: updatedTotalExpenses,  // Send the updated total expenses
  }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).then(response => {
      console.log(response.data.message);
      // Update the expenses array with the new expense entry
      setExpenses(prevExpenses => [...prevExpenses, { title: newExpenseTitle, amount: newExpenseAmountNumber }]);
      setNewExpenseAmount('');
      setNewExpenseTitle('');
      close();
  }).catch(error => {
      console.error('Failed to add expense:', error);
      if (error.response && error.response.status === 401) {
          alert('Session expired or invalid token. Please log in again.');
          navigate('/login');
      }
  });
};


  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Determine which monster image to display
  let monsterImage = neutralMonster;
  if (budgetValue !== '-') {
    if (Number(budgetValue) > totalExpenses) {
      monsterImage = happyMonster;
    } else {
      monsterImage = angryMonster;
    }
  }

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('No token found, please log in.');
        navigate('/login');
        return;
    }

    try {
        const response = await axios.delete('http://localhost:8081/api/delete-account', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            alert('Account deleted successfully!');
            localStorage.removeItem('userToken');
            navigate('/');
        }
    } catch (error) {
        alert('Failed to delete account: ' + (error.response ? error.response.data.error : 'Server error'));
    }
};
const numericBudgetValue = Number(budgetValue);  // Ensure it's treated as a number
let progressBar;
if (totalExpenses > numericBudgetValue) {
  progressBar = "over";
} else {
  progressBar = "less";
}


  return (
    <div className='App-Main'>
      <main>
      <button className='delete-button' onClick={handleDeleteAccount}>Delete Account</button>
      <section className="creature-section">
          <h2>Your Monster</h2>
          <div className="creature-display">
            <img src={monsterImage} alt="Your creature" />
          </div>
        </section>
        <div className='budget-section'>
          <div className='budget-num'>${budgetValue}</div>
        <Popup 
          trigger={<button className='new-budget'>Current Budget</button>}
          modal
          closeOnDocumentClick
          contentStyle={{
            textAlign: 'center',
            padding: "20px",
            width: "150px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
          }}
        >
          {close => (
              <div>
                <input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button className='inside-btn' onClick={() => triggerTimeAction(close)}>Submit</button>
              </div>
            )}
        </Popup>
        <progress className={progressBar} value={totalExpenses} max={budgetValue}></progress>
        <div className="expense-list">
          {expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <strong>{expense.title}</strong>: ${expense.amount}
            </div>
          ))}
          <div className='expense-item'>
            <strong>Total expenses: ${totalExpenses}</strong>
          </div>
        </div>
        <Popup 
          trigger={<button className='new-expense'>+</button>}
          modal
          closeOnDocumentClick
          contentStyle={{
            textAlign: 'center',
            padding: "20px",
            width: "150px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
          }}
        >
          {close => (
              <div>
                <input
                  placeholder="Title"
                  value={newExpenseTitle}
                  onChange={e => setNewExpenseTitle(e.target.value)}
                />
                <input
                  placeholder="Amount"
                  type="number"
                  value={newExpenseAmount}
                  onChange={e => setNewExpenseAmount(e.target.value)}
                />
                <button className='inside-btn' onClick={() => handleExpenseSubmit(close)}>Add Expense</button>
              </div>
            )}
        </Popup>
        </div>
      </main>
    </div>
  )
}

export default Home;
