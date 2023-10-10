import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/signalr.service';
import { User } from '../types';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  

  public user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };

  public message: string = "";
  public messages: string[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) {}

  async ngOnInit() {
    (await this.messageService.getMessageSubject()).subscribe((message: { user: User|any; message: string|any; }) => {
     this.messages.push(`${message.user.firstName}: ${message.message}`);
     console.log(`Message received: ${message.user.firstName}: ${message.message}`);
   });
 }

 sendMessage() {
   this.messageService.sendMessage(this.user, this.message);
 }


  submitForm() {
    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your API endpoint URL
    this.http.post(apiUrl, this.user)
      .subscribe({
        next: (response) => {
          console.log('Data sent successfully', response);
          // Handle success, e.g., show a success message to the user
        },
        error: (error) => {
          console.error('Error sending data', error);
          // Handle errors, e.g., show an error message to the user
        }
      });
  }
}
