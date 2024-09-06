import "./App.css"
import { useEffect, useState } from "react"
type CoordValue = 0 | 1 | 2
type Coordinates = [CoordValue, CoordValue]
type Triplet = [Coordinates, Coordinates, Coordinates]

const WINNING_CASES: Triplet[] = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
]

const match = (coord1: Coordinates, coord2: Coordinates) =>
  coord1[0] === coord2[0] && coord1[1] === coord2[1]

function App() {
  useEffect(() => {
    determineWinner()
  })

  const [turn, setTurn] = useState(true)
  const [crosses, setCrosses] = useState<Array<Coordinates>>([])
  const [circles, setCircles] = useState<Array<Coordinates>>([])
  const [winner, setWinner] = useState<string | null>(null)

  const handleClick = (selected: Coordinates) => {
    if (
      [...crosses, ...circles].some((pos) => match(pos, selected)) === false
    ) {
      ;(turn ? setCrosses : setCircles)((old) => [...old, selected])
      setTurn(!turn)
    }
  }

  const determineWinner = () => {
    const winnerIndex = [crosses, circles].findIndex((player) =>
      WINNING_CASES.some((combination: Triplet) =>
        combination.every((combCdx) =>
          player.some((mark) => match(mark, combCdx))
        )
      )
    )
    if (winnerIndex === 0) setWinner("Player 1")
    if (winnerIndex === 1) setWinner("Player 2")
  }

  const fillCell = (target: Coordinates) =>
    (crosses.some((it) => match(it, target)) && "X") ||
    (circles.some((it) => match(it, target)) && "O")

  if (winner) return <h1>{`${winner} WINS`}</h1>

  return (
    <div data-test="grid" className="container">
      {Array.from(Array(9)).map((_, i) => {
        const [x, y] = [i % 3, Math.floor(i / 3)] as Coordinates
        return (
          <div
            key={i}
            data-test={`cell-${x}-${y}`}
            onClick={handleClick.bind(null, [x, y])}
          >
            {fillCell([x, y])}
          </div>
        )
      })}
    </div>
  )
}

export default App
