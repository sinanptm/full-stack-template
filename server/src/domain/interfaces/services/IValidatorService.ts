export default interface IValidatorService {
  validateRequiredFields(input: object): void;
  validateEmailFormat(email: string): boolean;
  validateLength(field: string, minLength: number, maxLength?: number): boolean;
  validateIdFormat(id: string): boolean;
  validatePhoneNumber(phoneNumber: string): boolean;
  validateTimeFormat(time: string): boolean;
  validateEnum(field: string, enumValues: string[]): boolean;
  validatePassword(password: string): boolean;
  validateBoolean(value: any): boolean;
  validateMultipleIds(ids: string[]): boolean;
}
