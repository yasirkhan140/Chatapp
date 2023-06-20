import { Box } from "@chakra-ui/react";
import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../Context/UserChat";
import { ChatLoading } from "../loading/ChatsLoading";


const Messages =(props)=>{
    const {data} = useContext(ChatContext);
    const [loading,setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        setLoading(true)
        const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists()&& setMessages(doc.data().messages,setLoading(false))
        })
        return ()=>{
            unsub()
            
        }   
    },[data.chatId]) 


    return(
       
            <Box

                className="main-box-messages"
                bg='#ddddf7'
                p="10px"
                height='86.9%'
                overflowY='scroll'
                >
                {loading ?<ChatLoading/> : messages.map((m,index)=>(
                    <Message message = {m} chatUser ={data.user} key={index}/>
                ))}
            </Box>
    )
}

export default Messages;