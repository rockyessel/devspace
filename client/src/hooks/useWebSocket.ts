import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (chatId: string, userId: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [receivedMessage, setReceivedMessage] = useState<any>(null); // Add receivedMessage state
  const [userActivity, setUserActivity] = useState<any>(null); // Add receivedMessage state
  const [receivedEditorData, setReceivedEditorData] = useState<any>(null)
  useEffect(() => {
    let isMounted = true; // A flag to check if the component is mounted

    console.log('Checking')

    if (chatId !== undefined || userId !== undefined) {
      // Connect to the WebSocket server when the component mounts
      const wsURL = `ws://localhost:6556?chatId=${chatId}&userId=${userId}`;
      ws.current = new WebSocket(wsURL);

      // Handle WebSocket connection open
      ws.current.onopen = () => {
        console.log('WebSocket connection opened.');
      };

      // Handle WebSocket messages
      ws.current.onmessage = (event: any) => {
        const message = JSON.parse(event.data);
        // console.log('event', message);
        if (message.type === 'notification') {
          // Handle notifications (e.g., user joined/left room)
          console.log('notification', message.message);
        } else if (message.type === 'CodeEditor') {
          // Handle text updates from other participants
          // Update the text accordingly in the TextEditor component
          // For simplicity, we'll assume 'message.text' contains the updated text
          console.log('CodeEditor', message);
          setReceivedEditorData(message)
        } else if (message.type === 'general chat') {
          // Update the receivedMessage state with the chat message
          console.log('data', message);
          console.log('Data Received!');
          // if (isMounted) {
            setReceivedMessage(message);
          // }
        }else if(message.type === 'Activity') {

          console.log('Activity data', message);
          setUserActivity(message)
        }
      };

      // Handle WebSocket connection close
      ws.current.onclose = () => {
        console.log('WebSocket connection closed.');
      };

      // Handle WebSocket connection errors
      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } else {
      console.log('undefined');
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      isMounted = false; // Set the flag to false when unmounting to prevent state update
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [chatId, userId]);

  // Function to send WebSocket messages
  const sendMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage, receivedMessage, receivedEditorData };
};
