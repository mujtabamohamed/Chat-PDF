# Chat with PDF - Interactive Document Companion

A modern web application that transforms static PDFs into interactive conversations using AI. Built with Next.js, Firebase, and OpenAI.

<div>
  <video width="100%" autoplay loop muted playsinline>
    <source src="./video/Chat-PDF.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Features

### 🚀 Core Features

- **PDF Document Management**
  - Upload and store PDF documents
  - Interactive PDF viewer with zoom and rotation controls
  - Document organization with size and upload date tracking
  - Cloud storage integration with Firebase

### 💬 AI Chat Capabilities

- **Intelligent Conversations**
  - Chat with your PDF documents using natural language
  - Context-aware responses based on document content
  - Chat history memorization
  - Powered by OpenAI's GPT-4

### 💎 Premium Features

- **Free Tier**
  - Store up to 2 documents
  - 3 messages per document
  - Basic AI chat functionality

- **Pro Plan ($5.99/month)**
  - Store up to 20 documents
  - 100 messages per document
  - Advanced AI chat with memory recall
  - Document deletion capability
  - Advanced analytics
  - Priority support

## Tech Stack

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Firebase (Firestore & Storage)
- **Authentication**: Clerk
- **Gen AI**: OpenAI GPT-4, LangChain
- **Payment**: Stripe
- **Styling**: Tailwind CSS, shadcn/ui

## Installation

1. Clone the repository:

bash
git clone https://github.com/yourusername/chat-with-pdf.git
cd chat-with-pdf

2. Install dependencies:

bash
npm install

3. Run the development server:

bash
npm run dev


4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Add your environment variables
4. Deploy!

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/actions` - Server actions for data mutations
- `/lib` - Utility functions and configurations
- `/hooks` - Custom React hooks
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [Firebase](https://firebase.google.com/)
- [Clerk](https://clerk.dev/)
- [Stripe](https://stripe.com/)
- [LangChain](https://langchain.org/)
- [Pinecone](https://www.pinecone.io/)