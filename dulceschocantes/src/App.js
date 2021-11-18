import { useEffect, useState } from 'react'
const width = 8;
// const height = 800;
const candyColors = ['blue', 'red', 'black', 'yellow', 'purple', 'orange','green','brown'];
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
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
  // createBoard()
  console.log(currentColorArrangement)
  return (
    <div className="App">
      <div className="game">
        {currentColorArrangement.map((candyColor , index)=>(
          <img  key={index}
                style={{backgroundColor:candyColor}}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
