import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import "./Home.css"
import 'reactjs-popup/dist/index.css';

import neutralMonster from '../Assets/neutral.png'
import happyMonster from '../Assets/happy.png';
import angryMonster from '../Assets/angry.png';


export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [budgetValue, setBudgetValue] = useState('-');
  const [expenses, setExpenses] = useState([]);

  const triggerTimeAction = (close) => {
    setBudgetValue(inputValue);
    setInputValue('');
    close();
  };

  const handleExpenseSubmit = (close) => {
    setExpenses(prevExpenses => [...prevExpenses, { title: newExpenseTitle, amount: Number(newExpenseAmount) }]);
    setNewExpenseAmount(''); 
    setNewExpenseTitle(''); 
    close();
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

  return (
    <div className='App-Main'>
      <main>
        <button className='delete-button'>Delete</button>
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
        <progress value={totalExpenses} max={budgetValue}></progress>
        <div className="expense-list">
          {expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <strong>{expense.title}</strong>: ${expense.amount}
            </div>
          ))}
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
        <section className="creature-section">
          <h2>Your Monster</h2>
          <div className="creature-display">
            <img src={monsterImage} alt="Your creature" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home;
