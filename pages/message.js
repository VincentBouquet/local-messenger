import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {Text, View} from "react-native";

function Message() {
    const [contentMsg, setContentMsg] = useState(null)
    const [categoryMsg, setCategoryMsg] = useState(null)
    const [cityCodeMsg, setCityCodeMsg] = useState(44109)
    const [idMsg, setIdMsg] = useState(null)
    const [allMsg, setAllMsg] = useState([])

    function sendMessage() {
        Axios.post("https://api.dunarr.com/api/messages",{message:contentMsg,category:categoryMsg,citycode:cityCodeMsg})
            .then(response => {
                setIdMsg(response.data.id)
            })
    }

    function loadMessages() {
        Axios.get("https://api.dunarr.com/api/messages",{
            params:{
                citycode:cityCodeMsg,
            }/*,
            headers: {
                Authorization:" "
            }*/
        })
            .then(function (response) {
                setAllMsg(response.data.results)
            })
    }

    useEffect(()=> {
        setInterval(loadMessages, 2000)
        console.log(allMsg)
    },[])

    return (allMsg)
}

export default Message
