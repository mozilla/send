const html = require('choo/html');
const percent = require('../utils').percent;

const radius = 73;
const oRadius = radius + 10;
const oDiameter = oRadius * 2;
const circumference = 2 * Math.PI * radius;

module.exports = function(progressRatio) {
  const dashOffset = (1 - progressRatio) * circumference;
  const percentComplete = percent(progressRatio);
  const div = html`
  <div class="progress-bar">
    <svg
      id="progress"
      width="${oDiameter}"
      height="${oDiameter}"
      viewPort="0 0 ${oDiameter} ${oDiameter}"
      version="1.1">
      <circle
        r="${radius}"
        cx="${oRadius}"
        cy="${oRadius}"
        fill="transparent"/>
      <circle
        id="bar"
        r="${radius}"
        cx="${oRadius}"
        cy="${oRadius}"
        fill="transparent"
        transform="rotate(-90 ${oRadius} ${oRadius})"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${dashOffset}"/>
      <text class="percentage" text-anchor="middle" x="50%" y="98">
        <tspan class="percent-number">${percentComplete}</tspan>
      </text>
    </svg>
  </div>
  `;
  return div;
};
