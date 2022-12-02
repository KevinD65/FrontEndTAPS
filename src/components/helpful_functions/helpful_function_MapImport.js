/**
 * Parses through each tileset used in the map_obj and returns an array of tileset names
 * 
 * @param {*} map_obj 
 */
export function parseTilesets (map_obj){
    let map_tilesets = map_obj.tilesets;
    let tileset_path, tileset_name;
    let used_tilesets = [];

    //PARSE THROUGH EACH TILESET USED IN THIS MAP AND ATTEMPT TO FIND IT IN THE DB
    for(let index = 0; index < map_tilesets.length; index++){
        tileset_path = map_tilesets[index].source;
        tileset_name = tileset_path.split("/");
        tileset_name = tileset_name[tileset_name.length - 1];
        tileset_name = tileset_name.split(".")[0];

        //console.log(tileset_name);

        used_tilesets.push(tileset_name);
    }

    return used_tilesets;
}