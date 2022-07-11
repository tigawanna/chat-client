import './card-form.css'
import React, { useState } from "react";
import { useCreateChatMutation, } from '../generated/graphql';

   interface ChatFormProps {
    setSending:React.Dispatch<React.SetStateAction<boolean>>
  }

 const ChatForm: React.FC<ChatFormProps> = ({setSending}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [input, setInput] = useState("");
  

  const [textBack]=useCreateChatMutation()

 const handleChange = (evt: any) => {
    const value = evt.target.value;
    //@ts-ignore
    setInput(value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(input !== ""){
      textBack(
        {
          variables:{input},
          
       }).then(e=>{
          setSending(true)
        })
  
    }
    

  };
  return (
    <div className="w-full h-full flex-center border shadow-black shadow-lg p-2">
      <form className="flex">
        <input
            className= "rounded p-2 mx-2 border border-black hover:border-purple-600"
            id="chat"
            placeholder="type.."
            onChange={handleChange}
            value={input}
          />
         <button className="p-2 bg-slate-600 rounded-sm text-white mx-2" onClick={handleSubmit}>
          send
        </button>

       </form>
    </div>
  );
};

export default ChatForm
