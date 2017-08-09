const { bytes, percent } = require('./utils');
const $ = require('jquery');
require('jquery-circle-progress');

let $progress = null;
let $percent = null;
let $text = null;
let title = null;
let updateTitle = false;

document.addEventListener('DOMContentLoaded', function() {
  $percent = $('.percent-number');
  $text = $('.progress-text');
  $progress = $('.progress-bar');
  $progress.circleProgress({
    value: 0.0,
    startAngle: -Math.PI / 2,
    fill: '#3B9DFF',
    size: 158,
    animation: { duration: 300 }
  });
  title = document.querySelector('title');
});

document.addEventListener('blur', function() {
  updateTitle = true;
});

document.addEventListener('focus', function() {
  updateTitle = false;
  return title && (title.textContent = 'Firefox Send');
});

function setProgress(params) {
  const ratio = params.complete / params.total;
  $progress.circleProgress('value', ratio);
  $percent.text(Math.floor(ratio * 100));
  if (updateTitle) {
    title.textContent = percent(ratio);
  }
  document.l10n
    .formatValue('fileSizeProgress', {
      partialSize: bytes(params.complete),
      totalSize: bytes(params.total)
    })
    .then(setText);
}

function setText(str) {
  $text.text(str);
}

module.exports = {
  setProgress,
  setText
};
