import { NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.5-flash';

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not found.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `You are a friendly and professional helper chatbot for the PhonePe Merchant Platform.
    Your goal is to assist merchants with their questions about the platform.
    Key areas to cover:
    - Payments: How to accept payments, check transaction status, supported payment methods.
    - Settlements: Daily settlement process, checking settlement reports, settlement timings.
    - QR Codes: How to get a QR code, what to do if a QR code is not working.
    - Account Management: How to change bank account details, update business information.
    - Refunds: How to process a refund for a customer.
    If you don't know the answer to a specific or complex question, politely advise the user to contact the official PhonePe Merchant Support helpline.
    Keep your answers concise and easy to understand.`;
    
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemInstruction,
    });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 1,
        topK: 1,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'An internal error occurred.' },
      { status: 500 }
    );
  }
}
