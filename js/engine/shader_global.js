'use strict';

import {create_shader} from './shader_loader.js'

export async function load_shaders(gl){
	return {
		model_shader: await load_model_shader(gl),
	};
}

async function load_model_shader(gl){
	const program = await create_shader(gl, 'res/shaders/model_shader/');
	return {
		program,
		model_loc: gl.getUniformLocation(program, 'model'),
		view_loc: gl.getUniformLocation(program, 'view'),
		proj_loc: gl.getUniformLocation(program, 'proj'),
	};
}
