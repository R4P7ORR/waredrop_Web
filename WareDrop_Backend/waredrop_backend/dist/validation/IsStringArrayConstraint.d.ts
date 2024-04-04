import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare class IsStringArrayConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsStringArray(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
