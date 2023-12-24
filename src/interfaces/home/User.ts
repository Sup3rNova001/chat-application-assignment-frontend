export interface User {
  _id:string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  profilePic: {
    filename: string;
    url: string;
  };
  date: Date;
}
