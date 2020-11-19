import { Circle } from 'react-konva'

const Ball = ({ x, y, fill, ...rest }) => {
    return <Circle x={x} y={y} radius={10} fill={fill} {...rest} />
}

export default Ball
