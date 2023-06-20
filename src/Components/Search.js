import { Box, Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../firebase";
import { collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where } from "firebase/firestore";

const Search =()=>{

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [userName ,setUserName] =useState('');
    const [user,setUser] = useState(null);
    const [err,setErr] = useState(false)

    const handleSelect= async()=>{
        if(currentUser.uid===user.uid){
            console.log("same")
            setErr(true)
        }else{
            const idCombine = 
                currentUser.uid>user.uid? 
                currentUser.uid+user.uid:
                user.uid+currentUser.uid
            ;
            try{
                const res = await getDoc(doc(db,'chats',idCombine))
                
                if(!res.exists()){
                    console.log("does'nt extists")
                    await setDoc(doc(db,"chats",idCombine),{
                        messages:[]}
                    )
                
                    await updateDoc(doc(db,"userChats",currentUser.uid),{
                        [idCombine+".userInfo"]:{
                            uid:user.uid,
                            displayName:user.displayName,
                            photoURL:user.photoURL,
                        },
                        [idCombine+'.date']: serverTimestamp()
                    });
                    await updateDoc(doc(db,"userChats",user.uid),{
                        [idCombine+".userInfo"]:{
                            uid:currentUser.uid,
                            displayName:currentUser.displayName,
                            photoURL:currentUser.photoURL,
                        },
                        [idCombine+'.date']: serverTimestamp()
                    });
                }
            }catch(err){
                console.log(err)
            }
        }
        setUser(null);
        setUserName('')
        setErr(false);
        
    }

    const handleSearch = async()=>{
        
        const q =query(
            collection(db,"users"),
            where("displayName" , "==" , userName)
        )
        try{
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc)=>{
                setUser(doc.data())
                setErr(false);
            })
        }catch(error){
            setErr(true);
        }
        
    }
    const {innerWidth} = window;
    if(innerWidth<786){
        handleSearch();
    }
    const handleKey  = e=>{
        e.code==="Enter"&& handleSearch();

    }
    return(
        <Box
            className='search-container'
            borderBottom='1px solid grey'
            >
            <Input
                className="input-search"
                placeholder="search contact"
                _placeholder={{color:'lightgrey'}}
                size='md'
                borderRadius='none'
                variant='unstyle'
                bg='transparent'
                color='#ddddf7'
                h='50px'
                value = {userName}
                onKeyDown={handleKey}
                onChange={e=>setUserName(e.target.value)}
            />

           {err&&<span style ={{color:'white'}}>Some error or user not found</span>}
            { user&& <Box 
                display ="flex"
                alignItems='center'
                w='100%'
                my='1'
                _hover={{background:'#1C0C5B'}}
                minHeight='50px'
                h='inherit'
                cursor='pointer'
                color='#ddddf7'
                onClick={handleSelect}
                >
                <Image
                    className ="nav-logo"
                    boxSize='48px'
                    objectFit='cover'
                    alt="avtar"
                    color="#ddddf7"
                    borderRadius='50%'
                    src={user.photoURL}>
                    
                </Image>
                <Text
                    className = "username"
                    size="sm"
                    as= "h5"
                    fontWeight='700'
                    >
                    {user.displayName}
                </Text>
            </Box>}
        </Box>
    )
}
export default Search;