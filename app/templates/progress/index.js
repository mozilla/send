const html = require('choo/html');
const percent = require('../../utils').percent;

const radius = 73;
const oRadius = radius + 10;
const oDiameter = oRadius * 2;
const circumference = 2 * Math.PI * radius;

module.exports = function(progressRatio) {
  const dashOffset = (1 - progressRatio) * circumference;
  const percentComplete = percent(progressRatio);
  const div = html`
  <div class="progress">
    <svg
      width="${oDiameter}"
      height="${oDiameter}"
      viewPort="0 0 ${oDiameter} ${oDiameter}"
      version="1.1">
      <circle
        class="progress__bg"
        r="${radius}"
        cx="${oRadius}"
        cy="${oRadius}"
        fill="transparent"/>
      <circle
        class="progress__bar"
        r="${radius}"
        cx="${oRadius}"
        cy="${oRadius}"
        fill="transparent"
        transform="rotate(-90 ${oRadius} ${oRadius})"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${dashOffset}"/>
      <text class="progress__percent" text-anchor="middle" x="50%" y="98">
        ${percentComplete}
      </text>
    </svg>
  </div>
  `;
  return div;
};
