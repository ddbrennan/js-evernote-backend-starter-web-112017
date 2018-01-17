class App {

  constructor(notesData) {
    this.notes = this.paraseNotesData(notesData)

    this.notePanel = document.getElementById('note-panel')

    this.noteList = document.getElementById('note-list')
    this.noteList.addEventListener('click', this.renderSelectedNoteInNotePanel.bind(this))
    this.renderNotesInNoteList();

    this.newNoteButton = document.getElementById('new-note-button')
    this.newNoteButton.addEventListener('click', this.renderNewNoteForm.bind(this))

    this.notePanel.addEventListener('click', this.postNoteToAPI.bind(this))

  }

  paraseNotesData(notesData) {
    return notesData.map( noteData => new Note(noteData))
  }

  renderNotesInNoteList() {
    this.noteList.innerHTML = `${this.notes.map( note => note.renderForList() ).join('')}`
  }

  renderSelectedNoteInNotePanel() {
    if (event.target.dataset.action === 'show-in-panel') {
      let noteToRender = this.notes.find(note => note.id == event.target.dataset.noteid)
      this.notePanel.innerHTML = noteToRender.renderForPanel();
    }
  }

  renderNewNoteForm() {
    const newNote = new Note({user: {name: "truman"}, title: "New Post", body: "New Post Body"})
    this.notes.push(newNote)
    this.notePanel.innerHTML = newNote.renderForPanel();
  }

  postNoteToAPI() {
    event.preventDefault()
    if (event.target.dataset.action === 'submit-note') {
      let noteToEdit = this.notes.find(note => note.id == event.target.dataset.noteid)
        noteToEdit.title = document.getElementById('note-title-input').value
        noteToEdit.body = document.getElementById('note-body-input').value
      if (noteToEdit.id !== null) {
        fetch('http://localhost:3000/api/v1/notes',
          {method: 'PATCH',
          header: {'content-type': 'application/json', 'accept': 'application/json'},
          body: JSON.stringify(noteToEdit)})
          .then( response => response.json() )
          .then( data => console.log(data) )
    }
  }
}
}
