import { Button,Input,Heading,InputGroup,InputRightElement, Text, Box, FormHelperText, FormControl,useToast} from '@chakra-ui/react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth,storage,db} from '../firebase';
import {doc,setDoc} from 'firebase/firestore';
import { AiFillFileAdd } from 'react-icons/ai';

const SignUp=()=>{
    const navigate  = useNavigate();
    const toast =useToast();
    
    const [show,setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [fileName,setFileName]= useState();
    const [password ,setPassword] = useState(' ');
    const [confirmPassword,setConfirmPass] = useState('');
   
    
    const handleSumbit = async (e)=>{
        
        if(password!==confirmPassword){
            alert("enter same password")
            e.preventDefault();
        }
        e.preventDefault();
        const userName = e.target[0].value;
        // first name 
        const tempName = e.target[1].value;
        var name;
        if(!e.target[2].value){
            name =tempName.trim();
            
        }else{
            name = tempName.concat(" "+e.target[2].value)
        }
        
        const email = (e.target[3].value).toLowerCase();
        const file = (e.target[7].files[0]);
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, name);
            
            const uploadTask =  uploadBytesResumable(storageRef, file);
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
                   
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then(async(downloadURL) => {
                        console.log(downloadURL);
                        await updateProfile(res.user,{
                            displayName:name,
                            photoURL:downloadURL,
                        });
                        
                        await setDoc(doc(db,"users",res.user.uid),{
                            userName:userName,
                            uid:res.user.uid,
                            displayName:name,
                            email:email,
                            photoURL:downloadURL,
                        });
                        
                        await setDoc(doc(db,"userChats",res.user.uid),{})
                    })
                    
                    navigate('/')
                }

                
            );
            
        }catch(err){
            toast({
                title:'Already you hava a account',
                description:'OR something get wrong',
                status:"error",
                duration:'3000',
                isClosable:true
            })
            console.log(err)
            
        }
    }
    return(
        <Box 
            className='signup-container'
            h="100vh"
            display='flex'
            justifyContent='center'
            alignItems='center'
            background="#A084DC"
            >
            <Box 
                className="sign-main" 
                maxW='32rem'
                minWidth='35%' 
                h='660px' 
                boxShadow='2xl'
                rounded='md' 
                p='10'
                m='3'
                bg="whitesmoke"
                >

                <Heading 
                    className='name-heading' 
                    size="lg" 
                    textAlign='center'
                    mb='2'>
                    Yasir chat
                </Heading>

                <Heading 
                    className='login-heading' 
                    as='h6' 
                    size ='md' 
                    textAlign='center' 
                    mb='5'>
                    Sign Up
                </Heading>
                <FormControl>
                    <form className="login-form" onSubmit={handleSumbit}>
                        <Text className="label-username" fontWeight='700'>
                            User name
                        </Text>

                        <Input 
                            className="input-username"
                            variant='flushed' 
                            type = "text" 
                            id= "username" 
                            name= "username" 
                            placeholder="Enter a unquie user name" 
                            required
                        />

                        <Text className="label-firstname" fontWeight='700'>
                            First Name
                        </Text>

                        <Input 
                            className="input-firstnmae" 
                            variant='flushed' 
                            type = "text" 
                            id= "firstName" 
                            name= "firstName" 
                            placeholder="Enter a first name" 
                            required
                        />
                        <Text className="label-lastname" fontWeight='700'>
                            Last name
                        </Text>

                        <Input 
                            className="input-lastname" 
                            variant='flushed' 
                            type = "text" 
                            id= "lastName" 
                            name= "lastName" 
                            placeholder="Enter a last name"
                        />
                        <Text className="label-email" fontWeight='700'>
                            Email
                        </Text>

                        <Input 
                            className="input-email" 
                            variant='flushed' 
                            type = "email" 
                            id= "email" 
                            name= "email" 
                            placeholder="Enter a email id" 
                            required
                        />



                        <Text 
                            className="label-password" 
                            fontWeight='700'> 
                            Password
                        </Text>
                        
                        <InputGroup size='md' >

                            <Input
                                id='password'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                variant='flushed'
                                onChange={e=>setPassword(e.target.value)}
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

                        <Text 
                            className="label-password" 
                            fontWeight='700'> 
                            Confirm Password
                        </Text>
                        

                        <Input
                            id='confirm-password'
                            type='password'
                            placeholder='Enter again password'
                            variant='flushed' 
                            onChange= {e=>setConfirmPass(e.target.value)}
                            required
                        />
                        {password!==confirmPassword ? (
                            <FormHelperText color='red'>Password not matched</FormHelperText>
                        ):(
                            <FormHelperText color= 'green'>Password matched</FormHelperText>
                        )}
                        <Input 
                            type='file' 
                            variant='unstyled'
                            display='none'
                            id='file'
                            onChange={e=>setFileName(e.target.value.slice(12))}
                            required
                        />
                        <Text
                            as='label'
                            htmlFor='file'
                            fontSize='2rem'
                            color='#2f2d52'
                            display='flex'
                            alignItems='center'
                            m='0'
                            p='0'
                            cursor='pointer'
                            _hover={{color:'blue'}}
                            >
                            <AiFillFileAdd style={{display:"flex"}}/>
                            <Text
                                fontSize='0.8rem'
                                >
                                {fileName}
                            </Text>
                        </Text>
                        <Button 
                            type = 'submit'
                            colorScheme='purple' 
                            mt="3" 
                            w="100%" >
                            Sign Up
                        </Button>
                    </form>
                </FormControl>
                <Text mt= '2'>You have an account?<span> </span>
                    <Link to="/login" style={{color:'blue',textDecoration:'underline'}}>Login</Link>
                </Text>
                
            </Box>
        </Box>
    )

}


export default SignUp;
