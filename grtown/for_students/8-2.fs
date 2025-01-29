/* Procedural shading example for Exercise 8-2 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 v_normal;

const vec3 lightDir = vec3(0.,0.,1.);
uniform sampler2D texture;

void main()
{
    vec3 nhat = normalize(v_normal);
    float lights = abs(dot(nhat, lightDir));
    /*gl_FragColor = vec4(lights*mix(light,dark,dc), 1.);*/
    gl_FragColor = lights*texture2D(texture, v_uv);

}
