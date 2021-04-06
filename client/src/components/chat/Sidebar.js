import React, {useState,useEffect} from 'react';
import "../../css/Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(currentUser.uid).collection('friends').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line
    },[]); 

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://cdn.hashnode.com/res/hashnode/image/upload/v1610800167922/SFTAjmhl3.jpeg" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon style={{color: '#eff2f5'}} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{color: '#eff2f5'}} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{color: '#eff2f5'}} />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                    {rooms.map(room=> (
                        <SidebarChat key={room.id} id={room.id} name={room.data.friendName}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar