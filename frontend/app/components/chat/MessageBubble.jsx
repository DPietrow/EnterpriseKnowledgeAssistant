import AssistantBubble from "./AssistantBubble";
import UserBubble from "./UserBubble";

export default function MessageBubble({ message }) {

  if (message.role === "user") {

    return <UserBubble message={message} />;

  }

  return <AssistantBubble message={message} />;

}