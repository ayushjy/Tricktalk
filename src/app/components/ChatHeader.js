import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useState } from 'react';
const ChatHeader = ({channelName}) => {
  const [search,setSearch] = useState("");
  console.log(search)
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3 className='bold'> <span className="chatHeader__hash">#</span> 
        {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <NotificationsIcon/>
        <EditLocationRoundedIcon/>
        <PeopleAltRoundedIcon/>
        <div className="chatHeader__search">
            <input placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
            <SearchRoundedIcon/>
        </div>
        <SendRoundedIcon/>
        <HelpRoundedIcon/>
      </div>
    </div>
  )
}

export default ChatHeader
