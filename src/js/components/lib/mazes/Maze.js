class Maze {
  constructor() {
    this.steps = [];
    this.timeoutIds = [];
  }

  set(width, height, cellSize, timeout) {
    this.mazeWidth = width;
    this.mazeHeight = height;
    this.cellSize = cellSize;
    this.timeout = timeout;
  }

  // Clears all currenly stored timeouts
  stop() {
    this.timeoutIds.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
    })

    this.steps = [];
  }

  // Draws maze from the steps setting timeout for each step
  draw(ctx) {
    var cellSize = this.cellSize;

    this.steps.forEach((cells, index) => {
      let timeoutId = setTimeout(() => {
        cells.forEach((cell => {
          cell.draw(ctx, cellSize)
        }))
      }, this.timeout * index)

      // Track timeouts
      this.timeoutIds.push(timeoutId);
    }, this)
  }
}

export default Maze;