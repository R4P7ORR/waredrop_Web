"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringArray = exports.IsStringArrayConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsStringArrayConstraint = class IsStringArrayConstraint {
    validate(value, args) {
        if (!Array.isArray(value)) {
            return false;
        }
        return value.every(item => typeof item === 'string');
    }
    defaultMessage(args) {
        return 'Each element of the array must be a string.';
    }
};
exports.IsStringArrayConstraint = IsStringArrayConstraint;
exports.IsStringArrayConstraint = IsStringArrayConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isStringArray', async: false })
], IsStringArrayConstraint);
function IsStringArray(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStringArrayConstraint,
        });
    };
}
exports.IsStringArray = IsStringArray;
//# sourceMappingURL=IsStringArrayConstraint.js.map