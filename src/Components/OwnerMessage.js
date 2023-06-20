import { Box, Img, Text } from "@chakra-ui/react";


const OwnerMessage =(props)=>{
    const {message} =props;
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(message.date)
    return(
        <Box
            display='flex'
            gap='10px'
            p='10px'
            m='3px'
            flexDirection='row-reverse'
            >
            <Box>
                <Img 
                    boxSize='35px'
                    borderRadius='50%'
                    src={currentUser.photoURL}
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
                alignItems='end'
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
                    bg='#8696FE'
                    color='white'
                    p='10px'
                    h='inherit'
                    minHeight='40px'
                    maxWidth='250px'
                    borderRadius='10px 0px 10px 10px'>
                    {message.text}
                </Text>
               
            </Box>
        </Box>
    )
}
export default OwnerMessage;