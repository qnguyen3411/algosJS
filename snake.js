class Snake {
  constructor() {
    this.container = [];
    this.currPos = {x: 0, y: 0};
    this.currDir = "right";
    this.autoIncrementer = 0;
    this.nextPos = {
      left:  ({x, y}) => ({x: x + 1, y: y}),
      right: ({x, y}) => ({x: x - 1, y: y}),
      up:    ({x, y}) => ({x: x,     y: y - 1}),
      down:  ({x, y}) => ({x: x,     y: y + 1})
    }
  }
  putIn(container) {
    this.container = container;
    return this;
  }

  findAvailableDirections() {
    const directions = [];
    const {x,y} = this.currPos;
    if (this.container[y][x - 1] === 0) {
      directions.push('right')
    }
    if (this.container[y][x + 1] === 0) {
      directions.push('left')
    }
    if (this.container[y + 1] && this.container[y + 1][x] === 0) {
      directions.push('down')
    }
    if (this.container[y - 1] && this.container[y - 1][x] === 0) {
      directions.push('up')
    }
    return directions;
  }

  travel() {
    const availableDirs = this.findAvailableDirections();
    if (availableDirs.length == 0) { return; }
    if (availableDirs.length == 1) {
      this.currDir = availableDirs[0];
    }
    this.currPos = this.nextPos[this.currDir](this.currPos);
    const {x, y} = this.currPos;
    this.container[y][x] = pad(this.autoIncrementer++, 3);
  }

  fillContainer() {
    if( !this.container ) { return };
    const size = this.container.length * this.container[0].length;
    while(this.autoIncrementer <= size ) {
      this.travel();
    }
  }
  
}

function generateSpiral(m, n) {
  let container = Array(m).fill().map(() => Array(n).fill(0));
  const snake = new Snake().putIn(container);
  snake.fillContainer();
  return container;
}


function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}
console.log(generateSpiral(3, 4).join('\n'));