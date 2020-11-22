import { forwardRef } from 'react'

const Board = forwardRef((props, ref) => {
    return <canvas ref={ref} id="game-canvas" {...props} />
})

export default Board
