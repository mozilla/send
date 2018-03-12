const html = require('choo/html');
const percent = require('../../utils').percent;

const radius = 73;
const oRadius = radius + 10;
const oDiameter = oRadius * 2;
const circumference = 2 * Math.PI * radius;

module.exports = function(progressRatio, indefinite = false) {
  // HACK - never indefinite for MS Edge
  if (/edge/i.test(navigator.userAgent)) {
    indefinite = false;
  }
  const p = indefinite ? 0.2 : progressRatio;
  const dashOffset = (1 - p) * circumference;
  const progressPercent = html`
    <text class="progress__percent" text-anchor="middle" x="50%" y="98">
      ${percent(progressRatio)}
    </text>`;

  return html`
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
        class="progress__indefinite ${indefinite ? '' : 'progress--invisible'}"
        r="${radius}"
        cx="${oRadius}"
        cy="${oRadius}"
        fill="transparent"
        transform="rotate(-90 ${oRadius} ${oRadius})"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${dashOffset}"/>
      <circle
        class="progress__bar ${indefinite ? 'progress--invisible' : ''}"
        r="${radius}"
        cx="${oRadius}"
        cy="${oRadius}"
        fill="transparent"
        transform="rotate(-90 ${oRadius} ${oRadius})"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${dashOffset}"/>
        ${indefinite ? '' : progressPercent}
    </svg>
  </div>
  `;
};
