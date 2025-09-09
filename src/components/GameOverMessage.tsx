type gameOverMessageProps = {
    status: "win" | "lose" | "normal",
    onTryAgainClick: Function
}

export default function GameOverMessage ({status, onTryAgainClick}: gameOverMessageProps) {

    return (
        <section className="mb-5">
            {
                status === "win" ?
                (    
                    <p className="font-bold text-green-400">
                        Well done! You really have a good memory. <a href="#" className="underline hover:no-underline" onClick={(e) => onTryAgainClick(e)}>Try again?</a>
                    </p>   
                ) :
                (
                    <p className="font-bold text-red-400">
                        Sorry, you have chosen a same card twice. Try again!
                    </p>
                )
            }
        </section>
    )
}