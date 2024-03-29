
// ==UserScript==
// @name         Button Following List Twitch
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  ###
// @author       UserRoot-Luca
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    window.onload = () => {
        let ContainerChat = document.querySelector<HTMLDivElement>("[data-test-selector=\"chat-scrollable-area__message-container\"]");
        if (ContainerChat) {
            ContainerChat.addEventListener("DOMSubtreeModified", (e: any) => {
                let e_list:HTMLCollection = e.target.children;
                let e_last = e_list[e_list.length - 1];
                let e_userName = e_last.querySelector(".chat-author__display-name");
                let e_className = e_last.querySelector(".DBFollowing");
                if (e_userName && !e_className) {
                    let BadgeContainer = e_last.querySelector(".chat-line__username-container > span")
                    let MyBadge = document.createElement("div");
                    MyBadge.setAttribute("class","InjectLayout-sc-1i43xsx-0 jbmPmA");
                    let userName = e_userName.textContent;
                    if (userName) {
                        let urlUserName = `https://www.twitchdatabase.com/following/${userName}`;
                        MyBadge.innerHTML = `<button class="DBFollowing" data-a-target="chat-badge" onclick="window.open('${urlUserName}', '_blank');"> 
                            <img alt="DB" class="chat-badge" src="https://www.twitchdatabase.com/favicon.ico" style="width: 18px; height: 18px; border-radius: 3px;">
                        </button>`;
                    }
                    BadgeContainer!.appendChild(MyBadge)
                }
            });
        }
    }
})();