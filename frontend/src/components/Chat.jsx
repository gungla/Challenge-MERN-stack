import React, {useRef, useState, useEffect} from "react";
import {Paper, TextField, Button, makeStyles} from "@material-ui/core";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useChat from "./ChatUser";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  paper: {
    width: "80em",
    height: "80%",
    position: "relative"
  },
  action: {
    display: "flex",
    width: "96%",
    alignItems: "center",
    margin: "1em",
    position: "absolute",
    bottom: 0
  },
  sendButton: {
    width: "10em",
    height: "50%",
    margin: "0 2em"
  },
  messageInput: {
    width: "100%"
  },
  messageContainer: {
    overflowY: "auto",
    height: "85%"
  },
  divider: {
    margin: "0.1em"
  },
  message:{
    listStyle: "none"
  },
  owner:{
    margin: "1em",
    backgroundColor: "#0091EA",
    padding: "0.5em 1.5em",
    borderRadius: "20px",
    color: "#FFF",
    wordBreak: "break-word",
    maxWidth: "65%",
    width: "fit-content",
    marginRight: "auto"
  },
  guest: {
    margin: "1em",
    backgroundColor: "#8BC34A",
    padding: "0.5em 1.5em",
    borderRadius: "20px",
    color: "#FFF",
    wordBreak: "break-word",
    maxWidth: "65%",
    width: "fit-content",
    marginLeft: "auto"
  },
  ol: {
    paddingInlineEnd: "40px"
  }
});

const Chat = () => {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const classes = useStyles();
  const messageRef = useRef()

  const handleNewMessageChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyUp = event => {
    if (event.key === "Enter"){
      if (newMessage !== "") {
        sendMessage(newMessage);
        setNewMessage("");
      }
    }
  }

  useEffect(() => messageRef.current.scrollIntoView({behavior: "smooth"}))

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className={classes.container}>
      <Paper elevation={5} className={classes.paper}>
        <div className={classes.messageContainer}>
          <ol className={classes.ol}>
            {messages.map((message, i) => (
              <li
                key={i}
                className={clsx(classes.message, message.isOwner ? classes.owner : classes.guest)}
              >
                <span>{message.body}</span>
              </li>
            ))}
          </ol>
          <div ref={messageRef}></div>
        </div>
        <div className={classes.action}>
        {userInfo ? (
            <>   
            <TextField
            className={classes.messageInput}
            id="message"
            label="Message"
            placeholder="enter message here"
            variant="outlined"
            value={newMessage}
            onChange={handleNewMessageChange}
            onKeyUp={handleKeyUp}
            />
            <Button
            disabled={!newMessage}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            className={classes.sendButton}
            >
            Send
            </Button>
        </>
        ) : (
            <p className='acceder_on mt-4'>
                Por favor <Link to='/login'>Inicie sesión aquí</Link> para poder usar el chat.
            </p>
        )}   
        </div>
      </Paper>
    </div>
  );
};

export default Chat;
