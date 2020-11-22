const Score = (props) => (
    <div className="score">
        <p className="score__p1">
            Matt <span>{props.score.user}</span>
        </p>
        <p className="score__divider">:</p>
        <p className="score__p2">
            <span>{props.score.bot}</span> Quinn
        </p>
    </div>
)

export default Score
