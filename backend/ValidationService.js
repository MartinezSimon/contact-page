// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    // Check required fields
    let result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("ahvNumber", data.ahvNumber);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("phoneNumber", data.phoneNumber);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("password", data.password);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("confirmPassword", data.confirmPassword);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("username", data.username);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) {
        return result;
    }

    //check length
    result = validateLib.checkLength("firstName", data.firstName, 3, 20);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkLength("lastName", data.lastName, 3, 20);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkLength("password", data.password, 6, 30);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkLength("confirmPassword", data.confirmPassword, 6, 30);
    if (result.isNotValid) {
        return result;
    }

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) {
        return result;
    }
    // check if phone number is valid
    result = validateLib.checkPhoneNumber("phoneNumber", data.phoneNumber)
    if (result.isNotValid) {
        return result;
    }
    // check if ahv number is valid
    result = validateLib.checkAhvNumber("ahvNumber", data.ahvNumber)
    if (result.isNotValid) {
        return result;
    }

    // check if password matches together
    result = validateLib.matchPasswords("password", data.password, "confirmPassword", data.confirmPassword);
    if (result.isNotValid) {
        return result;
    }


    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData
}
