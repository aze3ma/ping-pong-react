const Ball = (props) => {
    return {
        x: props.canvas.width / 2 || 0,
        y: props.canvas.height / 2 || 0,
        radius: 10,
        speed: 8,
        velocityX: 5,
        velocityY: 5,
        color: props.color || '#000000',
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
    }
}

export default Ball
