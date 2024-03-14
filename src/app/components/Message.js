import { Avatar } from "@mui/material"
import { useState, useEffect } from "react";
import { useAppSelector } from '../../../lib/hooks';
import { doc, deleteDoc } from "firebase/firestore";
import { HiEllipsisVertical } from "react-icons/hi2";
import db from './firebase';
import index from "../page";


const Message = ({ id, user, textmessages, timestamp, input, setInput }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const selectChannelId = useAppSelector(state => state.app.channelId);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.message')) {
        setShowContextMenu(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    console.log("first")
    setShowContextMenu(!showContextMenu)
  }

  const handleDeleteClick = async () => {
    setShowContextMenu(false);
    await deleteDoc(doc(db, 'channels', selectChannelId, 'messages', id));
  };


  return (
    <div className="message max-w-xl group relative bg-gray-700 mb-2 ml-1 rounded-md" >

      <Avatar src={user.photo} />
      <div className="message__info">
        <h4 className="text-xs">{user.displayName}<span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span></h4>
        {/* {textmessages.filter((item) => {
          return input.toLowerCase() === '' ? item : (typeof item === 'string' && item.toLowerCase().includes(input));
        }).map((item, index) => (
          <p key={index}>{item}</p>
        ))} */}
      </div>
      <div onClick={handleRightClick}><HiEllipsisVertical size={20} className="text-white cursor-pointer" /></div>
      {showContextMenu ? (
        <div
          className="absolute z-10 w-max flex flex-col   px-4 py-3 gap-3 text-sm text-white bg-gray-800 rounded-lg shadow-xl"
          style={{ top: '5%', left: '100%', transform: 'translateX(-50%)' }}>
          <button onClick={handleDeleteClick} className="w-full text-start hover:bg-gray-700 hover:rounded-md px-3 py-2">Delete Message</button>
          <button className="w-full text-start hover:bg-gray-700 hover:rounded-md px-3 py-2">Copy</button>
        </div>
      ) : ""}
    </div>
  )
};

export default Message
