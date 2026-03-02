import React from 'react'

export default function CloseFriend({ user }) {
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
        <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="sidebarFriendImg"/>
        <span className="sidebarFriendname">{user.username}</span>
    </li>
  );
}
