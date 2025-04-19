import { AbstractControl, ValidationErrors } from "@angular/forms";

export function uuidValidator(control: AbstractControl): ValidationErrors | null {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const value = control.value;
  if (!value || uuidRegex.test(value)) {
    return null;
  }
  return { invalidUUID: true };
}
