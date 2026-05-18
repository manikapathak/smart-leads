type ValidatorFunction = (value: unknown) => string | null;

interface Validators {
  [key: string]: ValidatorFunction;
}

interface ValidationErrors {
  [key: string]: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export const validators: Validators = {

  username: (value: unknown): string | null => {

    if (!value) return 'Username is required';

    if (typeof value !== 'string') {
      return 'Username must be a string';
    }

    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }

    if (value.length > 30) {
      return 'Username must be at most 30 characters';
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Username can only contain letters, numbers and underscores';
    }

    return null;
  },

  email: (value: unknown): string | null => {

    if (!value) return 'Email is required';

    if (typeof value !== 'string') {
      return 'Email must be a string';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Email is not valid';
    }

    return null;
  },

  password: (value: unknown): string | null => {

    if (!value) return 'Password is required';

    if (typeof value !== 'string') {
      return 'Password must be a string';
    }

    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }

    return null;
  },

  name: (value: unknown): string | null => {

    if (!value) return 'Name is required';

    if (typeof value !== 'string') {
      return 'Name must be a string';
    }

    if (value.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }

    if (value.length > 50) {
      return 'Name must be at most 50 characters';
    }

    return null;
  },
    phone: (value: unknown): string | null => {

    if (!value) return 'Phone number is required';

    if (typeof value !== 'string') {
      return 'Phone number must be a string';
    }

    if (value.trim().length < 10) {
      return 'Phone number must be at least 10 characters';
    }

    if (value.length > 15) {
      return 'Phone Number must be at most 15 digits';
    }

    return null;
  },
};

export const validate = (
  fields: Record<string, unknown>
): ValidationResult => {

  const errors: ValidationErrors = {};

  for (const [field, value] of Object.entries(fields)) {

    if (validators[field]) {

      const error = validators[field](value);

      if (error) {
        errors[field] = error;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};