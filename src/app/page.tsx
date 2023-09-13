"use client";

import Head from "next/head";
import { useState } from "react";
import Dropzone from "./components/Dropzone";

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>GPTDocBot</title>
      </Head>

      <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-3xl font-semibold">GPTDocBot</h1>
        <p className="text-sm">An AI-Powered PDF Chatbot</p>
      </header>

      <main className="container mx-auto p-4 max-w-2xl">
        <section className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-2xl font-semibold mb-2">How to Use GPTDocBot</h2>
          <p>
            Welcome to GPTDocBot, your AI-Powered PDF chatbot! Here's how to use
            the application:
          </p>
          <ol className="list-decimal list-inside mt-2 ml-4">
            <li>
              <strong>Upload a PDF:</strong> Start by uploading a PDF document.
              Simply drag and drop the PDF file into the designated area below.
              Once the file is uploaded, GPTDocBot will process its contents.
            </li>
            <li>
              <strong>Chat with the Document:</strong> After the PDF is
              processed, a chat interface will appear. You can interact with the
              document by asking questions or entering text in the chatbox.
              GPTDocBot will use its AI capabilities to provide responses based
              on the document's content.
            </li>
            <li>
              <strong>Send Messages:</strong> To ask questions or provide input,
              type your message in the text area at the bottom of the chat
              interface and click the "Send" button. GPTDocBot will respond
              accordingly.
            </li>
          </ol>

          <p className="mt-4">
            Start exploring your PDF documents with GPTDocBot and discover a new
            way to interact with your content!
          </p>

          <h4 className="text-xl font-semibold mb-2 mt-8">Upload PDF</h4>
          <div>{pdfFile ? file : <Dropzone />}</div>
        </section>
      </main>

      <footer className="bg-blue-500 text-white text-center py-4">
        <div className="container mx-auto">
          <p>
            &copy; 2023 GPTDocBot - Created by{" "}
            <a
              className="underline text-white"
              href="https://linktr.ee/falconandrea"
              title=""
              target="_blank"
              rel="noreferrer"
            >
              Falcon Andrea
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
