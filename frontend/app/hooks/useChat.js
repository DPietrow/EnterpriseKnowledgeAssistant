import { useState } from "react";

import { streamChat } from "./useStreaming";

export default function useChat() {

    const [messages, setMessages] = useState([]);

    async function send(question) {

        const assistant = {

            role: "assistant",

            content: "",

            citations: [],

            status: "thinking"

        };

        setMessages(prev => [

            ...prev,

            {

                role: "user",

                content: question

            },

            assistant

        ]);

        await streamChat(

            question,

            //--------------------------------
            // token
            //--------------------------------

            token => {

                setMessages(prev => {

                    const copy = [...prev];

                    const last = {

                        ...copy[copy.length - 1]

                    };

                    if (last.status === "thinking") {

                        last.status = "streaming";

                        last.content = "";

                    }

                    last.content += token;

                    copy[copy.length - 1] = last;

                    return copy;

                });

            },

            //--------------------------------
            // citations
            //--------------------------------

            citations => {

                setMessages(prev => {

                    const copy = [...prev];

                    const last = {

                        ...copy[copy.length - 1]

                    };

                    last.citations = citations;

                    copy[copy.length - 1] = last;

                    return copy;

                });

            },

            //--------------------------------
            // done
            //--------------------------------

            () => {

                setMessages(prev => {

                    const copy = [...prev];

                    const last = {

                        ...copy[copy.length - 1]

                    };

                    last.status = "complete";

                    copy[copy.length - 1] = last;

                    return copy;

                });

            }

        );

    }

    return {

        messages,

        send

    };

}