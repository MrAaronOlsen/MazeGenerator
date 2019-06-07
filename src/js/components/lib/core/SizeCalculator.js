class SizeCalculator {

  // Tries to find a whole number render size of the Maze to prevent funny rendering anomalies
  static get(size, timeout) {
    // Maze sizes must be even numbers and cannot be less than 5 or greater than 501
    if (size === 0 || size > 200) {
      throw "Map size must be greater than 0 and no greater than 200."
    }

    // Aim for 600px
    var pixWidth = 600;

    // Set the grid size which includes walls
    var gridSize = (size * 2) + 1;

    // Increase size until we get no remainder
    while (pixWidth % gridSize != 0) {
      pixWidth++;

      // If width gets too big reverse
      if (pixWidth > 620) {
        pixWidth = 599;

        // Decrease size until we get no remainder
        while (pixWidth % gridSize != 0) {
          pixWidth--;

          // If we still haven't found something fall back to gaurenteed result
          if (pixWidth < 580) {

            // Will find something that fits, but could be undesirable size (aka, really small)
            pixWidth = 600 - (600 % gridSize);
            break;
          }
        }
      }
    }

    // Cell Width should always be a whole number now
    var cellWidth = pixWidth / gridSize;

    // Returns a state object
    return {
      mazeSize: size,
      gridSize: gridSize,
      pixWidth: pixWidth,
      pixHeight: pixWidth,
      cellWidth: cellWidth,
      timeout: timeout
    }
  }
}

export default SizeCalculator;