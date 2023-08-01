import React, { useState } from "react";
import { GET_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";

function Messages({
  conversationId,
  shouldRefetchMessages,
  setShouldRefetchMessages,
}) {
  const { loading, data, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Error fetching messages: {error.message}</p>;
  }

  if (shouldRefetchMessages) {
    refetch();
    setShouldRefetchMessages();
  }
  return (
    <>
      <div>
        {data.getMessages.map((message) => (
          <div key={message._id} className="flex border-2 m-2 p-2 rounded-lg w-44 h-9">
            <p className="flex flex-wrap content-center">{message.content}</p>
            {/* <p>Sender:{message.sender.username}</p> */}
            {/* <p>{message.createdAt}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Messages;
