const html = require('choo/html');

module.exports = function(msg, confirmText, cancelText, confirmCallback) {
  function hide(e) {
    e.stopPropagation();
    const popup = document.querySelector('.popup.popup--show');
    if (popup) {
      popup.classList.remove('popup--show');
    }
  }

  return html`
  <div class="popup__wrapper">
    <div class="popup" onblur=${hide} tabindex="-1">
      <div class="popup__message">${msg}</div>
      <div class="popup__action">
        <span class="popup__no" onclick=${hide}>
          ${cancelText}
        </span>
        <span class="popup__yes" onclick=${confirmCallback}>
          ${confirmText}
        </span>
      </div>
    </div>
  </div>`;
};
