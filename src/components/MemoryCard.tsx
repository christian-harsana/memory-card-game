import { useState, useEffect, type MouseEvent } from "react";
import Score from "./Score";
import Card from "./Card";
import GameOverMessage from "./GameOverMessage";
import shuffleArray from "../utilities/shuffleArray";


 const DEFAULT_CARD_LIST = [
    {name: "zacian", imageURL: undefined}, 
    {name: "greninja", imageURL: undefined}, 
    {name: "lucario", imageURL: undefined},
    {name: "zamazenta", imageURL: undefined},
    {name: "pikachu", imageURL: undefined},
    {name: "inteleon", imageURL: undefined},
    {name: "blaziken", imageURL: undefined},
    {name: "quaxly", imageURL: undefined},
    {name: "umbreon", imageURL: undefined},
    {name: "yveltal", imageURL: undefined},
    {name: "solgaleo", imageURL: undefined},
    {name: "raboot", imageURL: undefined},
];

export default function MemoryCard() {
   
    const winningScore = DEFAULT_CARD_LIST.length;
    const [cardList, setCardList] = useState(DEFAULT_CARD_LIST);
    const [selectedCard, setSelectedCard] = useState<string[]>([]);
    const [highScore, setHighScore] = useState(0);
    const [isLose, setIsLose] = useState(false);

    // Fetch Image
    useEffect(() => {

        const fetchCardImage = async() => {
             
            const updatedCardList = await Promise.all(
                DEFAULT_CARD_LIST.map(async (card) => {

                    // Check localStorage cache
                    const cachedImage = localStorage.getItem(`pokemon_image_${card.name}`);
                    
                    if (cachedImage) {
                        // console.log(`Using cached image for ${card.name}`);
                        return {
                            ...card,
                            imageURL: cachedImage
                        };
                    }

                    // Fetch
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${card.name}`);
                    
                    // Check if response is ok
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    const data = await response.json();
                    const imageURLData = data?.sprites?.other['official-artwork']?.front_default;
                    
                    // Check if imageURLData is 
                    if (!imageURLData) {
                        throw new Error('Image URL not found in response');
                    }

                    // Store in localStorage
                    localStorage.setItem(`pokemon_image_${card.name}`, imageURLData);
                    // console.log(`Cached image for ${card.name}:`, imageURLData);
                
                    return {
                        ...card,
                        imageURL: imageURLData
                    }                    
                })
            );

            setCardList(updatedCardList);            
        };

        fetchCardImage();
    }, []);


    // Calculate score
    const currentScore = selectedCard.length;

    // Check high score
    currentScore > highScore && setHighScore(currentScore);

    // Check game status
    const gameStatus = isLose? "lose" : currentScore === winningScore ? "win" : "normal"; 


    // EVENT HANDLERS
    // -------------------------

    function handleCardClick(name: string) {

        setIsLose(false);

        // Check if the name exist inside the selectedCard
        if (selectedCard.includes(name)) {
            setSelectedCard([]);
            setIsLose(true);
        }
        else
        {
            const newselectedCard = [...selectedCard];

            newselectedCard.push(name);
            setSelectedCard(newselectedCard);
        }

        // Randomise the CardList Array's Order
        setCardList(shuffleArray(cardList));
    }


    function handleTryAgainClick(e: MouseEvent<HTMLAnchorElement>) {
        console.log("try again - reset");
        e.preventDefault();
        setSelectedCard([]);
        
    }

    // RENDER
    // ----------------------------

    return(
        <>
            <header className="mb-5">
                <h1 className="mb-5 text-3xl font-bold text-center">Memory Card Game</h1>

                <p>Choose a card to score point, but don't choose the same card for more than once.</p>
            </header>

            {gameStatus !== "normal" && <GameOverMessage status={gameStatus} onTryAgainClick={handleTryAgainClick} />}

            <section className="mb-7">
                <Score score={currentScore} highScore={highScore} />
            </section>

            <section className="mb-7">
                <div className="flex flex-row flex-wrap justify-center gap-4">
                    {
                        cardList.map((card) => {
                            return <Card 
                                key={card.name} 
                                name={card.name} 
                                imageURL={card.imageURL} 
                                onClick={() => handleCardClick(card.name)} /> 
                        })    
                    }
                </div>
            </section>
        </>
    )

}