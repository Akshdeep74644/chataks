const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-icon");
const chatContainer = document.querySelector(".chat_container");
const startConteiner = document.querySelector(".start_content");

let userChat = null;
let APIKEY = "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";
let createElement = (html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatresponse = async (incomingchatDiv) => {
  const APIURL = "https://api.openai.com/v1/completions";
  const aiChatpara = document.createElement("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIKEY} `,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${userChat}`,
      max_tokens: 2048,
      temperature: 0.2,
    }),
  };

  try {
    const response = await (await fetch(APIURL, requestOptions)).json();
    console.log(response);
    aiChatpara.textContent = response.choices[0].text.trim();
  } catch {
    console.log("something went wrong!");
  }

  incomingchatDiv.querySelector(".animation_text").remove();
  incomingchatDiv.querySelector(".chat_details").appendChild(aiChatpara);
};

const copytext = (copybtn)=>{
  const responsetext = copybtn.parentElement.querySelector("p");
  navigator.clipboard.writeText(responsetext.textContent);
  copybtn.style.color = "#6df736"
}

let showtypinganimation = () => {
  const userHtml = `<div class="chat_content">
    <div class="chat_details">
      <img src="image/ai_pic.jpg" alt="The Chat Ai Picture" />
      <div class="animation_text">
        <div class="text_dotes" style="--delay: 0.1s"></div>
        <div class="text_dotes" style="--delay: 0.2s"></div>
        <div class="text_dotes" style="--delay: 0.3s"></div>
      </div>
    </div>
    <span class="iconify" onclick="copytext(this)" id="copy_icon" data-icon="uil:copy">copy text</span>
  </div>`;
  const incomingchatDiv = createElement(userHtml, "incoming");
  chatContainer.appendChild(incomingchatDiv);
  getChatresponse(incomingchatDiv);
};

function getLocalStream() { 
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      window.localStream = stream; // A
      window.localAudio.srcObject = stream; // B
      window.localAudio.autoplay = true; // C
    })
    .catch((err) => {
      console.error(`you got an error: ${err}`);
    });
}

const handleOutcomingChat = () => {
  startConteiner.style.display = "none";
  userChat = chatInput.value.trim();
  if (!userChat) return;
  const userHtml = `<div class="chat_content">
    <div class="chat_details">
      <img src="image/me.jpg" alt="The User Picture" />
      <p></p>
    </div>
  </div>`;
  const outgoingchat = createElement(userHtml, "outgoing");
  outgoingchat.querySelector("p").textContent = userChat;
  chatContainer.appendChild(outgoingchat);
  console.log(userChat);
  setTimeout(showtypinganimation, 500);
};

sendButton.addEventListener("click", handleOutcomingChat);
