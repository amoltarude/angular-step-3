import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  errMessage: string;
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  notes: Array<Note>= [];
  constructor(private noteservice: NotesService) {

  }

  ngOnInit() {
    this.noteservice.getNotes().subscribe(
      noteData => {
         this.notes = noteData;
         this.notStartedNotes = this.notes.filter(note => note.state === 'not-started');
    this.startedNotes = this.notes.filter(note => note.state === 'started');
    this.completedNotes = this.notes.filter(note => note.state === 'completed');
       }, err => {if (err.status === 404) { this.errMessage = err.message; }});
    if (this.notes === undefined) {
      console.log('No notes to show');
     return new Error('No Notes to show');
    }



  }
}
