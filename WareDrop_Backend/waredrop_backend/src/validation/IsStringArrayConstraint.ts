import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: 'isStringArray', async: false })
export class IsStringArrayConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (!Array.isArray(value)) {
            return false;
        }
        return value.every(item => typeof item === 'string');
    }

    defaultMessage(args: ValidationArguments) {
        return 'Each element of the array must be a string.';
    }
}

export function IsStringArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStringArrayConstraint,
        });
    };
}