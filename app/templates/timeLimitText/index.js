module.exports = function(translate, seconds) {
  const displayText = {
    300: translate('timespanMinutes', { num: 5 }),
    3600: translate('timespanHours', { num: 1 }),
    86400: translate('timespanHours', { num: 24 }),
    604800: translate('timespanWeeks', { num: 1 }),
    1209600: translate('timespanWeeks', { num: 2 })
  };

  if (displayText[seconds]) {
    return displayText[seconds];
  }
  return seconds;
};
