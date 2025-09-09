import { type MouseEvent } from 'react';

type cardProps = {
    name: string,
    imageURL: string | undefined,
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function Card({name, imageURL, onClick}: cardProps) {

    return(
        <div className="flex flex-col justify-center w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(16.666%-1rem)] basis-lg border-8 hover:border-yellow-400 rounded-md cursor-pointer group" onClick={onClick}>
            <img src={imageURL} className="m-2" alt={name} />
            <h2 className="px-4 py-2 font-bold group-hover:text-yellow-300 capitalize">{name}</h2>
        </div>
    )

}