import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from './Chat.module.css';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useParams } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAydewEntJ7-4LQpFqn5k5K-esTWBh4Pj4",
  authDomain: "chat-ecommerce-28ba8.firebaseapp.com",
  projectId: "chat-ecommerce-28ba8",
  storageBucket: "chat-ecommerce-28ba8.appspot.com",
  messagingSenderId: "230804391907",
  appId: "1:230804391907:web:45b2e79e74b86f743bc2d6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// async function getChats(db) {
//   const chatsCol = collection(db, 'chats');
//   const chatSnapshot = await getDocs(chatsCol);
//   const chatList = chatSnapshot.docs.map(doc => doc.data());
//   return chatList;
// }
function escrolear(){
  const scroll=document.querySelector(".scroll");
  scroll.scrollTop=scroll.scrollHeight;
}

const Chat = ()=>{
  const [txt, setTxt] = useState("");
  const [mesagges, setMesagges] = useState([]);
  const { user } = useSelector((state)=>state);
  let { orderId } = useParams();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    let fecha = new Date();
    const chatRef = collection(db, "chats");
    //Esto hay que borrarlo cuando consigua el id del usuario al que le quiero mandar el mensaje
    let id_user_get;
    if(user.id == "93765dce-b53b-4260-80e4-5fa2cefd925e") id_user_get = "6932d9a9-15ee-463d-9ec0-46b3e09e29f4"
    else id_user_get = "93765dce-b53b-4260-80e4-5fa2cefd925e"
    //------------------------------------------------------------------------------------------
    await setDoc(doc(chatRef), {
      id_user_send: user.id,
      id_user_get,
      id_order: 3,
      date: fecha,
      text: txt
    });
    setTxt("");
  }

  useEffect(()=>{
    const q = query(collection(db, "chats"), where("id_order", "==", Number(orderId)), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push(doc.data());
      });
      setMesagges(chats);
    });
    // async function initChats(){
      //   const rsp = await getChats(db);
      //   setMesagges(rsp);
      // }
      // initChats();
  }, []);

  useEffect(()=>{   
    escrolear(); 
    console.log("Current chats are: ", mesagges);
  },[mesagges])

  const handleChange = (e)=> {
    setTxt(e.target.value);
  }
  return (
    <main className={style.chatContainer}>
      <section>
        <h2>Nombre de la otra persona</h2>
        <ul className={`${style.txtContain} scroll`}>
          {mesagges.map((val, k)=>{
              return <li className={val.id_user_send == user.id ? style.userSend : style.get} key={k}> <span>{val.text}</span></li>
          })}
        </ul>
        <form className={style.frmSendMessage} onSubmit={(e)=>{handleSubmit(e)}}>
          <textarea type="text" onChange={(e)=>{handleChange(e)}} value={txt}></textarea>
          <button><i className="fa-solid fa-paper-plane"></i></button>
        </form>
      </section>
      <aside>

      </aside>
    </main>
  )
}

export default Chat;