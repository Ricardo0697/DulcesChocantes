import { useEffect, useState } from 'react'
const width = 8;
const candyColors = ['blue', 'red', 'black', 'yellow', 'purple', 'orange', 'green', 'brown'];
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i];
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i];
      const noValid = [5,6, 7,13, 14, 15, 22,21, 23,29, 30, 31, 38,37, 39,45, 46, 47,53, 54, 55,62, 64]
      if (noValid.includes(i)) continue
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i];
      const noValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 64, 65]
      if (noValid.includes(i)) continue
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i];
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const moveIntoSquereBelow = () => {
    for(let i = 0 ; i< 64-width; i++){
      const firtRow = [0 , 1 , 2 , 3 , 5 , 6 , 7];
      const isfirstRow = firtRow.includes(i)
      if(isfirstRow && currentColorArrangement[i] === ''){
       let randomNumber =  Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      
      }
      if(currentColorArrangement[i + width] === ''){
          currentColorArrangement[i + width] = currentColorArrangement[i];
          currentColorArrangement[i] = '';
        }
    }
  }

  const createBoard = () => {
    // crea el random de colores en el arreglo por medio de los colores de la lista de candycolors
    const randomColorArrangement = [];
    for (let i = 0; i <= width * width; i++) {

      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);

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

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree,  checkForRowOfThree, moveIntoSquereBelow, currentColorArrangement])

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
