import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  // notesSubject: BehaviorSubject<Array<Note>>;
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  constructor(private authservice: AuthenticationService, private httpClient: HttpClient) {
   // this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
   }

  fetchNotesFromServer() {
    return this.httpClient.get<Note[]>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `${ this.authservice.getBearerToken()}`)
    }).subscribe(data => {
      this.notes = data;
      this.notesSubject.next(this.notes);
    },
    error => {
      if (error.status === 404) {
        console.log(error);
      } else {
      console.log(error);
      }});
  }

   getNotes(): Observable<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `${ this.authservice.getBearerToken()}`)
    }).do(newnote => {
        this.notes.push(newnote);
        this.notesSubject.next(this.notes);
    }, error => {
      if (error.status === 404) {
        console.log(error);
      } else {
      console.log(error);
      }});
  }

  editNote(note: Note): Observable<Note> {
     return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `${ this.authservice.getBearerToken()}`)
     }).do(ediNote => {
      const getnote = this.notes.find(item => item.id === ediNote.id);
      Object.assign(getnote, ediNote);
      this.notesSubject.next(this.notes);
  });
  }

  getNoteById(noteId): Note {
    // tslint:disable-next-line:no-shadowed-variable
    // tslint:disable-next-line:radix
    const note =  this.notes.find(item => item.id === parseInt(noteId));
    return Object.assign({}, note);
  }
}
