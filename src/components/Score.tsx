type scoreProps = {
    score: number,
    highScore: number
}

export default function Score({score, highScore}: scoreProps) {

    return (
        <>
            <div className="flex justify-center gap-5">
                <div className="flex gap-2">
                    <label className="font-bold">Score:</label>
                    <span>{score}</span>
                </div>
                <div className="flex gap-2">  
                    <label className="font-bold">High Score:</label>
                    <span>{highScore}</span>
                </div>
            </div>
        </>
    )

}