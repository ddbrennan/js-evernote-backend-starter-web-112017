const Note = (() => {

let noteId = 0

return class Note {

  constructor({id="temp", user, title, body}) {
    this.id = id
    this.user = user
    this.title = title
    this.body = body
  }

  updateNote({title, body}) {
    this.title = title
    this.body = body
    return this
  }

  renderForList(){
    return `<div class="note-listing" data-noteId="${this.id}" data-action="show-in-panel">
              <div class="note-listing-title" data-noteId="${this.id}" data-action="show-in-panel">${this.title}</div>
              <div class="note-listing-sum" data-noteId="${this.id}" data-action="show-in-panel">${this.body.slice(0,50)}</div>
              <button type="button" class="delete-note-button" data-noteId="${this.id}" data-action="delete">X</button>
            </div>`
  }

  renderForPanel() {
    // return `<div class="note-listing" data-noteid="${this.id}" data-action="show-in-panel">
    //           <h3>${this.title}</h3>
    //           <h4>${this.user.name}</h4>
    //           <p>${this.body}</p>
    //         </div>`

    return `<form id="note-form">
              <input id="note-title-input" type="text" name="title" value="${this.title}">
              <input id="note-submit" type="submit" value="Post!" data-action="submit-note" data-noteId="${this.id}">
            </form>
            <textarea id="note-body-input" name="body" form="note-form">${this.body}
            </textarea>`

  }

}

})();
