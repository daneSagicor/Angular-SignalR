import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private connect: HubConnection;
  private messageSubject = new Subject<{ user: User, message: string }>();
  
  

  constructor() {
    this.connect = new HubConnectionBuilder()
      .withUrl('https://localhost:7005/messageHub')
      .build();

    this.connect.on('ReceiveMessage', (user, message) => {
      this.messageSubject.next({ user, message });
    });

    this.startConnection();
  }

  private startConnection() {
    this.connect.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  async sendMessage(user: User, message: string) {
    this.connect.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }

  async getMessageSubject() {
    return await this.messageSubject.asObservable();
  }
}
