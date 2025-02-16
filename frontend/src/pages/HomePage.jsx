import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, isBroadcastSelected, selectedGroup } = useChatStore();

  return (
    <div className="h-screen w-screen flex bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Sidebar for Large Screens */}
      <div className="hidden md:flex w-[300px] bg-gray-950 border-r border-gray-700">
        <Sidebar />
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col h-full">
        {(!selectedUser && !isBroadcastSelected && !selectedGroup) ? (
          <NoChatSelected />
        ) : (
          <ChatContainer />
        )}
      </div>

      {/* Sidebar as Drawer for Mobile */}
      <div className="md:hidden fixed left-0 top-0 w-64 h-full bg-gray-950 z-50">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
