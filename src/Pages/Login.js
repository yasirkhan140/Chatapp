import { Button,Input,Heading,InputGroup,InputRightElement, Text, Box, useToast} from '@chakra-ui/react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../firebase';

import { signInWithEmailAndPassword } from 'firebase/auth';
const Login=()=>{
    const toast =useToast();
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const handleClick = () => setShow(!show)
  

    const handleLogin=(e)=>{
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        // dispatch(signInUser(username,password))
       
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            if(user){
                toast({
                    title:'Login successfully',
                    status:"success",
                    duration:'2000',
                    isClosable:true
                })
                navigate("/")
            }
        })
        .catch((error) => {
            toast({
                title:'Some thing get wrong',
                description:'try again',
                status:"error",
                duration:'2000',
                isClosable:true
            })
        });
      
    }
    return(
        <Box 
            className='login-container'
            display='flex'
            justifyContent='center'
            alignItems='center'
            h="100vh"
            bg="#82AAE3"
            > 
            <Box 
                className="Login-main" 
                maxW='394px'
                minWidth='36%'
                h='350px'
                boxShadow='2xl'
                rounded='md' 
                p='10'  
                bg="whitesmoke"
                m='2px'
                >

                <Heading 
                    className='name-heading' 
                    size="lg" 
                    textAlign='center'
                    mb='2'
                >Yasir chat</Heading>
                <Heading 
                    className='login-heading' 
                    as='h6' 
                    size ='md' 
                    textAlign='center' 
                    mb='5'
                >Login</Heading>
                <form className="login-form" onSubmit={handleLogin}>
                    <Text className="label-email">Email</Text>
                    <Input 
                        className="input-email" 
                        variant='flushed' 
                        type = "email" 
                        id= "email" 
                        name= "email" 
                        placeholder="Enter a email" 
                        required
                    />

                    <Text className="label-password"> Password</Text>
                    
                    <InputGroup size='md' >

                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            variant='flushed' 
                            required
                        />

                        <InputRightElement width='4.5rem'>
                            <Button
                                h='1.75rem' 
                                size='sm'
                                colorScheme='blue'
                                onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button 
                        type = "submit" 
                        colorScheme='purple' 
                        mt="3" 
                        w="100%" >
                        Login
                    </Button>
                </form>
                <Text mt= '2'>You don't have an account?<span> </span>
                    <Link to="/register" style={{color:'blue',textDecoration:'underline'}}>Register</Link>
                </Text>
                
            </Box>
        </Box>
    )

}


export default Login;