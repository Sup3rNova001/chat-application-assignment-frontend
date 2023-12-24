import { User } from "./User";
export interface ChatInterface {
  _id: string;
  participants: User[];
  messages: string[];
  latestMessage: {
    content: string;
  };
}
