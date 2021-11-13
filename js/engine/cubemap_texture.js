export function load_cubemap_textures(gl){
	return {
		day: load_cubemap_from_file(gl, 'res/textures/cubemaps/day/'),
	};
}

function load_cubemap_from_file(gl, path_to_file){
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	const image_order = [
		'right.jpg',
		'left.jpg',
		'top.jpg',
		'bottom.jpg',
		'back.jpg',
		'front.jpg',
	];

	for(let i = 0; i < 6; i++){
		const image = new Image();
		image.onload = function(){
			gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
		}
		image.src = path_to_file + image_order[i];
	}

	return texture;
}