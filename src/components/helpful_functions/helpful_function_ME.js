const grid_generator = (width, height, tile_width, tile_height) => {
    console.log("WORKING INSIDE grid_generator");

    let rows = [];
    for(let i = 0; i + tile_height < height; i = i + tile_height){
      console.log("OUTER LOOP ", i);
      let new_row = [];
      for(let j = 0; j + tile_width < width; j = j + tile_width){
        let canvas_prop = {sx: j, sy: i, swidth: tile_width, sheight: tile_height, x: 0, y: 0, width: tile_width, height: tile_height};
        new_row.push(canvas_prop); 
      }
      rows.push(new_row);
    }
    console.log("MY ROWS RETURNING FROM grid_generator ", rows);

    return rows;
  }

  const createGIDTableElement = (grid_prop, img) => {
    let c = document.createElement('canvas');
    c.width = grid_prop.width;
    c.height = grid_prop.height;
    let ctx = c.getContext("2d");
    ctx.drawImage(img, grid_prop.sx, grid_prop.sy, 
        grid_prop.swidth, grid_prop.sheight, grid_prop.x, grid_prop.y, grid_prop.width, grid_prop.height);
    let dataURL =  c.toDataURL();
    return dataURL;
}

/**
 * Returns a promise and waits for the image to load
 * 
 * @param {*} url 
 */
function loadImage(url) {
    return new Promise((fulfill, reject) => {
      let imageObj = new Image();
      imageObj.onload = () => fulfill(imageObj);
      imageObj.setAttribute('crossOrigin', 'anonymous');
      imageObj.src = url;
    });
  }

  /**
   * Loads a tileset based on an image by slicing it up and filling a GIDTable array
   */
export async function loadTSMapEditor (width, height, tile_width, tile_height, image, name) {
  console.log("INSIDE MAP EDITOR: ", width, height, tile_width, tile_height, image, name);


  let img = await loadImage(image);
  let grid_props = grid_generator(width, height, tile_width, tile_height);
  console.log("GP: ", grid_props);

  let GIDTable = [];
  let gid = 1;
  for(let grid_row = 0; grid_row < grid_props.length; grid_row = grid_row + 1){
      for(let grid_col = 0; grid_col < grid_props[grid_row].length; grid_col = grid_col + 1){
          GIDTable.push({fileName: name, gid: gid, data:createGIDTableElement(grid_props[grid_row][grid_col], img)});
          gid = gid + 1;
          console.log("IS SOMETHING HAPPENING HERE");
      }
  }
  console.log("table", GIDTable);
  return GIDTable;
}