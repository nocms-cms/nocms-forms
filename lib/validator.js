'use strict';

var noValidation = require('./noValidation');
var moment = require('moment');

module.exports = {
  validate: function validate(value, validationRule, isRequired) {
    if (!value && isRequired) {
      return false;
    } else if (!value && !isRequired) {
      return true;
    } else {
      if (validationRule === 'email') {
        var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return emailRegex.test(value);
      }

      if (validationRule === 'notEmpty') {
        return value.trim() !== '';
      }

      if (validationRule === 'phone') {
        return (/^((0047)?|(\+47)?|(47)?)\d{8}$/.test(value.replace(/\s/g, ''))
        );
      }

      if (validationRule === 'datetime') {
        if (/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}$/.test(value)) {
          try {
            return new Date(value).toISOString().indexOf(value) === 0;
          } catch (ex) {
            return false;
          }
        }
      }

      if (validationRule === 'date') {
        if (/^\d{4}\-\d{2}\-\d{2}$/.test(value)) {
          try {
            return new Date(value).toISOString().indexOf(value) === 0;
          } catch (ex) {
            return false;
          }
        }
        return moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY') === value;
      }

      if (validationRule === 'int') {
        return !isNaN(value) && function (x) {
          return (x | 0) === x;
        }(parseFloat(value));
      }

      if (validationRule === 'orgNumber') {
        return noValidation.organizationNumber(value);
      }

      if (validationRule === 'accountNumber') {
        return noValidation.accountNumber(value);
      }

      if (validationRule === 'confirm') {
        return !!value;
      }

      if (validationRule === 'internalUri') {
        return (/^\/[a-z0-9\-_\/]+$/i.test(value)
        );
      }

      try {
        var patternRegex = new RegExp('^' + validationRule + '$');
        return patternRegex.test(value);
      } catch (e) {
        console.error('Invalid regex: ', validationRule);
      }
    }
    return false;
  }
};
//# sourceMappingURL=validator.js.map