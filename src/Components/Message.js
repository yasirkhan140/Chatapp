import { Box, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OwnerMessage from "./OwnerMessage";
import { useRef } from "react";

const Message =(props)=>{
    const {message,chatUser}  = props;
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [owner , setOwner] = useState(true);

    const ref =useRef()

    useEffect(()=>{
        if(message.senderId===currentUser.uid){
            setOwner(true);
        }else{
            setOwner(false);
        }
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[message.senderId,currentUser])
    console.log(message.date.seconds)
    return(
        <Box ref = {ref} 
            className="message"
            >
            {owner? <OwnerMessage message={message}/>: 
                <Box
                    
                    display='flex'
                    gap='10px'
                    p='10px'
                    m='3px'
                    >
                    <Box>
                        <Img 
                            boxSize='35px'
                            borderRadius='50%'
                            src={chatUser.photoURL}
                            alt='avtar'
                        />
                        <Text
                            as='span'
                            fontSize='xs'
                            >
                            {Date(message.date.seconds*100).slice(15,25)}
                        </Text>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column-reverse'
                        justifyContent='center'
                        >
                        {message.img&&
                            <Img
                                className='message-photo'
                                src={message.img}
                                alt='file photo'
                                maxHeight='60%'
                                maxWidth='75%'
                            />
                        }
                        <Text
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            p='10px'
                            bg='white'
                            minHeight='40px'
                            h='inherit'
                            maxWidth='250px'
                            borderRadius='0px 10px 10px 10px'>
                            {message.text}
                        </Text>
                    
                    </Box>
                </Box>
            }
        </Box>
    )
}
export default Message;