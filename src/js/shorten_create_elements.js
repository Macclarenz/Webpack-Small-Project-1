class ResultElement {
    constructor(response) {
        this._shortLink = response.result.short_link
        this._originalLink = response.result.original_link

        this._elements = {
            outerContainer: {
                el: document.createElement('div'),
                class: 'shorten-link-container'
            },
            shortenOriginalLink: {
                el: document.createElement('p'),
                class: 'shorten-original-link'
            },
            shortenResult: {
                el: document.createElement('div'),
                class: 'shorten-result',
                innerElements: {
                    shortenLink: {
                        el: document.createElement('p'),
                        class: 'shorten-link'
                    },
                    shortenCopyBtn: {
                        el: document.createElement('button'),
                        class: 'shorten-copy-btn',
                        copyText: function(e) {
                            const btn = e.target
                            const parent = btn.parentElement
                            const link = parent.querySelector('.shorten-link')
                            
                            btn.classList.add('shorten-copied')
                            btn.innerText = 'Copied!'

                            navigator.clipboard.writeText(link.innerText)

                            return e.preventDefault()
                        }
                    }
                }
            }
        }
    }

    createElement() {
        return new Promise((resolve, reject) => {
            const { outerContainer, shortenOriginalLink, shortenResult } = this._elements
            const { shortenLink, shortenCopyBtn } = shortenResult.innerElements

            const div_container = outerContainer.el
            div_container.className = outerContainer.class

            const p_originalLink = shortenOriginalLink.el
            p_originalLink.className = shortenOriginalLink.class
            p_originalLink.innerText = this._originalLink

            const div_shortenResult = shortenResult.el
            div_shortenResult.className = shortenResult.class

            const p_shortenLink = shortenLink.el
            p_shortenLink.className = shortenLink.class
            p_shortenLink.innerText = this._shortLink

            const btn_shortenCopyBtn = shortenCopyBtn.el
            btn_shortenCopyBtn.className = shortenCopyBtn.class
            btn_shortenCopyBtn.innerText = 'Copy'
            btn_shortenCopyBtn.addEventListener('click', shortenCopyBtn.copyText)

            resolve({
                div_container,
                p_originalLink,
                div_shortenResult,
                p_shortenLink,
                btn_shortenCopyBtn
            })
        })
    }

    appendElement(obj) {
        const { div_container, p_originalLink, div_shortenResult, p_shortenLink, btn_shortenCopyBtn } = obj
        
        div_container.appendChild(p_originalLink)
        div_container.appendChild(div_shortenResult)
        div_shortenResult.appendChild(p_shortenLink)
        div_shortenResult.appendChild(btn_shortenCopyBtn)

        return document.querySelector('.shorten-result-container').appendChild(div_container)
    }
}

export {
    ResultElement
}