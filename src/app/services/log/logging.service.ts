import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// contains all logging functionality
export class LoggingService implements ErrorHandler {
  // Log errors to the console or send to a logging server
  handleError(error: any): void {
    console.error('An error occurred:', error);
  }

  // Log events to the console or send to a logging server
  logEvent(message: string): void {
    console.log('Event:', message);
  }
}
