import { useEffect, useState } from 'react'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
const width = 8;
const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
]
// const candyColors = ['blue', 'red', 'black', 'yellow', 'purple', 'orange', 'green', 'brown'];
const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [squareBeibgDragged, setSquareBeingDragged] = useState(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);



    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i];
            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
                columnOfFour.forEach(square => currentColorArrangement[square] = '')
                return true
            }
        }
    }


    const checkForRowOfFour = () => {
        for (let i = 0; i <= 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i];
            const noValid = [5, 6, 7, 13, 14, 15, 22, 21, 23, 29, 30, 31, 38, 37, 39, 45, 46, 47, 53, 54, 55, 62, 64]
            if (noValid.includes(i)) continue
            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
                rowOfFour.forEach(square => currentColorArrangement[square] = '')
                return true
            }
        }
    }



    const checkForRowOfThree = () => {
        for (let i = 0; i <= 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i];
            const noValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 64]
            if (noValid.includes(i)) continue
            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
                rowOfThree.forEach(square => currentColorArrangement[square] = '')
                return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i];
            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
                columnOfThree.forEach(square => currentColorArrangement[square] = '')
                return true
            }
        }
    }

    const moveIntoSquereBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firtRow = [0, 1, 2, 3, 5, 6, 7];
            const isfirstRow = firtRow.includes(i)
            if (isfirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]

            }
            if (currentColorArrangement[i + width] === '') {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = '';
            }
        }
    }

    const dragStart = (e) => {

        console.log('Drag Start');
        setSquareBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        console.log(e);

        console.log('Drag drop');
        setSquareBeingReplaced(e.target)

    }
    const dragEnd = (e) => {


        console.log('Drag End');

        const squareBeingDraggedId = parseInt(squareBeibgDragged.getAttribute('data-id'))
        const squareBeingRepleacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingRepleacedId] = squareBeibgDragged.style.backgroundColor
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]
        const validMove = validMoves.includes(squareBeingRepleacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingRepleacedId &&
            validMove &&
            (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
            setPointCandy(5)
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangement[squareBeingRepleacedId] = squareBeingReplaced.style.backgroundColor
            currentColorArrangement[squareBeingDraggedId] = squareBeibgDragged.style.backgroundColor
            setCurrentColorArrangement([...currentColorArrangement])

        }

    }

    const createBoard = () => {
        // crea el random de colores en el arreglo por medio de los colores de la lista de candycolors
        const randomColorArrangement = [];
        for (let i = 0; i <= 63; i++) {
            console.log(width * width);
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            console.log('randomColor', randomColor)
            randomColorArrangement.push(randomColor);
            console.log('random Color Arrangement ', randomColorArrangement.length)

        }
        setCurrentColorArrangement(randomColorArrangement)
        // mustra el codigo de colores que toca en la partida 
        // console.log(randomColorArrangement);
    }
    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquereBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100);
        return () => clearInterval(timer)

    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquereBelow, currentColorArrangement])

    return (<div className="App" >
        <div className="game" > {
            currentColorArrangement.map((candyColor, index) => (<
                img key={index}
                style={
                    { backgroundColor: candyColor }
                }
                alt={candyColor}
                data-id={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={
                    (e) => e.preventDefault()
                }
                onDragEnter={
                    (e) => e.preventDefault()
                }
                onDragLeave={
                    (e) => e.preventDefault()
                }
                onDrop={dragDrop}
                onDragEnd={dragEnd}
            />
            ))
        }
        </div>
    </div>
    );
}

export default App;