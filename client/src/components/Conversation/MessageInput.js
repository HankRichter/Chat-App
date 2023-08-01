import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";

// need to figure out how to send the senderId as a prop to this component.
function MessageInput({ conversationId, refetchMessages }) {
  const [content, setContent] = useState("");
  const [addMessage, { loading, error }] = useMutation(ADD_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addMessage({
        variables: {
          content: content,
          conversation: conversationId,
        },
      });

      console.log("Message created:", data.createMessage);

      setContent("");
      refetchMessages();
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  if (loading) {
    return <p>Creating message...</p>;
  }

  if (error) {
    return <p>Error creating message: {error.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type here"
        className="border-2 rounded m-1 p-1 w-56"
      />
      <button type="submit" className="border-2 rounded-lg m-1 px-3 p-1">Send</button>
    </form>
  );
}

export default MessageInput;
