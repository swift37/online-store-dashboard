import { InjectionToken } from '@angular/core';

export interface IDefaultErrors {
  required: (params: any) => string;
  maxlength: ({
    requiredLength,
    actualLength,
  }: {
    requiredLength: number;
    actualLength: number;
  }) => string;
  minlength: ({
    requiredLength,
    actualLength,
  }: {
    requiredLength: number;
    actualLength: number;
  }) => string;
  pattern: (params: any) => string;
  min: ({ min }: { min: number }) => string;
  max: ({ max }: { max: number }) => string;
  whitespace: (params: any) => string;
  forbiddenNames: (params: any) => string;
}

export const defaultErrors: IDefaultErrors = {
  required: () => `This field is required`,
  maxlength: ({ requiredLength, actualLength }) =>
    `Maximum ${requiredLength} characters are allowed, but you entered ${actualLength}`,
  minlength: ({ requiredLength, actualLength }) =>
    `Minimum ${requiredLength} characters are required, , but you entered ${actualLength}`,
  pattern: () => `Invalid format`,
  min: ({ min }) => `Minimum amount should be more than ${min}`,
  max: ({ max }) => `Maximum amount should be less than ${max}`,
  whitespace: () => `White spaces are not allowed`,
  forbiddenNames: () => `The full name must consist of two parts`,
};

export const DEFAULT_ERRORS: InjectionToken<IDefaultErrors> =
  new InjectionToken<IDefaultErrors>('DEFAULT_ERRORS', {
    factory: () => defaultErrors,
  });
