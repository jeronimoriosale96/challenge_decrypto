import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSubject.asObservable();

  constructor() {
    this.socket = new WebSocket(environment.webSocket);
    this.socket.addEventListener('open', () => {
      this.isConnectedSubject.next(true);
    });
    this.socket.addEventListener('close', () => {
      this.isConnectedSubject.next(false);
    });
  }

  public connect(): Observable<any> {
    return new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });
  }

  sendMessage(message: string): void {
    if (this.isConnectedSubject.value) {
      this.socket.send(message);
    }
  }

  closeConnection(): void {
    this.socket.close();
  }
}