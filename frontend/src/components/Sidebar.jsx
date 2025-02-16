import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, PlusCircle, Radio, UsersRound } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {
    users,
    selectedUser,
    getUsers,
    setSelectedUser,
    isUserLoading,
    isBroadcastSelected,
    setIsBroadcastSelected,
    groups,
    getGroups,
    setSelectedGroup,
    selectedGroup,
  } = useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getUsers, getGroups]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-80 border-r border-gray-200 flex flex-col bg-white shadow-md transition-all duration-200">
      {/* Sidebar Header */}
      <div className="border-b border-gray-200 w-full p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-semibold">Chats</span>
          </div>
          <Link to={"/create-group"} className="relative group">
            <PlusCircle className="size-6 cursor-pointer" />
            <span className="absolute hidden group-hover:inline-block px-2 py-1 bg-black text-white text-xs rounded-md -left-8">
              Create Group
            </span>
          </Link>
        </div>

        {/* Online Filter */}
        <div className="mt-4 flex items-center justify-between bg-white rounded-md px-3 py-2 shadow">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="size-4 accent-green-500 rounded-md"
            />
            <span className="text-sm font-medium text-gray-700">
              Friends Online
            </span>
          </label>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md shadow">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="overflow-y-auto w-full py-3 px-2">
        {/* Broadcast Section */}
        <button
          onClick={() => {
            setSelectedGroup(null);
            setSelectedUser(null);
            setIsBroadcastSelected(true);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
            isBroadcastSelected
              ? "bg-blue-100 ring-1 ring-blue-400"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="relative">
            <Radio className="size-10 text-blue-500" />
          </div>
          <div className="block text-left">
            <div className="font-medium text-gray-800">Broadcast</div>
          </div>
        </button>

        {/* Users List */}
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setIsBroadcastSelected(false);
              setSelectedGroup(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
              selectedUser?._id === user._id
                ? "bg-blue-100 ring-1 ring-blue-400"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-1 right-1 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <div className="block text-left">
              <div className="font-medium text-gray-800">{user.fullName}</div>
              <div className="text-sm text-gray-600">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Users Message */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-4">No online users</div>
        )}

        {/* Groups Section */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 px-3">Groups</h3>
          <div className="overflow-y-auto w-full py-3">
            {groups.map((group) => (
              <button
                key={group._id}
                onClick={() => {
                  setSelectedGroup(group);
                  setIsBroadcastSelected(false);
                  setSelectedUser(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  selectedGroup?._id === group._id
                    ? "bg-blue-100 ring-1 ring-blue-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <UsersRound className="size-10 text-indigo-500" />
                </div>
                <div className="block text-left">
                  <div className="font-medium text-gray-800">
                    {group.groupName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {group.members.length} members
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
