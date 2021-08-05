import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Spiral!</h1>
<style>
  #spiral > div {
    display: flex;
  }
  #spiral > div > div {
    width: 36px;
    height: 36px;
    border: 1px solid #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
</style>
<form id="form">
  <label for="num">Dimension</label>
  <input name="num" type="number" max="99" min="1" required />
  <input name="anticlockwise" type="checkbox" />
  <label for="anticlockwise">Anti-clockwise spiral</label>
  <br />
  <input type="submit" value="Spiral it!" />
</form>
<div id="spiral"></div>
`;

document.getElementById("form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const num = Number(evt.target.num.value);
  const anticlockwise = evt.target.anticlockwise.checked;

  spiral(num, anticlockwise);
});

async function spiral(
  num,
  anticlockwise = false,
  target = "spiral",
  slowdown = 50
) {
  let current = 0;
  let dir = anticlockwise ? 1 : 0; // 0 = x, 1 = y
  let coor = [0, 0];

  // set starting coordinate of axis to -1
  coor[dir] = -1;

  // create grid first
  const grid = Array(num)
    .fill()
    .map(() => Array(num).fill(null));

  const containerEl = document.getElementById(target);
  if (containerEl) {
    containerEl.innerHTML = grid
      .map((r) => {
        return "<div>" + r.map(() => `<div></div>`).join("") + "</div>";
      })
      .join("");
  }

  // get an array of border frames to loop
  const borders = Array(Math.ceil(num / 2))
    .fill(null)
    .map((border, i) => {
      const dim = num - 2 * i;
      const dir = dim > 2 ? 4 : dim > 1 ? 3 : 1;
      return { dim, dir };
    });

  // loop through every border frames
  for (let b = 0; b < borders.length; b++) {
    const border = borders[b];

    // loop through every direction
    for (let d = 0; d < border.dir; d++) {
      // offset for 1 direction is always 0, then for next 2 direction is 1 and 4th direction is 2
      const offset = d > 2 ? 2 : d > 0 ? 1 : 0;

      // inc will be positive for first 2 directions and negative for last 2 directions
      const inc = d > 1 ? -1 : 1;

      // loop through the steps for this dimension
      for (let steps = 0; steps < border.dim - offset; steps++) {
        // inc coordinate in dir
        coor[dir] = coor[dir] + inc;
        // set value in this coordinate
        const x = coor[0];
        const y = coor[1];
        grid[y][x] = ++current;

        if (containerEl) {
          containerEl.childNodes[y].childNodes[x].innerHTML = grid[y][x];
          if (slowdown) {
            await new Promise((resolve) => {
              setTimeout(() => resolve(), slowdown);
            });
          }
        }
      }

      // change inc direction after finish looping through each direction
      dir = dir === 0 ? 1 : 0;
    }
  }

  return grid;
}
