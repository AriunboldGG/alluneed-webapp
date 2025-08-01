import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages, chatId, conversationState: requestConversationState } = await request.json();
    
    console.log('API received:', { messages, chatId, conversationState: requestConversationState });

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      console.log('Invalid messages format:', messages);
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    let conversationState = requestConversationState || {};

    // Check if OpenAI API key is available (or force mock responses for testing)
    if (!process.env.OPENAI_API_KEY || true) { // Force mock responses for now
      // Mock response for testing
      const lastMessage = messages[messages.length - 1];
      const userQuestion = lastMessage.content;
      
      // Check for specific Mongolian questions and provide predefined answers
      console.log('Checking question:', userQuestion);
      
      if (userQuestion.includes("Монголын хамгийн өндөр үзэлттэй телевизийн суваг юу вэ?")) {
        console.log('Matched question 1');
        return NextResponse.json({
          message: "Монголын хамгийн олон үзэгчтэй суваг бол Боловсрол ТВ бөгөөд Оргил цагаар өдөрт дунджаар 351,549 хэрэглэгч үздэг ба бусад цагаар өдөрт дунджаар 158,658 хэрэглэгч үздэг. Гэхдээ тухайн ТВ-ээр гарч буй Шоу нэвтрүүлэг Кино зэргээс хамааран бусад сувгийн үзэлт илүү өндөр болох тохиолдлууд байдаг.",
          chatId: chatId
        });
      }
      
      if (userQuestion.includes("Төв талбайн урд байрлах нийслэл дэлгэцийг хэдэн хүн үздэг вэ?")) {
        console.log('Matched question 2');
        return NextResponse.json({
          message: "Нийслэл дэлгэцийн урдуур өдөрт дунджаар 85,156 автомашин, 38,598 явган зорчигч өнгөрдөг ба тэдний 65 орчим хувь нь буюу 80,674 орчим нь дэлгэцэн дээр тоглогдож буй дүрсийг хардаг. Хэрэв та энэхүү дэлгэцэн дээр сурталчилгаа байршуулахаар төлөвлөж байгаа бол 15 хүртэлх сек-ын урттай видеог өдрийн 420 удаагийн давтамжтай өгөхөд тохиромжтой",
          chatId: chatId
        });
      }
      
      if (userQuestion.includes("Та маркетингийн төлөвлөгөө боловсруулж чадах уу?")) {
        console.log('Matched question 3');
        // Initialize conversation state for marketing plan
        conversationState.step = 'marketing_plan_init';
        conversationState.answers = {};
        
        return NextResponse.json({
          message: "Тиймээ чадна гэхдээ төлөвлөгөө боловсруулахын өмнө таниас хэдэн зүйлсийг тодруулах шаардлагатай та хариулахад бэлэн үү?",
          chatId: chatId,
          conversationState: conversationState
        });
      }

      // Handle marketing plan conversation flow
      if (conversationState.step === 'marketing_plan_init' && userQuestion.toLowerCase().includes('тийм')) {
        conversationState.step = 'question_1';
        return NextResponse.json({
          message: "1. Таны төлөвлөгөөний зорилго",
          chatId: chatId,
          conversationState: conversationState
        });
      }

      if (conversationState.step === 'question_1') {
        conversationState.answers.goal = userQuestion;
        conversationState.step = 'question_2';
        return NextResponse.json({
          message: "2. Таны зорилтод хэрэглэгчид (тоогоор бичнэ үү)",
          chatId: chatId,
          conversationState: conversationState
        });
      }

      if (conversationState.step === 'question_2') {
        conversationState.answers.targetUsers = userQuestion;
        conversationState.step = 'question_3';
        return NextResponse.json({
          message: "3. Таны үйл ажиллагааны чиглэл",
          chatId: chatId,
          conversationState: conversationState
        });
      }

      if (conversationState.step === 'question_3') {
        conversationState.answers.businessDirection = userQuestion;
        conversationState.step = 'question_4';
        return NextResponse.json({
          message: "4. Таны боломжит маркетингийн төсөв (₮ тоогоор бичнэ үү)",
          chatId: chatId,
          conversationState: conversationState
        });
      }

      if (conversationState.step === 'question_4') {
        conversationState.answers.budget = userQuestion;
        conversationState.step = 'completed';
        return NextResponse.json({
          message: "Баярлалаа таны төлөвлөгөө бэлэн боллоо",
          chatId: chatId,
          conversationState: conversationState,
          showModal: true,
          modalData: {
            type: 'marketing_plan',
            budget: conversationState.answers.budget,
            goal: conversationState.answers.goal,
            targetUsers: conversationState.answers.targetUsers,
            businessDirection: conversationState.answers.businessDirection
          }
        });
      }
      
      // Default mock responses for other questions
      console.log('No specific match found, using random response');
      const mockResponses = [
        "Сайн байна! Би танд туслахад бэлэн байна. Та юу асуух хүсэлтэй байна вэ?",
        "Энэ сонирхолтой асуулт байна! Би танд туслаж үзье.",
        "Би таны асуултыг ойлголоо. Энэ сэдвээр танд мэдээлэл өгье.",
        "Сайн асуулт! Би танд туслаж чадна.",
        "Би энд байна! Та ямар мэдээлэл хайж байна вэ?",
        "Асуултад баярлалаа! Би танд туслахад баяртай байна.",
        "Сайн зөвлөгөө! Би танд хэрэгтэй мэдээлэл өгье.",
        "Би таны санааг ойлголоо. Энэ талаар тайлбарлая.",
        "Сонирхолтой үзэл бодол! Би өөрийн бодлыг хуваалцъя.",
        "Асуултад баярлалаа! Би танд мэдээлэл өгье."
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