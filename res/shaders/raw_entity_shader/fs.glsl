#version 300 es

#if(GL_FRAGMENT_PRECISION_HIGH)
	precision highp float;
#else
	precision mediump float;
#endif

in vec3 pass_normal;
in vec3 pass_to_camera_vector;
in vec3 pass_to_light_vector;

out vec4 out_color;

uniform float reflectivity;
uniform float shine_damper;
uniform vec3 light_color;
uniform vec3 object_color;

void main() {
	vec3 fragment_color = object_color;
	vec3 unit_normal = normalize(pass_normal);
	vec3 unit_to_light_vector = normalize(pass_to_light_vector);
	vec3 unit_to_camera_vector = normalize(pass_to_camera_vector);
	vec3 reflected_light_dir = reflect(-unit_to_light_vector, unit_normal);

	// Diffuse Calculation
	float brightness = max(dot(unit_to_light_vector, unit_normal), 0.2);
	vec3 diffuse = light_color * brightness;

	// Specular Calculation
	float specular_factor = dot(reflected_light_dir, unit_to_camera_vector); // Calculating the similarity of both vectors
	specular_factor = max(specular_factor, 0.0); // Making sure the specular factor never drops below 0
	specular_factor = pow(specular_factor, shine_damper); // Applying the shine damper
	vec3 final_specular = light_color * reflectivity * specular_factor;

	out_color = vec4(fragment_color * diffuse + final_specular, 1.0);
}