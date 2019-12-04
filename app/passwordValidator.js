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

function lengthValidate(length) {
  return function(password) {
    if (password.length >= length) {
      return new ValidationError('maxPasswordLength', {
        length
      });
    }
    return null;
  };
}

let validationRules = {
  length_32: lengthValidate(32)
};

module.exports = {
  passwordValidate: validate
};
