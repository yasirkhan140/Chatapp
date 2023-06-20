import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";
import { Box, Container } from '@chakra-ui/react'
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/UserChat";


function Home (props){
    const [mobile,setMobile] = useState(false);
    const {innerWidth} = window;
    const {data} = useContext(ChatContext);
    const {user} = props
    localStorage.setItem('user',JSON.stringify(user))
    useEffect(()=>{
        setMobile(false)
        if(innerWidth<528){
            setMobile(true);
        }
    },[innerWidth,data.user])
    
   const handleBack =()=>{
        
   }
    return(
        
        <Container className= 'home-box'
            h='100vh'
            bg='purple.400'
            maxW='100vw'
            display='flex'
            alignItems='center'
            justifyContent='center'
            onClick ={handleBack}
            >
            

            <Box 
                className="main-box"
                border ="1px solid white"
                display="flex"
                w="60%"
                h='80%'
                borderRadius='10px'
                overflow='hidden'>
                {mobile ? 
                    <>
                        {!data.user.displayName ? 
                            <Sidebar/>:
                            <Chat/>
                        }
                    </> : 
                    <>
                        <Sidebar />
                        <Chat /> 
                    </>
                }
            </Box>
        </Container>
    )
}



export default Home;