import "./card.css";
import dayjs from "dayjs";
import {
  RegularChatFragment,

} from "../generated/graphql";
import { FaTrash,FaEdit,FaCheck } from "react-icons/fa";
import { useState } from 'react';
// import { useUpdateChatMutation } from './../generated/graphql';

interface ChatProps {
  m: RegularChatFragment;
}

const Card: React.FC<ChatProps> = ({ m }) => {
  // const [deleteChat] = useDeleteChatMutation();
  const [editing, setEditing] = useState(false)  
  const [input, setInput] = useState(m.message);
  // const [updateChat]=useUpdateChatMutation()

const handleChange:React.ChangeEventHandler<HTMLInputElement> = (evt) => {
  const value = evt.target.value;
  setInput(value);
  };


  return (
    <div key={m.id} className=" shadow hover:shadow-md hover:bg-slate-300 shadow-black w-[80%] h-fit p-5 m-2 ease-in-out rounded-md">
      <div className="w-flex flex justify-between m-1 ">
        <div className="cardheaderid"></div>

        <div className="cardheaderid">
        {editing?
          <input
            className= "theinput"
            id="chat"
            placeholder="type.."
            onChange={handleChange}
            value={input}
          />:<p>{m.message}</p>}
        </div>
        <div className="cardheaderuser">by: {} </div>
      </div>
      <div className="cardmiddle">

        <div className="cardmiddlecenter">
          <div>{dayjs(m.time).format("D MMM , YYYY h:mm A")}</div>
        </div>


      </div>
    </div>
  );
};

export default Card;
