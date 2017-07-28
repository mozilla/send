if (navigator.userAgent.toLowerCase().indexOf('msie') > -1 ||
    !!navigator.userAgent.toLowerCase().match(/trident\/7\./)) {
  window.location.replace('/unsupported/ie');
}