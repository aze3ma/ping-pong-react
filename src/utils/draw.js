export default function draw(ctx, location, options = {}) {
    ctx.fillStyle = options.fill
    ctx.save()
    ctx.translate(
        location.x / options.scale - options.offset,
        location.y / options.scale - options.offset
    )
    ctx.rotate((225 * Math.PI) / 180)
    // .restore(): Canvas 2D API restores the most recently saved canvas state
    ctx.restore()
}
