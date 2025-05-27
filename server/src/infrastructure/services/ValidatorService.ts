import Joi from "joi";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { ValidationError } from "@/domain/entities/CustomErrors";
import { injectable } from "inversify";

@injectable()
export default class ValidatorService implements IValidatorService {
  /**
   * Validates that all fields in the input object are present and non-empty
   * @param input Object containing fields to validate
   * @throws ValidationError if any required field is missing or empty
   */
  public validateRequiredFields(input: object): void {
    const schema = Joi.object().keys(
      Object.keys(input).reduce(
        (acc, key) => {
          acc[key] = Joi.any().required();
          return acc;
        },
        {} as Record<string, Joi.Schema>,
      ),
    );

    const { error } = schema.validate(input, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(", ");
      this.throwError(`Missing or empty required fields: ${errorMessages}`, "validateRequiredFields");
    }
  }

  /**
   * Validates email format
   * @param email String to validate as an email address
   * @returns true if valid
   * @throws ValidationError if email format is invalid
   */
  public validateEmailFormat(email: string): boolean {
    const schema = Joi.string().email().required();
    const { error } = schema.validate(email);
    if (error) {
      this.throwError(`Invalid email format: ${email}`, "validateEmailFormat");
    }
    return true;
  }

  /**
   * Validates string length within specified bounds
   * @param field String to validate
   * @param minLength Minimum allowed length
   * @param maxLength Maximum allowed length (defaults to Infinity)
   * @returns true if valid
   * @throws ValidationError if length is invalid
   */
  public validateLength(field: string, minLength: number, maxLength: number = Infinity): boolean {
    const schema = Joi.string().min(minLength).max(maxLength).required();
    const { error } = schema.validate(field);
    if (error) {
      this.throwError(
        `Invalid length for field: expected ${minLength}-${maxLength} characters, got ${field.length}`,
        "validateLength",
      );
    }
    return true;
  }

  /**
   * Validates if string is a valid 24-character hexadecimal ID
   * @param id String to validate
   * @returns true if valid
   * @throws ValidationError if ID format is invalid
   */
  public validateIdFormat(id: string): boolean {
    const schema = Joi.string()
      .pattern(/^[a-fA-F0-9]{24}$/)
      .required();
    const { error } = schema.validate(id);
    if (error) {
      this.throwError(
        `Invalid ID format: ${id} must be a 24-character hexadecimal string`,
        "validateIdFormat",
      );
    }
    return true;
  }

  /**
   * Validates an array of 24-character hexadecimal IDs
   * @param ids Array of strings to validate
   * @returns true if all IDs are valid
   * @throws ValidationError if any ID format is invalid
   */
  public validateMultipleIds(ids: string[]): boolean {
    const schema = Joi.array()
      .items(
        Joi.string()
          .pattern(/^[a-fA-F0-9]{24}$/)
          .required(),
      )
      .required();
    const { error } = schema.validate(ids);
    if (error) {
      this.throwError(
        `Invalid ID format in array: ${error.details.map((detail) => detail.message).join(", ")}`,
        "validateMultipleIds",
      );
    }
    return true;
  }

  /**
   * Validates phone number format (4-15 characters)
   * @param phoneNumber String to validate
   * @returns true if valid
   * @throws ValidationError if phone number format is invalid
   */
  public validatePhoneNumber(phoneNumber: string): boolean {
    const schema = Joi.string().min(4).max(15).required();
    const { error } = schema.validate(phoneNumber);
    if (error) {
      this.throwError(
        `Invalid phone number format: ${phoneNumber} must be 4-15 characters`,
        "validatePhoneNumber",
      );
    }
    return true;
  }

  /**
   * Validates time format (HH:MM AM/PM)
   * @param time String to validate
   * @returns true if valid
   * @throws ValidationError if time format is invalid
   */
  public validateTimeFormat(time: string): boolean {
    const schema = Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/)
      .required();
    const { error } = schema.validate(time);
    if (error) {
      this.throwError(`Invalid time format: ${time} must be in "HH:MM AM/PM" format`, "validateTimeFormat");
    }
    return true;
  }

  /**
   * Validates if a field value is one of the allowed enum values
   * @param field String to validate
   * @param enumValues Array of allowed values
   * @returns true if valid
   * @throws ValidationError if value is not in enum
   */
  public validateEnum(field: string, enumValues: string[]): boolean {
    const schema = Joi.string()
      .valid(...enumValues)
      .required();
    const { error } = schema.validate(field);
    if (error) {
      this.throwError(`Invalid value: ${field}, expected one of: ${enumValues.join(", ")}`, "validateEnum");
    }
    return true;
  }

  /**
   * Validates password complexity
   * @param password String to validate
   * @returns true if valid
   * @throws ValidationError if password doesn't meet complexity requirements
   */
  public validatePassword(password: string): boolean {
    const schema = Joi.string()
      .min(6)
      .max(70)
      /**
       * To include one uppercase letter, one number, and one special character requirement,
       */
      // .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      .required();
    const { error } = schema.validate(password);
    if (error) {
      this.throwError(`Invalid password: must be 6-70 characters`, "validatePassword");
    }
    return true;
  }

  /**
   * Validates boolean value
   * @param value Value to validate
   * @returns true if valid
   * @throws ValidationError if value is not a boolean
   */
  public validateBoolean(value: any): boolean {
    const schema = Joi.boolean().required();
    const { error } = schema.validate(value);
    if (error) {
      this.throwError(`Invalid boolean value: ${value}`, "validateBoolean");
    }
    return true;
  }

  private throwError(message: string, location: string) {
    throw new ValidationError(message, `JoiService.${location}`);
  }
}
