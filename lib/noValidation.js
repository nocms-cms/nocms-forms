'use strict';

// https://github.com/miles-no/no-validation

module.exports = function () {
  var mod11OfNumberWithControlDigit = function mod11OfNumberWithControlDigit(input) {
    var controlNumber = 2,
        sumForMod = 0,
        i,
        result;

    for (i = input.length - 2; i >= 0; --i) {
      sumForMod += input.charAt(i) * controlNumber;
      if (++controlNumber > 7) {
        controlNumber = 2;
      }
    }
    result = 11 - sumForMod % 11;

    return result === 11 ? 0 : result;
  };

  var accountNumber = function accountNumber(_accountNumber) {
    if (!_accountNumber) {
      return false;
    }
    _accountNumber = _accountNumber.toString().replace(/\./g, '');
    if (_accountNumber.length !== 11) {
      return false;
    }
    return parseInt(_accountNumber.charAt(_accountNumber.length - 1), 10) === mod11OfNumberWithControlDigit(_accountNumber);
  };

  var organizationNumber = function organizationNumber(orgNumber) {
    orgNumber += '';
    if (!orgNumber || orgNumber.length !== 9) {
      return false;
    }
    return parseInt(orgNumber.charAt(orgNumber.length - 1), 10) === mod11OfNumberWithControlDigit(orgNumber);
  };

  var birthNumber = function birthNumber(_birthNumber) {
    _birthNumber = _birthNumber.toString();
    if (!_birthNumber || _birthNumber.length !== 11) {
      return false;
    }

    var sum = function sum(number, factors) {
      var sum = 0;
      for (var i = 0, l = factors.length; i < l; ++i) {
        sum += parseInt(number.charAt(i), 10) * factors[i];
      }
      return sum;
    };

    var checksum1 = 11 - _sum(_birthNumber, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11;
    if (checksum1 === 11) checksum1 = 0;
    var checksum2 = 11 - _sum(_birthNumber, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11;
    if (checksum2 === 11) checksum2 = 0;
    return checksum1 === parseInt(_birthNumber.charAt(9), 10) && checksum2 === parseInt(_birthNumber.charAt(10), 10);
  };

  var kidNumber = function kidNumber(_kidNumber) {
    _kidNumber = _kidNumber.toString();
    var controlDigit = _kidNumber.charAt(_kidNumber.length - 1);
    return parseInt(controlDigit, 10) === mod11OfNumberWithControlDigit(_kidNumber) || parseInt(controlDigit, 10) === luhnValue(_kidNumber);
  };

  var luhnValue = function luhnValue(number) {
    var sum = 0,
        dbl = 0,
        i;
    for (i = number.length - 2; i >= 0; i -= 2) {
      dbl = (parseInt(number.charAt(i), 10) * 2).toString();
      sum += parseInt(dbl.charAt(0), 10) + parseInt(dbl.charAt(1) || 0, 10);
    }
    for (i = number.length - 3; i >= 0; i -= 2) {
      sum += parseInt(number.charAt(i), 10);
    }
    sum = sum.toString();
    return 10 - parseInt(sum.charAt(sum.length - 1), 10);
  };

  return {
    accountNumber: accountNumber,
    organizationNumber: organizationNumber,
    birthNumber: birthNumber,
    kidNumber: kidNumber
  };
}();
//# sourceMappingURL=noValidation.js.map