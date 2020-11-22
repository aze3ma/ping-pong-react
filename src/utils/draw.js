export function drawBoard(ctx, options = {}) {
    ctx.fillStyle = options.color
    ctx.fillRect(0, 0, options.width, options.height)
}

export function drawPaddle(ctx, options = {}) {
    ctx.fillStyle = options.color
    ctx.fillRect(options.x, options.y, options.width, options.height)
}

export function drawBall(ctx, options = {}) {
    ctx.fillStyle = options.color

    ctx.beginPath()
    // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
    ctx.arc(options.x, options.y, options.radius, 0, Math.PI * 2, true) // π * 2 Radians = 360 degrees
    ctx.closePath()
    ctx.fill()
}
