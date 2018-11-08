class Field {

    constructor(dimension) {
        this.dimension = dimension
        this.space = Array(dimension).fill().map(() => Array(dimension).fill(0));
    }

    printField() {
        this.space.forEach((row) =>
            console.log(row)
        )
    }

    printUnilluminatedPoints() {
        const announceSpot = (x,y) => console.log(`UNILLUMINATED AT X: ${x}, Y: ${y}`)
        this.space.forEach((row, rowIndex) =>
            row.forEach((item, colIndex) => 
                (item != 1) ? announceSpot(colIndex, rowIndex) : ""
            )
        )
    }

}

class Lamp {
    constructor(field, x, y) {
        this.field = field
        this.x = x
        this.y = y
    }

    illuminate() {
        const increment = (start) => (start + 1)
        const decrement = (start) => (start - 1)
        const stayStill = (start) => (start)

        // travel horizontally right
        this.propagate(this.x, this.y, increment, stayStill)
        // travel horizontally left
        this.propagate(this.x, this.y, decrement, stayStill)
        // travel up
        this.propagate(this.x, this.y, stayStill, decrement)
        // travel down
        this.propagate(this.x, this.y, stayStill, increment)
        // NW
        this.propagate(this.x, this.y, decrement, decrement)
        // NE
        this.propagate(this.x, this.y, increment, decrement)
        // SW
        this.propagate(this.x, this.y, decrement, increment)
        // SE
        this.propagate(this.x, this.y, increment, increment)
    }

    propagate(startX, startY, travelFunctionX, travelFunctionY) {
        if (
            startX < 0 
            || startY < 0 
            || startX >= this.field.dimension 
            || startY >= this.field.dimension) {
            return
        }
        // set spot at coordinate to be 1
        this.field.space[startY][startX] = 1
        const nextX = travelFunctionX(startX)
        const nextY = travelFunctionY(startY)
        this.propagate(nextX, nextY, travelFunctionX, travelFunctionY )
    }
}

let field = new Field(8)
const lamp = new Lamp(field=field, x=2, y=2)
// var lamp2 = new Lamp(field=field, x=6, y=2)
lamp.illuminate()
// lamp2.illuminate()
field.printField()
field.printUnilluminatedPoints()