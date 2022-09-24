import React from "react";
import "../styles/main.css";
import gamecube from  "../assets/gamecube.jpg"

function Main(){

    const [coords, setCoords] = React.useState({x: 0, y: 0});
    const handleMouseMove = e => {
        var bounds = e.target.getBoundingClientRect();
        setCoords({
            x: e.pageX / bounds.width,
            y: e.pageY / bounds.height,
        });
    }

    async function onClick(){

        const response = await fetch ("http://localhost:5000/images");
        
        const images = await response.json();

        console.log(images);

        let ind = 0;

        images.forEach((image, index) => {

            let relX = Math.abs(image.xPos - coords.x ) < 0.05;
            let relY = Math.abs( image.yPos - coords.y) < 0.05;

            if(relX && relY){

            console.log("You found: " + image.name);

            const message = document.getElementById("message");
            message.style.display = "flex";
            message.innerHTML = `You found: ${image.name}`;
            ind = index;
        } 
        })

        var _id = images[ind]._id;
        const character = {...images[ind]};

        await fetch(`http://localhost:5000/update/${_id}`,
                {method: 'PUT',
                 body: JSON.stringify(character),
                 headers: {"Content-Type" : "application/json"},
                }
            ).catch(error => {
                console.log(error);
                return;
            })
    }

    return(
        <>
        <div className="main"  
        onClick={onClick}>
            <img srcSet={gamecube}  onMouseMove={handleMouseMove}/>
            <h1>Coords: {coords.x} {coords.y}</h1>
            <div id="message"></div> 
        </div>
        </> 
    );
};

export default Main;