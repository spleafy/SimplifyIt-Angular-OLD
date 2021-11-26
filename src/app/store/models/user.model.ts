export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  settings?: {
    profilePicturePath?: string;
    profileColor?: string;
  };
  registrationDate?: Date;
}
