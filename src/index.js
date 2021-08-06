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

function spiral (num, anticlockwise) {
  let current = 0
  let moveDir = anticlockwise ? 1 : 0 // 0 = x, 1 = y
  let coor = [0,0]

  // set starting coordinate of axis to -1
  coor[moveDir] = -1

  // create grid first
  const grid = Array(num).fill().map(() => Array(num))

  const containerEl = document.getElementById(target);
  if (containerEl) {
    containerEl.innerHTML = grid
      .map((r) => {
        return "<div>" + r.map(() => `<div></div>`).join("") + "</div>";
      })
      .join("");
  }

  // loop through every border frames
  for(let dim = num; dim > 0; dim -= 2) {
    const directions = dim > 2 ? 4 : dim > 1 ? 3 : 1

    // loop through every direction
    for(let d = 0; d < directions; d++) {
      // offset for 1 direction is always 0, then for next 2 direction is 1 and 4th direction is 2
      const offset = d > 2 ? 2 : d > 0 ? 1 : 0

      // inc will be positive for first 2 directions and negative for last 2 directions
      const inc = d > 1 ? -1 : 1
      
      // loop through the steps for this dimension
      for(let steps = 0; steps < dim - offset; steps++) {
        // inc coordinate in dir
        coor[moveDir] = coor[moveDir] + inc 
        // set value in this coordinate
        grid[coor[1]][coor[0]] = ++current   
        
        if (containerEl) {
          setTimeout(() => {
            containerEl.childNodes[y].childNodes[x].innerHTML = grid[y][x];
          }, slowdown * current);
        }
      }

      // change inc direction after finish looping through each direction
      moveDir = moveDir === 0 ? 1 : 0
    }
  }
  
  return grid
}
