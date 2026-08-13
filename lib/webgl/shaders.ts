/**
 * The shaders.
 *
 * Both compute the optics the explainer describes rather than drawing a
 * picture of the result. That is the whole reason to reach for WebGL here: a
 * reader who moves the control is watching the physics respond, not watching
 * a canned animation play.
 *
 * §4 review — a shader that models interference or absorption describes how
 * light behaves, not how a note is made. Neither carries a material, a
 * thickness in real units, or anything a reproduction could be built from:
 * the parameters are chosen to make the effect legible on a screen.
 */

/**
 * Thin-film interference — the colour-shift mechanism.
 *
 * Light reflects from the top of a thin layer and from its underside. The two
 * reflections travel different distances, that difference changes with the
 * viewing angle, and at each angle some wavelengths reinforce while others
 * cancel. Computed per pixel for three wavelengths.
 */
export const THIN_FILM_FRAGMENT = `
precision mediump float;
varying vec2 vUv;

uniform float uTilt;      // viewing angle, radians
uniform float uThickness; // optical thickness, arbitrary units
uniform vec3 uPaper;      // surrounding stock colour

const float N_FILM = 1.45;

// Intensity for one wavelength at a given optical path difference.
float band(float opd, float lambda) {
  return 0.5 + 0.5 * cos(6.2831853 * opd / lambda + 3.14159265);
}

void main() {
  // Each point on the patch is seen at a slightly different angle, which is
  // why a real note shows a gradient rather than one flat colour.
  float across = (vUv.x - 0.5) * 0.55 + (vUv.y - 0.5) * 0.12;
  float incidence = uTilt + across;

  float sinT = sin(incidence) / N_FILM;
  float cosT = sqrt(max(0.0, 1.0 - sinT * sinT));
  float opd = 2.0 * N_FILM * uThickness * cosT;

  vec3 colour = vec3(band(opd, 620.0), band(opd, 535.0), band(opd, 465.0));

  // A little surface reflection, so it reads as a coated surface rather than
  // a glowing panel.
  float sheen = 0.10 + 0.16 * pow(abs(sin(incidence)), 2.0);
  colour = mix(colour, uPaper, 0.10) + sheen * 0.25;

  // Soften the edges so the patch sits on the page instead of on top of it.
  vec2 d = abs(vUv - 0.5) * 2.0;
  float edge = 1.0 - smoothstep(0.86, 1.0, max(d.x, d.y));

  gl_FragColor = vec4(colour, edge);
}
`

/**
 * Transmitted light through a substrate of varying thickness — the watermark.
 *
 * Thicker material passes less light. The shape below is an abstract lens-like
 * field and an ornament ring: deliberately not a portrait, and not any device
 * from a note. What is being shown is that brightness follows thickness.
 */
export const LIGHT_TABLE_FRAGMENT = `
precision mediump float;
varying vec2 vUv;

uniform vec2 uLight;    // light position behind the sheet, in uv
uniform float uStrength;
uniform vec3 uWarm;     // colour of the lamp
uniform vec3 uStock;    // colour of the paper in reflected light

// Substrate thickness at a point: base sheet, a soft lens, and a ring.
float thickness(vec2 p) {
  float base = 1.0;
  float lens = 0.85 * exp(-14.0 * dot(p - vec2(0.38, 0.5), p - vec2(0.38, 0.5)));
  float ringR = length(p - vec2(0.68, 0.5));
  float ring = 0.55 * exp(-500.0 * pow(ringR - 0.13, 2.0));
  float grain = 0.04 * sin(p.x * 90.0) * sin(p.y * 70.0);
  return base - lens - ring + grain;
}

void main() {
  vec2 p = vUv;

  // How much of the lamp reaches this point before it meets the sheet.
  float reach = 1.0 - smoothstep(0.0, 0.95, length(p - uLight));
  float lamp = uStrength * (0.25 + 0.75 * reach);

  // Beer-Lambert: transmission falls exponentially with thickness.
  float t = clamp(thickness(p), 0.0, 2.0);
  float transmitted = exp(-2.6 * t) * lamp;

  vec3 colour = uStock * 0.35 + uWarm * transmitted * 2.2;

  vec2 d = abs(vUv - 0.5) * 2.0;
  float edge = 1.0 - smoothstep(0.9, 1.0, max(d.x, d.y));
  gl_FragColor = vec4(colour, edge);
}
`
