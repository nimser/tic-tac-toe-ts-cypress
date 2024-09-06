import "./App.css"
import { useState } from "react"

type Coordinates = [0 | 1 | 2, 0 | 1 | 2]

const WINNING_CASES = [
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
  [[0, 0], [0,1], [0,2]]
]

function App() {
  const [turn, setTurn] = useState(true)
  // fixme - choose a tableau de coords
  const [crosses, setCrosses] = useState<Array<Coordinates>>([])
  const [circles, setCircles] = useState<Array<Coordinates>>([])
  const [winner, setWinner] = useState(null)

  const handleClick = (selectedPosition: Coordinates) => {
    ;(turn ? setCrosses : setCircles)((old) =>
      [...old, selectedPosition]
    )
    determineWinner()
    setTurn(!turn)
  }

  const determineWinner = () =>
    [crosses, circles].forEach((player) => {
      WINNING_CASES.some((comb: [number, number, number]) => {

        //[0, 0, 0] =>
        //[2 ,1, 0]
            comb.every((position: Coordinates, k: number) => player[k].includes(position))
        }
      })


  const fillCell = (target: Coordinates) =>
    (crosses.some(it => it[0]===target[0] && it[1]===target[1]) && "X") 
  || (circles.some(it => it[0]===target[0] && it[1]===target[1]) && "O")

  return (
    <div data-test="grid" className="container">
      {Array.from(Array(9)).map((_, i) => {
        const [x, y] = [i % 3, Math.floor(i / 3)] as Coordinates
        return (
          <div
            data-test={`cell-${x}-${y}`}
            onClick={handleClick.bind(null, [x, y])}
          >
            {fillCell(x, y)}
          </div>
        )
      })}
    </div>
  )
}

export default App
