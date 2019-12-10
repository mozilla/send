function validate(password, ruleList) {
  let errors = [];
  ruleList.forEach(function(ruleStruct) {
    let constructor = validationRules[ruleStruct.type];
    let validationRule = constructor(ruleStruct);
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
  maxLength: function(args) {
    return maxLengthValidate(args.length);
  },
  minLength: function(args) {
    return minLengthValidate(args.length);
  },
  containsNumber: function(args) {
    return containsCharacterClass(/[0-9]/g, args.count, 'numbers');
  },
  containsSpecials: function(args) {
    return containsCharacterClass(
      /[@$!%*#?&]/g,
      args.count,
      'special characters'
    );
  }
};

module.exports = {
  passwordValidate: validate
};
