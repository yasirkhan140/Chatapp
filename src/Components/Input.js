import { Box,Button,Input, Text, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import {AiFillFileAdd} from 'react-icons/ai'
import { ChatContext } from "../Context/UserChat";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Inputs =()=>{
    const {data} = useContext(ChatContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [text,setText] = useState("")
    const [img , setImg] = useState(null);
    // const [fileName,setFileName] = useState('');
    const toast  =useToast();
    const handleSend =async()=>{
        setImg(null);
        setText("")
        if(img){
            const storageRef = ref(storage, uuid());
            const uploadTask =  uploadBytesResumable(storageRef, img);
            
            uploadTask.on( 
               
                (error) => {
                    toast({
                        title:'Something get wrong',
                        status:"error",
                        duration:'2000',
                        isClosable:true
                    })
                    console.log(error);
                }, 
                () => {
                    console.log("")
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then(async(downloadURL) => {
                        console.log('Photo upload')
                        await updateDoc(doc(db,"chats",data.chatId),{
                            messages:arrayUnion({
                                id:uuid(),
                                text,
                                senderId:currentUser.uid,
                                date:Timestamp.now(),
                                img:downloadURL
                            })
                        })
                    })
                } 
            );
        }else{
            if(text==="" || text ===" "){
                toast({
                        title:"Type something",
                        status:"error",
                        duration:'1000',
                        isClosable:true
                    })
            }else{
                await updateDoc(doc(db,"chats",data.chatId),{
                    messages:arrayUnion({
                        id:uuid(),
                        text,
                        senderId:currentUser.uid,
                        date:Timestamp.now()
                    })
                })
            }
            
        }
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
    }
    const handleKey =(e)=>{
        e.code==="Enter"&& handleSend();
    }
    return(
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            bg='whitesmoke'
            w='100%'
            maxHeight='10%'
            >
            <Input
                type='text'
                variant='unstyled'
                p='10px'
                placeholder='Type a message' 
                _placeholder={{color:'grey'}}
                color='#2f2d52'
                fontSize='1.2rem'
                onChange={e=>setText(e.target.value)}
                value ={text}
                onKeyDown={handleKey}
            />
            <Box
                display='flex'
                alignItems='center'>

           
                <Input type='file' 
                    variant='unstyled'
                    display='none'
                    id='file'
                    onChange={e=>{setImg(e.target.files[0])}}
                />
                <Text>
                    
                </Text>
                <Text
                    as='label'
                    htmlFor='file'
                    fontSize='2rem'
                    color='#2f2d52'
                    cursor='pointer'
                    _hover={{color:'blue'}}>
                    <AiFillFileAdd/>
                </Text>
                <Button
                    variant='ghost'
                    colorScheme="purple"
                    _hover={{color:'blue'}}
                    textDecoration='none'
                    color='#2f2d52'
                    bg= 'blue.600'
                    width='60px'
                    height='40px'
                    onClick={handleSend}
                    mr='5px'
                    >
                    Send
                </Button>
            </Box>

                
        </Box>
    )
}
export default Inputs;