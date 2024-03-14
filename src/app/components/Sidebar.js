'use client'
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../lib/hooks';
import { selectUser } from '../../../lib/features/user/userSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutLinedIcon from '@mui/icons-material/InfoOutLined';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@mui/material';
import db, { auth } from './firebase';
import { getDocs, addDoc, collection, onSnapshot } from "firebase/firestore";

const Sidebar = () => {
    const [channels, setChannels] = useState([]);
    const user = useAppSelector(selectUser);
    const selectChannelId = useAppSelector(state => state.app.channelId);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleAddChannel = async (e) => {
        e.preventDefault();
        const channelName = prompt("Add channel Name");
        if (channelName) {
            await addDoc(collection(db, "channels"), {
                channelName: channelName
            });
        }
    };
    //on getting by addDocs data will not be updating in realtime so use onSnapshot

    // useEffect(() => {
    //     const fetchdata = async () => {


    //         try {
    //             const querySnapshot = await getDocs(collection(db, "channels"));
    //             const channelsData = querySnapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 channel: doc.data(),
    //             }));
    //             setChannels(channelsData);
    //         } catch (error) {
    //             console.error("Error fetching channels:", error);
    //         }
    //     }
    //     fetchdata();
    // }, [])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "channels"), (querySnapshot) => {
            const channelsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                channel: doc.data(),
            }));
            setChannels(channelsData);
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);



    return (
        <div className='sidebar '>
            <div className="sidebar__top">
                <h3 className='bold'>TrickTalk</h3>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>

                <div className="sidebar__channelsList">
                    {channels.map((channel) => (
                        // console.log(channel),
                        <SidebarChannel key={channel.id} id={channel.id} channelName={channel.channel.channelName} />
                    ))}

                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    fontSize="large" />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutLinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar  src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>{user.uid.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons flex items-center">
                    <MicIcon />
                    <HeadsetIcon />
                    <div className="relative cursor-pointer text-sm"> {/* Ensure this div is only as big as the SettingsIcon */}
                        <SettingsIcon
                            onMouseEnter={() => setIsPopupVisible(true)}
                            />
                        {isPopupVisible && (
                            <div
                            className="absolute z-10 w-20 text-center p-2 text-sm text-white bg-gray-800 rounded shadow-lg"
                            style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' }} // Adjust this as needed
                            onMouseLeave={() => setIsPopupVisible(false)}
                            onClick={() => auth.signOut()}
                            >
                                Logout
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar
