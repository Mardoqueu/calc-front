/**
 * Interface representing user properties.
 *
 * @interface UserProps
 *
 * @property {FormDataEntryValue | null} userName - The user name property, which could be a string or null.
 * @property {FormDataEntryValue | null} password - The password property, which could be a string or null.
 */
export interface UserProps {
  userName: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}