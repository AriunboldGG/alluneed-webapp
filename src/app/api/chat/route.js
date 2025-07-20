import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages, chatId } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Mock response for testing
      const lastMessage = messages[messages.length - 1];
      const mockResponses = [
        "Hello! I'm your AI assistant. How can I help you today?",
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's what I can tell you about that topic.",
        "Great question! Based on what you've shared, here's my response.",
        "I'm here to help! What specific information are you looking for?",
        "Thanks for reaching out! I'd be happy to assist you with that.",
        "That's a good point. Let me provide you with some helpful information.",
        "I see what you mean. Here's what I think about that...",
        "Interesting perspective! Here's my take on the matter.",
        "I'm glad you asked! Here's what I can share with you."
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      return NextResponse.json({
        message: randomResponse,
        chatId: chatId
      });
    }

    // Prepare messages for OpenAI API
    const openAIMessages = [
      {
        role: 'system',
        content: 'You are a helpful assistant. Provide clear, accurate, and helpful responses.'
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: openAIMessages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: aiMessage,
      chatId: chatId
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 