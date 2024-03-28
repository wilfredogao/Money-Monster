import React from 'react'
import "./Temp.css"


export const Temp = () => {
  return (
    <div className='App-Main'>
      <main>
        <nav>
            <ul className="nav-links">
                <li><a href="#income">Income</a></li>
                <li><a href="#expenses">Expenses</a></li>
                <li><a href="#savings">Savings Goals</a></li>
                <li><a href="#creature">Creature</a></li>
            </ul>
            </nav>
        <section className="budget-overview">
          <h2>Budget Overview</h2>
          <p>Total Income: $XXXX</p>
          <p>Total Expenses: $XXXX</p>
          <p>Savings Goals Progress: XX%</p>
        </section>
        <section className="creature-section">
          <h2>Your Creature</h2>
          <div className="creature-display">
            <p>[Creature Image]</p>
            <progress value="70" max="100"></progress>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Temp;
