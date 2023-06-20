import { Box, Container, Image, Text } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useContext } from "react";
import { ChatContext } from "../Context/UserChat";

import { ChatsLoading } from "../loading/ChatsLoading";



const Chats =()=>{
    const [chats ,setChats]= useState([]);
    const [loading,setLoading] = useState(true);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    const {dispatch} = useContext(ChatContext);

    

    useEffect(()=>{
        const getChats=()=>{
            const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
                setChats(doc.data())
                setLoading(false)
            })
            return ()=>{
                unsub();
            }
            
        }
        currentUser.uid&&getChats()
    },[currentUser.uid])

    const handleClick =(e)=>{
        dispatch({type:"CHANGE_USER",payload:e})
        
    }
    return(
        <Box
            as='section'>
                {loading ?<ChatsLoading/>: Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>
                    <Box 
                        className="chats"
                        key={chat[0]}
                        display ="flex"
                        alignItems='center'
                        w='100%'
                        m='3px'
                        p='3px'
                        _hover={{background:'#1C0C5B'}}
                        minHeight='55px'
                        color='#ddddf7'
                        cursor='pointer'
                        onClick={()=>handleClick(chat[1].userInfo)}
                        >
                        <Image
                                className ="nav-logo"
                                boxSize='48px'
                                objectFit='cover'
                                alt="avtar"
                                color="#ddddf7"
                                borderRadius='50%'
                                src={chat[1].userInfo.photoURL}
                                >
                                
                            </Image>
                            <Container
                                display='flex'
                                flexDirection='column'
                                alignItems='baseline'
                                ml='-2.5'>
                                <Text
                                    className = "username"
                                    as= "h5"
                                    fontWeight='700'
                                    mb='0'
                                    >
                                    {chat[1].userInfo.displayName}
                                </Text>
                                <Text
                                    className="last-message"
                                    as='p'
                                    fontSize='0.89rem'
                                    >
                                    {chat[1].lastMessage?.text}
                                </Text>
                            </Container>
                    </Box>
                )}
        </Box>
    )
}

export default Chats;