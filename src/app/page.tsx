"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import Dropzone from "./components/Dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type message = {
  text: string;
  from: string;
};

export default function Home() {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [chatMessages, setChatMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [who, setWho] = useState<string>("user");
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleSendMessage = async () => {
    setChatMessages([
      ...chatMessages,
      {
        text: newMessage,
        from: "user",
      },
    ]);
    setWho("bot");
    setNewMessage(""); // Reset textarea
  };

  useEffect(() => {
    const fetchBotReply = async () => {
      const message = chatMessages[chatMessages.length - 1].text;

      if (message != "") {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            message,
          }),
        });

        let result = "";
        if (!response.ok) {
          result = "Error during sending message";
        } else {
          result = await response.text();
        }

        // Ask bot to reply
        const botMessage = {
          text: result,
          from: "bot",
        };
        setChatMessages([...chatMessages, botMessage]);
        setWho("user");
      }
    };

    if (who === "bot") {
      fetchBotReply();
    }
  }, [who]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>GPTDocBot</title>
      </Head>

      <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-3xl font-semibold">GPTDocBot</h1>
        <p className="text-sm">An AI-Powered PDF Chatbot</p>
      </header>

      <main className="container mx-auto p-4">
        <section className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div>
            {pdfFile ? (
              <div className="flex flex-col lg:flex-row">
                <div className="w-full hidden md:block lg:w-1/2">
                  <Document
                    className="w-full"
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page
                      className="w-full"
                      pageNumber={pageNumber}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                  <div className="flex align-middle justify-center">
                    {pageNumber > 1 && (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setPageNumber(pageNumber - 1)}
                      >
                        Previous
                      </span>
                    )}
                    <p className="mx-8">
                      Page {pageNumber} of {numPages}
                    </p>
                    {numPages && pageNumber < numPages && (
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setPageNumber(pageNumber + 1)}
                      >
                        Next
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full px-0 lg:w-1/2 lg:px-4">
                  <p className="mb-2">
                    You are chatting with the file <strong>"{pdfFile}".</strong>
                  </p>
                  <p className="mb-4">
                    Click{" "}
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        setPdfFile("");
                        setFile(null);
                        setChatMessages([]);
                        setPageNumber(1);
                        setNumPages(1);
                      }}
                    >
                      here
                    </span>{" "}
                    if you want to change file.
                  </p>
                  <div className="mb-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={
                          message.from == "user"
                            ? "flex justify-end"
                            : "flex justify-start"
                        }
                      >
                        <div
                          className={
                            message.from == "user"
                              ? "bg-blue-200 p-2 rounded-lg inline-block mb-2"
                              : "bg-green-200 p-2 rounded-lg inline-block mb-2"
                          }
                        >
                          <p className="text-left">
                            <small className="text-xs">{message.from}:</small>
                          </p>
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-full border border-blue-500 rounded-md p-2"
                      placeholder="Ask something to the document..."
                      value={newMessage}
                      disabled={who == "bot"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      disabled={who == "bot"}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 cursor-pointer border-0"
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  How to Use GPTDocBot
                </h2>
                <p>
                  Welcome to GPTDocBot, your AI-Powered PDF chatbot! Here's how
                  to use the application:
                </p>
                <ol className="list-decimal list-inside mt-2 ml-4">
                  <li>
                    <strong>Upload a PDF:</strong> Start by uploading a PDF
                    document. Simply drag and drop the PDF file into the
                    designated area below. Once the file is uploaded, GPTDocBot
                    will process its contents.
                  </li>
                  <li>
                    <strong>Chat with the Document:</strong> After the PDF is
                    processed, a chat interface will appear. You can interact
                    with the document by asking questions or entering text in
                    the chatbox. GPTDocBot will use its AI capabilities to
                    provide responses based on the document's content.
                  </li>
                  <li>
                    <strong>Send Messages:</strong> To ask questions or provide
                    input, type your message in the text area at the bottom of
                    the chat interface and click the "Send" button. GPTDocBot
                    will respond accordingly.
                  </li>
                </ol>

                <p className="mt-4">
                  Start exploring your PDF documents with GPTDocBot and discover
                  a new way to interact with your content!
                </p>

                <h4 className="text-xl font-semibold mb-2 mt-8">Upload PDF</h4>
                <Dropzone setPdfFile={setPdfFile} setFile={setFile} />
              </div>
            )}
          </div>
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
