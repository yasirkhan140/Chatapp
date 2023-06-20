import { Box, Button, Image, Input, Skeleton, Stack, Text } from "@chakra-ui/react";
import { AiFillFileAdd } from "react-icons/ai";


 export const ChatsLoading =()=>{
    return(
        <Stack 
            position="relative"
            left='10px'            
            w='95%'>
            <Skeleton height='40px' />
            <Skeleton height='40px' />
            <Skeleton height='40px' />
            <Skeleton height='40px' />
            <Skeleton height='40px' />
            <Skeleton height='40px' />
        </Stack>
    )
}

export const ChatLoading = ()=>{
    return(
        <Stack      
            >
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />            
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />           
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>
    )
}

export const FakeInput = ()=>{
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
                placeholder='Select a user to chat' 
                _placeholder={{color:'black'}}
                color='#2f2d52'
                fontSize='1.2rem'
                value ="Select a user to chat"
                disabled
            />
            <Box
                display='flex'
                alignItems='center'>
                <Input type='file' 
                    variant='unstyled'
                    display='none'
                    id='file'
                    disabled
                />
                <Text>
                    
                </Text>
                <Text
                    as='label'
                    htmlFor='file'
                    fontSize='2rem'
                    color='#2f2d52'
                    >
                    <AiFillFileAdd/>
                </Text>
                <Button
                    color='#2f2d52'
                    bg= 'blue.600'
                    width='100px'
                    height='40px'
                    mr='5px'
                    type= 'submit'
                    disabled
                    >
                    Click User
                </Button>
            </Box>

                
        </Box>
    )
}

export const FakeMessges = ()=>{
    return(
        <Image
            src = 'https://cdn5.vectorstock.com/i/1000x1000/58/09/concept-online-chat-man-and-woman-vector-26235809.jpg'
            alt = "chat"
            height='87%'
            minHeight='250px'
            w='100%'
        />
    )
    
}

