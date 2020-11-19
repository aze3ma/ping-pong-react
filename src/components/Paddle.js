import { Rect } from 'react-konva'

const Paddle = ({ x, y, fill, playerId, ...rest }) => {
    const handleTransform = (x) => {
        console.log(x)
        console.log('ss')
    }
    return (
        <Rect
            key={playerId}
            onClick={handleTransform}
            onTransformStart={handleTransform}
            x={x}
            y={y}
            width={10}
            height={80}
            fill={fill}
            {...rest}
        />
    )
}

export default Paddle
