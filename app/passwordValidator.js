function validate(password, ruleList) {
  let errors = [];
  ruleList.forEach(function(ruleName) {
    let validationRule = validationRules[ruleName];
    if (validationRule != null) {
      let error = validationRule(password);
      if (error != null) {
        errors.push(error);
      }
    }
  });

  return errors;
}

class ValidationError {
  constructor(translationKey, args) {
    this.translationKey = translationKey;
    this.args = args;
  }
}

function maxLengthValidate(length) {
  return function(password) {
    if (password.length >= length) {
      return new ValidationError('maxPasswordLength', {
        length
      });
    }
    return null;
  };
}

function minLengthValidate(length) {
  return function(password) {
    if (password.length < length) {
      return new ValidationError('minPasswordLength', {
        length
      });
    }
    return null;
  };
}

function containsCharacterClass(regex, count, classDescription) {
  return function(password) {
    let matches = password.match(regex);
    if (matches == null || matches.length < count) {
      return new ValidationError('characterClass', {
        classDescription,
        count
      });
    }
    return null;
  };
}

let validationRules = {
  length_32: maxLengthValidate(32),
  min_24: minLengthValidate(24),
  number_1: containsCharacterClass(/[0-9]/g, 1, 'number'),
  special_1: containsCharacterClass(/[@$!%*#?&]/g, 1, 'special characters')
};

module.exports = {
  passwordValidate: validate
};
