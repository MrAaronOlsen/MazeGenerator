class Layout {
  constructor(layout = []) {
    this.layout = layout;
  }

  addRow(row) {
    this.layout[row] = [];
  }

  addCol(row, col, thing) {
    this.layout[row][col] = thing;
  }

  clone() {
    var clone = [...this.layout]

    for (let i = 0; i < this.layout.length; i++) {
      clone[i] = [...clone[i]]
    }

    return new Layout(clone);
  }

  draw(ctx, size)  {
    this.layout.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.draw(ctx, j * size, i * size, size)
      })
    })
  }
}

export default Layout;