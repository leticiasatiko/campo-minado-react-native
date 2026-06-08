const createBoard = (rows : number, columns : number) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board : any, minesAmount : number) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSel = Math.floor(Math.random() * rows)
        const columnSel = Math.floor(Math.random() * columns)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows : number, columns : number, minesAmount : number) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = (board : any) => {
    return board.map((row : any) => {
        return row.map((field : any) => {
            return { ...field }
        })
    })
}

const getNeighbors = (board : any, row : number, column : number) => {
    const neighbors: any[] = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board : any, row : number, column : number) => {
    const safes = (result : any, neighbor : any) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board : any, row : number, column : number) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column).forEach((n : any) => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter((n : any) => n.mined).length
        }
    }
}

const fields = (board : any) => [].concat(...board)
const hadExplosion = (board : any) => fields(board).filter((field : any) => field.exploded).length > 0
const pendding = (field : any) => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const wonGame = (board : any) => fields(board).filter(pendding).length === 0
const showMines = (board : any) => fields(board).filter((field : any) => field.mined).forEach((field : any) => field.opened = true)
const invertFlag = (board : any, row : number, column : number) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}
const flagsUsed = (board : any) => fields(board).filter((field : any) => field.flagged).length

export { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed }