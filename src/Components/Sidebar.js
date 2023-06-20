import Navbar from "./Navbar";
import Search from "./Search";
import Chats from  './Chats'
import { Box } from "@chakra-ui/react";



const Sidebar =(props)=>{
   
   
    return(
        <Box 
        flex='1'
        borderRight='2px solid #3795BD'
        bg ="#37306B">
            <Navbar/>
            <Search/>
            <Chats />
        </Box>
    )
}

export default Sidebar;