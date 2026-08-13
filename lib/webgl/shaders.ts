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

/**
 * Raking light across relief — the intaglio and blind-code mechanism.
 *
 * Ink standing proud of the surface catches light from a low angle and casts
 * into shadow on the far side. Move the light and the ridges appear and
 * disappear, which is why raised printing is legible by eye as well as by
 * finger. The surface is computed as a height field and shaded from its
 * gradient: no geometry, no note, just relief and a lamp.
 */
export const RELIEF_FRAGMENT = `
precision mediump float;
varying vec2 vUv;

uniform float uLightAngle;  // azimuth of the raking light, radians
uniform float uRidgeCount;  // ridges across the panel
uniform vec3 uInk;
uniform vec3 uStock;

// Height at a point: a run of rounded ridges over a flat sheet.
float height(vec2 p) {
  float phase = p.x * uRidgeCount * 6.2831853;
  float ridges = pow(max(0.0, sin(phase)), 6.0);
  // Ridges only occupy a band, so the flat stock is visible for comparison.
  float band = smoothstep(0.18, 0.28, p.y) * (1.0 - smoothstep(0.72, 0.82, p.y));
  return ridges * band;
}

void main() {
  vec2 p = vUv;
  float e = 0.0025;

  // Surface normal from the height gradient.
  float hx = height(p + vec2(e, 0.0)) - height(p - vec2(e, 0.0));
  float hy = height(p + vec2(0.0, e)) - height(p - vec2(0.0, e));
  vec3 normal = normalize(vec3(-hx * 26.0, -hy * 26.0, 1.0));

  // A low, raking lamp: the whole point is the grazing angle.
  vec3 light = normalize(vec3(cos(uLightAngle), sin(uLightAngle), 0.42));
  float lambert = max(0.0, dot(normal, light));

  float h = height(p);
  vec3 colour = mix(uStock, uInk, clamp(h * 1.35, 0.0, 1.0));
  // Ambient kept high so the flat sheet reads as proof stock, not as grey.
  colour *= 0.66 + 0.72 * lambert;

  // Contact shadow where a ridge meets the sheet.
  colour *= 1.0 - 0.22 * smoothstep(0.02, 0.3, h) * (1.0 - lambert);

  vec2 d = abs(vUv - 0.5) * 2.0;
  float edge = 1.0 - smoothstep(0.92, 1.0, max(d.x, d.y));
  gl_FragColor = vec4(colour, edge);
}
`
