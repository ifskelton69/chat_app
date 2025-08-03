import React, { useEffect, useRef } from 'react';
import { useChat } from '../store/useChat';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import MessageSkelton from '../components/skeleton/messageSkelton';
import { useAuth } from '../store/useAuth';
import { formatDateLabel, shouldShowDateSeparator } from '../lib/utils';

const ChatContainer = () => {
  // FIXED: Use correct function names
  const { 
    messages = [], 
    getMessages, 
    isMessagesLoading, 
    selectedUser, 
    listenToNewMessages, // Fixed function name
    unsubscribeFromMessages // Fixed function name
  } = useChat();
  
  const { authUser } = useAuth();
  const messageEndRef = useRef(null);

  // Debug logs
  console.log('messages:', messages);
  console.log('selectedUser:', selectedUser);
  console.log('isMessagesLoading:', isMessagesLoading);

  useEffect(() => {
    if (!selectedUser?._id) return;
    
    console.log("Setting up chat for user:", selectedUser._id);
    
    // Get messages and setup real-time listening
    getMessages(selectedUser._id);
    listenToNewMessages();
    
    // Cleanup function
    return () => {
      console.log("Cleaning up chat listeners");
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, listenToNewMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkelton />
        <MessagesInput />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <React.Fragment key={message._id}>
              {/* Date Separator */}
              {shouldShowDateSeparator(message, messages[index - 1]) && (
                <div className='flex justify-center my-4'>
                  <div className='bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300'>
                    {formatDateLabel(message.createdAt)}
                  </div>
                </div>
              )}

              {/* Message */}
              <div 
                className={`chat ${message.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}
                // FIXED: Only add ref to the last message
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                <div className='chat-image avatar'>
                  <div className='size-10 rounded-full border'>
                    <img
                      src={message.senderId === authUser?._id
                        ? authUser?.profilepic || "avatar.png"
                        : selectedUser?.profilepic || "avatar.png"}
                      alt="profile picture"
                    />
                  </div>
                </div>
                <div className='chat-header mb-1'>
                  <div className='text-xs opacity-50 ml-1'>
                    <time className='text-xs opacity-50 ml-1'>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </time>
                  </div>
                </div>
                <div className='chat-bubble flex flex-col'>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message attachment"
                      className='sm:max-w-[200px] rounded-md mb-2'
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className='text-center text-gray-500 mt-8'>
            No messages yet. Start a conversation!
          </div>
        )}
      </div>
      <MessagesInput />
    </div>
  );
};

export default ChatContainer;