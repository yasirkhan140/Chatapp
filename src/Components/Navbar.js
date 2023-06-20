import { Box, Button, Heading, Image } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useToast } from "@chakra-ui/react";

const Navbar =()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const toast = useToast();
    const logOut = ()=>{
        localStorage.clear();
        signOut(auth)
        .then(()=>{
            toast({
                title:"Logout successfully",
                status:"success",
                duration:'3000',
                isClosable:true
            })
        })
        .catch((error)=>{
            toast({
                title:"Something get wrong",
                status:"error",
                duration:'3000',
                isClosable:true
            })
        })
    }
    return(
        <Box
            display="flex"
            bg="#00005C"
            h='60px'
            alignItems='center'
            justifyContent='space-between'
            p='10px'
            color='#ddddf7'
            >
           <Heading 
                className="nav-heading"
                size= 'sm'
                as = "h1"
                >
                Chating app
            </Heading> 
            <Box 
                display ="flex"
                alignItems='center'
                >
                <Image
                    className ="nav-logo"
                    boxSize='48px'
                    objectFit='cover'
                    alt="avtar"
                    color="#ddddf7"
                    borderRadius='50%'
                    src={user.photoURL}
                />
                    
                
                <Heading
                    className = "username"
                    size="sm"
                    as= "h5"
                    mr='1'
                    >
                    {user.displayName}
                </Heading>
                <Button 
                    size ="xs"
                    colorScheme="purple"
                    onClick={logOut}>
                    Log out
                </Button>
            </Box>
            
            
        </Box>
    )
}

export default Navbar;