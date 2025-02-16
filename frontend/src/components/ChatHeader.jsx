import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [isBlocked, setIsBlocked] = useState(authUser.blockedUsers?.includes(selectedUser?._id));

  const handleBlocking = async () => {
    if (isBlocked) await axiosInstance.post("user/unblock", { unblockUserId: selectedUser?._id });
    else await axiosInstance.post("user/block", { blockUserId: selectedUser?._id });
    setIsBlocked(!isBlocked);
  };

  return (
    <div className="p-4 border-b border-gray-300 bg-white shadow-md">
      <div className="flex items-center justify-between">
        {/* Left Section: Avatar + Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-gray-400 overflow-hidden">
              <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName} />
            </div>
            {/* Online Indicator */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                onlineUsers.includes(selectedUser?._id) ? "bg-green-500 border-white" : "bg-gray-400 border-gray-300"
              }`}
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{selectedUser?.fullName}</h3>
            <p className="text-sm text-gray-600">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex gap-3">
          {/* Block/Unblock Button */}
          <button
            onClick={handleBlocking}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              isBlocked ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {isBlocked ? "Unblock" : "Block"}
          </button>

          {/* Close Button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="p-2 text-gray-700 hover:bg-gray-200 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
