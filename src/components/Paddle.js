import { PADDLE_WIDTH, PADDLE_HEIGHT } from '../utils/constants'

const Paddle = (props) => {
    return {
        x: props.x || PADDLE_WIDTH,
        y: props.canvas.height / 2 - PADDLE_HEIGHT / 2 || 0,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        color: props.color || '#000000',
        score: 0,
        // top: props.canvas.height / 2 - PADDLE_HEIGHT,
        // right: 15,
        // bottom: props.canvas.height / 2 - PADDLE_HEIGHT,
        // left: 15,
    }
}

export default Paddle
