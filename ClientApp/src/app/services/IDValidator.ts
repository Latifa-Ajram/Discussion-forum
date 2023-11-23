import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Custom validator function that checks if the value of passed id equals -1 and is of type numbers.
//If that is the case, then we should return that is the case and that it is required to choose something in the current form-field.
export function idValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const id = control.value;
    return id === -1 ? { required: true } : null;
  };
}
