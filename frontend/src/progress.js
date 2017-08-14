import { bytes, percent } from './utils';

let percentText = null;
let text = null;
let title = null;
let bar = null;
let updateTitle = false;

const radius = 73;
const circumference = 2 * Math.PI * radius;

document.addEventListener('DOMContentLoaded', function() {
  percentText = document.querySelector('.percent-number');
  text = document.querySelector('.progress-text');
  bar = document.getElementById('bar');
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
  bar.setAttribute('stroke-dashoffset', (1 - ratio) * circumference);
  percentText.textContent = Math.floor(ratio * 100);
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
  text.textContent = str;
}

export { setProgress, setText };
