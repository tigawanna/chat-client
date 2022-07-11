
import './App.css';
import Card from './components/Card';
import ChatForm from './components/ChatForm';
import { NewChatDocument, useChatsQuery} from './generated/graphql';
import { useEffect } from 'react';
import { useState } from 'react';


function App() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {subscribeToMore ,...result} = useChatsQuery()
console.log("fetched result========= ",result.error)
const[sending,setSending]=useState(true)

const subscribeToNewComments=() =>{
  subscribeToMore({
    document: NewChatDocument,
     updateQuery: (prev, { subscriptionData  }) => {
      // console.log("the subscription data ===== ",subscriptionData,prev)
      console.log("is this sending======  ",sending)
      if (!subscriptionData.data){
        console.log("no subscription data ===== ",prev,subscriptionData)
        return prev
      }
      // const { mutation, node } = subscriptionData.data.Message;
      // if (mutation !== 'CREATED') return prev;
    
    //@ts-ignore
      const newFeedItem= subscriptionData.data.newChat;
      console.log("new feed subscribed data ===== ",newFeedItem)
      console.log("prev data in cache ===== ",prev)
      setSending(false)

    //   const newObj =Object.assign({}, prev, {
    //   chats: [newFeedItem,...prev.chats]
    //   });
    // //  console.log("new object after merging ===== ",newObj)
    //   return newObj
    return{
      chats: [newFeedItem,...prev.chats]
    }

    } })
}

useEffect(() => {
subscribeToNewComments()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


 return (
    <div className="h-screen w-screen flex flex-col justify-between items-center 
    overflow-x-hidden overflow-y-hidden ">
     <div className="w-full text-3xl font-bold text-center">Chat</div>
     <div className="h-[60vh] w-full flex flex-col-reverse justify-start 
     items-center overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-900">
     {
        result&&result.data?.chats.map((item)=>{
        //  console.log(item)
         return(
           <Card key={item.id} m={item}/>
         )
       })
     }
     </div>
        <div className="w-[100%]  sticky bottom-0  p-1">
        <ChatForm setSending={setSending}/>
        </div>
    </div>
  );
}

export default App;
