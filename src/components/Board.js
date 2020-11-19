import { useEffect, useState, useRef } from 'react'
// import { Stage, Layer, Rect } from 'react-konva'
import Paddle from './Paddle'
import Ball from './Ball'
import useCanvas from '../hooks/useCanvas'

// const Board = () => {
//     const boardRef = useRef(null)

//     const [playerPaddlePosition, setPlayerPaddlePosition] = useState({
//         x: 20,
//         y: HEIGHT / 2 - 40,
//     })
//     const [botPaddlePosition, setBotPaddlePosition] = useState({
//         x: WIDTH - 40,
//         y: HEIGHT / 2 - 40,
//     })

//     useEffect(() => {
//         console.log(boardRef.current)
//         const listener = boardRef.current.addEventListener(
//             'keydown',
//             (event) => {
//                 console.log(event)
//             }
//         )
//         return () => {
//             document.removeEventListener('keydown', listener)
//         }
//     }, [])

//     return (
//         <Stage width={WIDTH} height={HEIGHT} tabIndex="0" ref={boardRef}>
//             <Layer>
//                 {/* Board */}
//                 <Rect x={0} y={0} width={800} height={400} fill="#eeeeee" />

//                 {/* Ball */}
//                 <Ball x={WIDTH / 2} y={HEIGHT / 2} fill="#05a9f4" />

//                 {/* Players */}
//                 <Paddle
//                     x={playerPaddlePosition.x}
//                     y={playerPaddlePosition.y}
//                     playerId="Matt"
//                     fill="#05a9f4"
//                 />
//                 <Paddle
//                     x={botPaddlePosition.x}
//                     y={botPaddlePosition.y}
//                     playerId="Quinn"
//                     fill="#607d8a"
//                 />
//             </Layer>
//         </Stage>
//     )
// }

const Board = () => {
    const [canvasRef, canvasWidth, canvasHeight] = useCanvas()

    return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
}

export default Board
