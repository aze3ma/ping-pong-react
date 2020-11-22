import Score from './components/Score'
// import Board from './components/Board'
// import Game from './components/GameF'
import Game from './components/Game'
import { useState } from 'react'

const App = () => {
    const [score, setScore] = useState({ user: 0, bot: 0 })

    return (
        <div className="game">
            <Score score={score} />
            <Game updateScore={(score) => setScore(score)} />
        </div>
    )
}

export default App
