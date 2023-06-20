import { createContext,useReducer } from "react";



export const ChatContext  = createContext();

export const ChatContextProvider = ({children})=>{
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const initialState  ={
        chatId:'null',
        user:{}
    }

    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:currentUser.uid>action.payload.uid? 
                        currentUser.uid+action.payload.uid:
                        action.payload.uid+currentUser.uid
                }
            default:
                return state;
        }
    }

    const [state,dispatch]= useReducer(chatReducer,initialState)


    return(
        <ChatContext.Provider value = {{data:state,dispatch}}>
            {children}
        </ChatContext.Provider>
    )

}


