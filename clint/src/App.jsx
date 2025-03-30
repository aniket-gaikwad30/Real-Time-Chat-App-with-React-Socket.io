import React, { useEffect, useMemo, useState } from "react";
import { TextField, Container, Button, Typography } from "@mui/material";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [roomName, setRoomName] = useState([]);

  const socket = useMemo(() => io("http://localhost:3000"), []);
  // const socket = useMemo(() => io("https://randomname.ngrok.io"), []);


  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("Connected:", socket.id);
    });

    socket.on("Welcome", (data) => {
      console.log(data);
    });

    socket.on("Received-message", (data) => {
      console.log("New message:", data);
      setReceivedMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("Welcome");
      socket.off("Received-message");
    };
  }, []);

  const handleJoinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join-room", room);
      console.log(`Joined room: ${room}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim() === "") {
      alert("Enter a room name first!");
      return;
    }
    socket.emit("message", { room, data: message });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Welcome to Socket.io Chat</Typography>
      <Typography variant="subtitle1">Your ID: {socketID}</Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>JOin the room</h5>

        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          label="Room name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Join 
        </Button>
      </form>

      <TextField
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        label="Room"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="secondary" onClick={handleJoinRoom}>
        Join Room
      </Button>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Typography variant="h6">Messages:</Typography>
      {receivedMessages.map((msg, index) => (
        <Typography key={index} variant="body1">
          {msg}
        </Typography>
      ))}
    </Container>
  );
}

export default App;
