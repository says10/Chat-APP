import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import BroadcastHeader from "./BroadcastHeader";
import GroupChatHeader from "./GroupChatHeader";
import bgTexture from "../assets/blue-texture.jpg"

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessageLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    isBroadcastSelected,
    getBroadcastMessage,
    selectedGroup,
    getGroupMessages,
    userIdToUserMap,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (isBroadcastSelected) {
      getBroadcastMessage();
    } else if (selectedUser?._id) {
      getMessages(selectedUser._id);
    } else if (selectedGroup?._id) {
      getGroupMessages(selectedGroup._id);
    }

    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    isBroadcastSelected,
    subscribeToMessages,
    unsubscribeFromMessages,
    selectedGroup?._id,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading)
    return (
      <div 
        className="flex-1 flex flex-col overflow-auto pt-14 pb-4"
        style={{  backgroundImage: `url(${bgTexture})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div 
      className="flex-1 flex flex-col overflow-auto pt-14 pb-4"
      style={{  backgroundImage: `url(${bgTexture})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Header Section */}
      {selectedGroup ? (
        <GroupChatHeader />
      ) : isBroadcastSelected ? (
        <BroadcastHeader />
      ) : (
        <ChatHeader />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId == authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border border-black/20">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedGroup
                      ? userIdToUserMap[message.senderId]?.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt=""
                />
              </div>
            </div>

            {/* Message Content */}
            <div className="chat-header mb-1">
              <time className="text-xs text-black/70 opacity-80">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div
              className={`chat-bubble ${message.senderId == authUser._id ? "bg-gray-800 text-white" : "bg-white text-black"} flex flex-col shadow-md`}
            >
              {/* Show sender's name in group chat */}
              {selectedGroup && message.senderId !== authUser._id && (
                <span className="text-xs font-bold mb-1 text-black">
                  {userIdToUserMap[message.senderId]?.fullName || "Unknown User"}
                </span>
              )}

              {/* Image Message */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 border border-black/20"
                />
              )}

              {/* Text Message */}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
