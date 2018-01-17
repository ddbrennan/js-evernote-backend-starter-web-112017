class App {

  constructor(notesData) {
    this.notes = this.paraseNotesData(notesData)

    this.notePanel = document.getElementById('note-panel')

    this.noteList = document.getElementById('note-list')
    this.renderNotesInNoteList();

    this.newNoteButton = document.getElementById('new-note-button')
    this.newNoteButton.addEventListener('click', this.renderNewNoteForm.bind(this))

    this.notePanel.addEventListener('click', this.postNoteToAPI.bind(this))

  }

  paraseNotesData(notesData) {
    return notesData.map( noteData => new Note(noteData))
  }

  renderNotesInNoteList() {
    this.noteList.addEventListener('click', this.eventOnNoteList.bind(this))
    this.noteList.innerHTML = `${this.notes.map( note => note.renderForList() ).reverse().join('')}`
  }

  eventOnNoteList() {
    if (event.target.dataset.action === 'show-in-panel') {
      let noteToRender = this.notes.find(note => note.id == event.target.dataset.noteid)
      this.notePanel.innerHTML = noteToRender.renderForPanel();
    } else if (event.target.dataset.action === 'delete') {
      let noteToDelete = this.notes.find(note => note.id == event.target.dataset.noteid)
      fetch(`http://localhost:3000/api/v1/notes/${noteToDelete.id}`,
        {method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(noteToDelete)})
        this.notes.splice(this.notes.indexOf(noteToDelete),1)
        this.renderNotesInNoteList()
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
      if (noteToEdit.id !== "temp") {
        fetch(`http://localhost:3000/api/v1/notes/${noteToEdit.id}`,
          {method: 'PATCH',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(noteToEdit)})
          .then( response => response.json() )
          .then( data =>
                  noteToEdit.updateNote(data) )
      }
      else {
        fetch(`http://localhost:3000/api/v1/notes`,
          {method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(noteToEdit)})
          .then( response => response.json() )
          .then( this.createNewNoteFromApiResponseAndRefreshNotePanel.bind(this) )
          }
      }
      this.renderNotesInNoteList();
    }

    createNewNoteFromApiResponseAndRefreshNotePanel(data) {
      this.notes.pop()
      this.notes.push(new Note(data))
      this.notePanel.innerHTML = this.notes[this.notes.length-1].renderForPanel();
    }
}
//
// this.notes[this.notes.length-1].renderForPanel();
