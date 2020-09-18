import React, {useState, useEffect} from 'react';
import Axios from "axios";

function User() {
    //const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [userPassword, setUserPassword] = useState(null)
    const [token, setToken] = useState(null)
    const [allUsers, setAllUsers] = useState([])

    function register() {
        Axios.post("https://api.dunarr.com/api/register",{username: userName, password: userPassword})
            .then(response => {
                setUserId(response.data.results.id)
            })
    }

    function login() {
        Axios.post("https://api.dunarr.com/api/login",{username: userName, password: userPassword})
            .then(response => {
                setUserId(response.data.id)
                setToken(response.data.token)
            })
    }

    function loadUser(){
        Axios.get("https://api.dunarr.com/api/users/{"+userId+"}")
            .then(function (response) {
                //setUserId(response.data.results.id)
                setUserName(response.data.results.username)
                setAvatar(response.data.results.avatar)
            })
    }

    function loadAllUsers() {
        Axios.get("https://api.dunarr.com/api/users")
            .then(function (response) {
                setAllUsers(response.data.results)
            })
    }
}

export default User
