/**
 *
 * Copyright 2017 Yoshihiro Tanaka
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Yoshihiro Tanaka <contact@cordea.jp>
 * date  : 2017-05-16
 */

class Content {

    private timer: number = -1

    constructor() {
        this.addSquare();
    }

    private addSquare() {
        let title = document.getElementsByTagName("title")[0].innerText
        let body = document.getElementsByTagName("body")[0]
        let child = document.createElement("div")
        child.className = "bookmarker"
        child.onmouseover = e => {
            this.timer = setTimeout(() => {
                chrome.runtime.sendMessage({
                    "type": "addBookmark",
                    "title": title,
                    "url": window.location.href
                })
            }, 1000)
        }
        child.onmouseleave = e => {
            if (this.timer != -1) {
                clearTimeout(this.timer)
            }
        }
        body.appendChild(child)
    }

}

window.addEventListener("load", () => {
    new Content()
})
