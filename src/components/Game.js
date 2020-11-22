import React, { PureComponent } from 'react'
import { isEqual } from 'lodash'

import Board from './Board'
import Ball from './Ball'
import Paddle from './Paddle'

import { drawBoard, drawPaddle, drawBall } from '../utils/draw'
import {
    BOARD_WIDTH,
    BOARD_HEIGHT,
    PADDLE_WIDTH,
    FPS,
} from '../utils/constants'

export default class Game extends PureComponent {
    state = {
        ball: {},
        user: {},
        bot: {},
        player: {},
        upArrowPressed: false,
        downArrowPressed: false,
        isGameOver: false,
    }
    setCanvasContext = (ctx) => {
        this.ctx = ctx.getContext('2d')
    }

    reset = () => {
        this.setState((prevState) => ({
            ...prevState,

            ball: {
                ...prevState.ball,
                x: this.ctx.canvas.width / 2,
                y: this.ctx.canvas.height / 2,
                speed: 8,
                velocityX: -prevState.ball.velocityX,
                velocityY: -prevState.ball.velocityY,
            },
        }))
    }

    isCollisionDetect = () => {
        const { ball, user, bot } = this.state
        const player = ball.x < this.ctx.canvas.width / 2 ? user : bot

        this.setState((prevState) => ({
            ...prevState,
            player: {
                ...player,
                top: player.y,
                right: player.x + player.width,
                bottom: player.y + player.height,
                left: player.x,
            },
            ball: {
                ...prevState.ball,
                top: ball.y - ball.radius,
                right: ball.x + ball.radius,
                bottom: ball.y + ball.radius,
                left: ball.x - ball.radius,
            },
        }))

        return (
            ball.left < this.state.player.right &&
            ball.top < this.state.player.bottom &&
            ball.right > this.state.player.left &&
            ball.bottom > this.state.player.top
        )
    }

    updateGame = () => {
        const {
            ball,
            user,
            player,
            upArrowPressed,
            downArrowPressed,
        } = this.state

        // move the paddle
        if (upArrowPressed && user.y > 0) {
            this.setState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    y: (prevState.user.y -= 8),
                },
            }))
        } else if (
            downArrowPressed &&
            user.y < this.ctx.canvas.height - user.height
        ) {
            this.setState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    y: (prevState.user.y += 8),
                },
            }))
        }

        // check if ball hits top or bottom wall
        if (
            ball.y + ball.radius >= this.ctx.canvas.height ||
            ball.y - ball.radius <= 0
        ) {
            this.setState((prevState) => ({
                ...prevState,
                ball: {
                    ...prevState.ball,
                    velocityY: -prevState.ball.velocityY,
                },
            }))
        }

        // if ball hit on right wall

        if (ball.x + ball.radius >= this.ctx.canvas.width) {
            // then user scored 1 point
            this.setState(
                (prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        score: (prevState.user.score += 1),
                    },
                }),
                () => {
                    this.props.updateScore({
                        user: this.state.user.score,
                        bot: this.state.bot.score,
                    })
                    this.reset()
                }
            )
        }

        // if ball hit on left wall
        if (ball.x - ball.radius <= 0) {
            // then ai scored 1 point
            this.setState(
                (prevState) => ({
                    ...prevState,
                    bot: {
                        ...prevState.bot,
                        score: (prevState.bot.score += 1),
                    },
                }),
                () => {
                    this.props.updateScore({
                        user: this.state.user.score,
                        bot: this.state.bot.score,
                    })
                    this.reset()
                }
            )
        }

        // move the ball
        this.setState((prevState) => ({
            ...prevState,
            ball: {
                ...prevState.ball,
                y: prevState.ball.y + prevState.ball.velocityY,
                x: prevState.ball.x + prevState.ball.velocityX,
            },
            bot: {
                ...prevState.bot,
                y:
                    prevState.bot.y +
                    (prevState.ball.y -
                        (prevState.bot.y + prevState.bot.height / 2)) *
                        0.09,
            },
        }))

        // collision detection on paddles
        if (this.isCollisionDetect()) {
            // default angle is 0deg in Radian
            let angle = 0
            // if ball hit the top of paddle
            if (ball.y < player.y + player.height / 2) {
                // then -1 * Math.PI / 4 = -45deg
                angle = (-1 * Math.PI) / 4
            } else if (ball.y > player.y + player.height / 2) {
                // if it hit the bottom of paddle
                // then angle will be Math.PI / 4 = 45deg
                angle = Math.PI / 4
            }
            const type = ball.x < this.ctx.canvas.width / 2 ? 'user' : 'bot'
            this.setState((prevState) => ({
                ...prevState,
                ball: {
                    ...prevState.ball,
                    velocityX:
                        (type === 'user' ? 1 : -1) *
                        prevState.ball.speed *
                        Math.cos(angle),
                    velocityY: prevState.ball.speed * Math.sin(angle),
                    speed: prevState.ball.speed + 0.2,
                },
            }))
        }
    }

    drawGame = () => {
        const { ball, user, bot } = this.state
        drawBoard(this.ctx, {
            width: BOARD_WIDTH,
            height: BOARD_HEIGHT,
            color: '#eeeeee',
        })

        drawBall(this.ctx, ball)
        drawPaddle(this.ctx, user)
        drawPaddle(this.ctx, bot)
    }

    gameLoop = () => {
        this.updateGame()
        this.drawGame()
    }

    componentDidMount() {
        const canvas = this.ctx.canvas

        this.drawGame()
        this.setState(() => ({
            ball: Ball({ canvas, color: '#05a9f4' }),
            user: Paddle({ canvas, color: '#05a9f4' }),
            bot: Paddle({
                canvas,
                x: this.ctx.canvas.width - (PADDLE_WIDTH + 10),
                color: '#607d8a',
            }),
        }))

        this.keyDownListener = window.addEventListener('keydown', (event) => {
            if (event.keyCode === 38) {
                this.setState((prevState) => ({
                    ...prevState,
                    upArrowPressed: true,
                }))
                return
            } else if (event.keyCode === 40) {
                this.setState((prevState) => ({
                    ...prevState,
                    downArrowPressed: true,
                }))
                return
            }
        })

        this.keyUpListener = window.addEventListener('keyup', (event) => {
            if (event.keyCode === 38) {
                this.setState((prevState) => ({
                    ...prevState,
                    upArrowPressed: false,
                }))
                return
            } else if (event.keyCode === 40) {
                this.setState((prevState) => ({
                    ...prevState,
                    downArrowPressed: false,
                }))
                return
            }
        })

        this.interval = setInterval(this.gameLoop, FPS)
    }

    componentDidUpdate(_prevProps, prevState) {
        const { player } = this.state
        if (player.score >= 5) {
            this.setState((prevState) => ({ ...prevState, isGameOver: true }))
            clearInterval(this.interval)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDownListener)
        window.removeEventListener('keyup', this.keyUpListener)
        clearInterval(this.interval)
    }

    render() {
        const { isGameOver } = this.state
        return (
            <>
                <Board
                    ref={this.setCanvasContext}
                    width={BOARD_WIDTH}
                    height={BOARD_HEIGHT}
                />

                {isGameOver && <h1 className="game-over">Game Over</h1>}
            </>
        )
    }
}
