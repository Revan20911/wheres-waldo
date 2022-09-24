import React from "react";
import "../styles/header.css";

export default function Header(){

    const [characters, setCharacters]  = React.useState([]);

    React.useEffect(() => {
        async function checkIfFound(){
            const response = await fetch("http://localhost:5000/images");

            if(!response.ok){
                const message = `An error has occurred: ${response.statusText}`;
                console.log(message);
                return;
            }

            const images = await response.json();
            setCharacters(images);
        }
        checkIfFound();

    });

function getCharacters(){
    return(
            <div className="character-list">
                {characters.map((character) => {
                    return(
                        <div className={character.found}
                        key={character._id}>
                            {character.name}
                            
                        </div>
                    )
                })}
        </div>
    );
    }

    return(
        <div className="header">
            {getCharacters()}
        </div>
    )
};

