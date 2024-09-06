import "./App.css"
import { useState } from "react"

type Coordinates = [0 | 1 | 2, 0 | 1 | 2]

const WINNING_CASES = [
  [0, 0, 0],
  [1, 1, 1],
  [2, 2, 2],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [2 ,1, 0],
]

function App() {
  const [turn, setTurn] = useState(true)
  // fixme - choose a tableau de coords
  const [crosses, setCrosses] = useState<Array<number[]>>([[], [], []])
  const [circles, setCircles] = useState<Array<number[]>>([[], [], []])
  const [winner, setWinner] = useState(null)

  const handleClick = (x: Coordinates[0], y: Coordinates[1]) => {
    ;(turn ? setCrosses : setCircles)((old) =>
      old.map((column, i) => (i === x ? [...column, y] : column))
    )
    determineWinner()
    setTurn(!turn)
  }

  const determineWinner = () =>
    [crosses, circles].forEach((player) => {
      WINNING_CASES.some((comb: [number, number, number]) => {

        //[0, 0, 0] =>
        //[2 ,1, 0]
            comb.every((position: number, k: number) => player[k].includes(position))
        }
      })
    })

  const fillCell = (x: Coordinates[0], y: Coordinates[1]) =>
    (crosses[x].includes(y) && "X") || (circles[x].includes(y) && "O")

  return (
    <div data-test="grid" className="container">
      {Array.from(Array(9)).map((_, i) => {
        const [x, y] = [i % 3, Math.floor(i / 3)] as Coordinates
        return (
          <div
            data-test={`cell-${x}-${y}`}
            onClick={handleClick.bind(null, x, y)}
          >
            {fillCell(x, y)}
          </div>
        )
      })}
    </div>
  )
}

export default App
