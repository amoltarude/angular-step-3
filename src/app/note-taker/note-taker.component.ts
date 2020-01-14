import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  note: Note;
  notes: Note[];
  errMessage: string;

  constructor(private noteservice: NotesService) {
    this.note = new Note();
    this.notes = [];
  }

  takeNote() {
     if (this.note.text === undefined || this.note.title === undefined ||
      this.note.text === '' || this.note.title === '') {
      this.errMessage = 'Title and Text both are required fields';
    }else {
      this.notes.push(this.note);
      this.noteservice.addNote(this.note).subscribe(data => {},
        err => {
          if (err.status === 404) {
            console.log(err);
            this.errMessage = err.message;
          } else {
            console.log(err);
            this.errMessage = err.errorMessage;
          }
           });
      this.note = new Note();
    }
  }
}
