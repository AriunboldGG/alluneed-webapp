# AI Chat Setup Instructions

## Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

## Setup Steps

### 1. Environment Variables

Create a `.env.local` file in your project root with the following content:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here

# Optional: Use a different model
# OPENAI_MODEL=gpt-4
```

### 2. Install Dependencies

The required dependencies are already included in your project.

### 3. Start the Development Server

```bash
npm run dev
```

## Features Implemented

✅ **ChatGPT-style Interface**: Clean, responsive UI with sidebar and main chat area
✅ **Chat History Management**: Create, view, switch, rename, and delete chats
✅ **Real-time AI Responses**: Using OpenAI GPT-3.5-turbo model
✅ **Context Preservation**: Full message history sent with each API call
✅ **Local Storage**: Chat history saved in browser localStorage
✅ **Typing Indicator**: Animated dots while AI is responding
✅ **Auto-scroll**: Messages automatically scroll to bottom
✅ **Secure API**: OpenAI API key kept secure on server side
✅ **Error Handling**: Graceful error handling for API failures
✅ **Responsive Design**: Works on desktop and mobile devices

## Usage

1. **Create New Chat**: Click the "+ New Chat" button in the sidebar
2. **Send Messages**: Type your question and press Enter or click the send button
3. **Switch Chats**: Click on any chat in the sidebar to switch to it
4. **Rename Chats**: Double-click on a chat title to edit it
5. **Delete Chats**: Click the trash icon next to any chat
6. **Toggle Sidebar**: Use the hamburger menu to show/hide the sidebar

## Security Notes

- The OpenAI API key is stored securely in environment variables
- API calls are made through a secure server-side endpoint
- No sensitive data is exposed in the frontend code

## Customization

You can customize the AI behavior by modifying the system prompt in `/src/app/api/chat/route.js`:

```javascript
{
  role: 'system',
  content: 'You are a helpful assistant. Provide clear, accurate, and helpful responses.'
}
```

## Troubleshooting

1. **API Key Error**: Make sure your OpenAI API key is valid and has sufficient credits
2. **CORS Issues**: The API endpoint is configured to work with Next.js
3. **Storage Issues**: Check if localStorage is enabled in your browser 