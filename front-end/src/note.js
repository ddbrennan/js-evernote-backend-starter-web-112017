const Note = (() => {

let noteId = 0

return class Note {

  constructor({user, title, body}) {
    this.id = ++noteId
    this.user = user
    this.title = title
    this.body = body
    this.summary = body.slice(0,50) + "..."
  }

  renderForList(){
    return `<div class="note-listing" data-noteId="${this.id}" data-action="show-in-panel">
              <h3 data-noteId="${this.id}" data-action="show-in-panel">${this.title}</h3>
              <p data-noteId="${this.id}" data-action="show-in-panel">${this.summary}</p>
            </div>`
  }

  renderForPanel() {
    return `<div class="note-listing" data-noteid="${this.id}" data-action="show-in-panel">
              <h3>${this.title}</h3>
              <p>${this.body}</p>
            </div>`
  }

}

})();
