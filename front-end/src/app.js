class App {

  constructor(notesData) {
    this.notes = this.paraseNotesData(notesData)
    this.noteList = document.getElementById('note-list')
    this.notePanel = document.getElementById('note-panel')
    this.noteList.addEventListener('click', this.renderSelectedNoteInNotePanel.bind(this))
    this.renderNotesInNoteList();
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

}
