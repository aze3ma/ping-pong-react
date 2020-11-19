import { useRef, useState, useEffect } from 'react'
import draw from '../utils/draw'

const SCALE = 0.1
const OFFSET = 80
const canvasWidth = 800
const canvasHeight = 400

export default function useCanvas() {
    const canvasRef = useRef(null)
    const [coordinates, setCoordinates] = useState([])

    useEffect(() => {
        const canvasObj = canvasRef.current
        const ctx = canvasObj.getContext('2d')
        // clear the canvas area before rendering the coordinates held in state
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        // draw all coordinates held in state
        coordinates.forEach((coordinate) => {
            draw(ctx, coordinate, {
                scale: SCALE,
                offset: OFFSET,
                fill: '#eeeeee',
            })
        })
    })

    return [canvasRef, canvasWidth, canvasHeight]
}
