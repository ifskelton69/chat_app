import React from 'react';
import { X, Send, Image } from "lucide-react";
import toast from 'react-hot-toast';
import { useChat } from "../store/useChat"; // Import useChat


const MessagesInput = () => {
  const [text, setText] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  
  // Use the same store as the working component
  const { sendMessage, selectedUser } = useChat();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Check file size (optional - limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!text.trim() && !imagePreview) {
      toast.error("Please enter a message or select an image");
      return;
    }

    if (!selectedUser) {
      toast.error("Please select a user to send message to");
      return;
    }

    try {
      // Use the same sendMessage function as the working component
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear the form only after successful send
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className='p-2 sm:p-4 w-full bg-slate-800 border-t border-slate-700'>
      {/* Image Preview */}
      {imagePreview && (
        <div className='mb-2 sm:mb-4 flex items-center gap-2'>
          <div className='relative'>
            <img
              src={imagePreview}
              alt="Preview"
              className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-600'
            />
            <button
              onClick={removeImage}
              className='absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-green-500'
              type='button'
            >
              <X className='w-2 h-2 sm:w-3 sm:h-3' />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className='flex gap-1 sm:gap-2 items-end'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className='hidden'
        />

        {/* Image upload button - Always visible on mobile, hidden on small screens */}
        <button
          onClick={() => fileInputRef.current?.click()}
          type='button'
          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
            imagePreview 
              ? "text-emerald-400 bg-slate-700 hover:bg-slate-600" 
              : "text-slate-400 bg-slate-700 hover:bg-slate-600"
          }`}
        >
          <Image className='w-4 h-4 sm:w-5 sm:h-5' />
        </button>

        {/* Text input - Responsive width */}
        <div className='flex-1 min-w-0'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 placeholder-slate-400 text-sm sm:text-base'
            placeholder='Type a message...'
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          disabled={!canSend}
          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
            canSend 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-slate-600 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Send className='w-4 h-4 sm:w-5 sm:h-5' />
        </button>
      </div>
    </div>
  );
};

export default MessagesInput;