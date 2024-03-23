import "./ChatBubble.css"
import {useState} from "react";

export const ChatForm = () => {
    const [isClicked, setIsClicked] = useState(false)
    const toggleChatbox  = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="container">
            <div className="chatbox">
                {isClicked && (
                    <div className="chatbox__support">
                        <div className="chatbox__header">
                            Chat support!
                        </div>
                        <div className="chatbox__messages">
                            <div>
                                <div className="messages__item messages__item--visitor">
                                    Hi!
                                </div>
                                <div className="messages__item messages__item--operator">
                                    What is it?
                                </div>
                                .<div className="messages__item messages__item--typing">
                                <span className="messages__dot"></span>
                                <span className="messages__dot"></span>
                                <span className="messages__dot"></span>
                            </div>
                            </div>
                        </div>
                        <div className="chatbox__footer">
                            <input type="text" placeholder="Write a message"/>
                        </div>
                    </div>
                )
                }
                <div className="chatbox__button">
                    <button onClick={toggleChatbox }><img src="/chatbox-icon.svg" alt=""/></button>
                </div>
            </div>
        </div>
    );
};