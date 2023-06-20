import { Box, Heading, Image } from "@chakra-ui/react";
import {IoIosVideocam} from "react-icons/io"
import {HiUserPlus} from "react-icons/hi2"
import {BsThreeDots} from "react-icons/bs"

import Messages from "./Messages";
import Inputs from './Input'
import { useContext,} from "react";
import { ChatContext } from "../Context/UserChat";
import { FakeInput, FakeMessges } from "../loading/ChatsLoading";


const Chat =()=>{
    const {data} = useContext(ChatContext)
    
   
    return(
        
        <Box
            className="chat"
            flex='2'
           >
            <Box
                className="navbar-chat"
                display='flex'
                alignItems='center'
                bg='#3E54AC'
                justifyContent='space-between'
                h='50px'
                p='10px'>
                <Box 
                    display='flex'
                    alignItems='center'>
                    <Image 
                        src={data.user.photoURL}
                        boxSize='48px'
                        borderRadius="50%"
                    />
                    <Heading
                        className="username-chat"
                        as ='h5'
                        color='lightgrey'
                        fontSize='1.3rem'
                        mx='5px'
                        >
                        {!data.user.displayName?"Select user to Chat":data.user.displayName }
                        
                    </Heading>
                </Box>
                
                <Box
                    className="icons-box"
                    display="flex"
                    alignItems='center'
                    w='110px'
                    justifyContent='space-between'
                    color='#ddddf4'
                    > 
                    <IoIosVideocam style={{cursor:"pointer",fontSize:"25px"}}/>
                    <HiUserPlus style={{cursor:"pointer",fontSize:"25px"}}/>
                    <BsThreeDots style={{cursor:"pointer",fontSize:"25px"}}/>
                </Box>
               
            </Box>
            {!data.user.displayName ? <FakeMessges/> :<Messages chatUser = {data.user}/>}
            {!data.user.displayName ? <FakeInput/> :<Inputs/>}
            
        </Box>
    )
}
export default Chat;

