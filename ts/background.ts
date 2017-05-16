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

/// <reference path="../node_modules/@types/chrome/index.d.ts" />

const FolderName  = "stocco"

class Background {

    constructor() {
        this.listenPages()
    }

    private listenPages() {
        chrome.runtime.onMessage.addListener((request, sender, response) => {
            if (request.type == "addBookmark") {
                let title = request.title
                let url = request.url
                chrome.bookmarks.search(FolderName, dirs => {
                        if (dirs.length == 0) {
                            chrome.bookmarks.create({
                                "parentId": "2", // Other Bookmarks
                                "title": FolderName
                            }, r => {
                                this.addBookmark(r, title, url)
                            })
                            return
                        }
                        let dir = dirs[0]
                        this.addBookmark(dir, title, url)
                })
            }
        })
    }

    private addBookmark = (dir: chrome.bookmarks.BookmarkTreeNode, title: string, url: string) => {
        chrome.bookmarks.search(url, dirs => {
            if (dirs.length > 0) {
                return
            }
            chrome.bookmarks.create({
                "parentId": dir.id,
                "title": title,
                "url": url
            })
        })
    }
}

window.addEventListener("load", () => {
    new Background()
})
