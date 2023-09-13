# GPTDocBot

## Introduction

GPTDocBot is an AI-powered chatbot designed to interact with PDF documents. It leverages OpenAI's GPT models to understand the content of uploaded PDF files, divide them into sectors, and answer user queries related to the document's content.

## How It Works

GPTDocBot operates in several steps:

1. **PDF Upload**: Users can upload PDF documents via the frontend, which are then processed by the system.

2. **Document Parsing**: The uploaded PDF is parsed using the LangChain library and pdf-parse. This step extracts the text content from the PDF file.

3. **Vectorization**: The extracted text content is converted into vectors and stored in Pinecone, a Vector Store.

4. **User Interaction**: Users can initiate a conversation with the chatbot, asking questions related to the document's content.

5. **AI-Powered Responses**: GPTDocBot utilizes OpenAI's GPT models to understand user queries, search for relevant document sectors in Pinecone, and generate responses based on the content.

## Requirements and Technologies Used

### Prerequisites

- Node.js 18
- OpenAI API Key
- Pinecone Vector Store API Key

### Technologies

- Next.js
- Tailwind CSS
- TypeScript
- LangChain
- pdf-parse
- Vercel's AI SDK
- react-dropzone
- @pinecone-database/pinecone

## Disclaimer

GPTDocBot is a project created for demonstration and educational purposes. While it showcases the capabilities of AI-powered chatbots and document processing, it may not be suitable for production use without further development and considerations for security, privacy, and scalability. Please use it responsibly and in accordance with relevant data privacy laws and regulations.
