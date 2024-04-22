import React from 'react'
import "./Home.css"
import neutralMonster from '../Assets/neutral.png'

export const Home = () => {
  return (
    <div className='App-Main'>
      <main>
        <section className="creature-section">
          <h2>Your Monster</h2>
          <div className="creature-display">
            <img src={neutralMonster} alt="[Your creature]" />
            <progress value="70" max="100"></progress>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home;