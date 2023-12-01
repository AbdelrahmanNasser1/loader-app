import { catchError } from 'rxjs/operators';
import { FileService } from './../services/file/file.service';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { LoggingService } from '../services/log/logging.service';

@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrl: './content-loader.component.css',
})
export class ContentLoaderComponent {
  fileContent: string | null = null;
  wordCount: Map<string, number> | null = null;
  wordCountArray: [string, number][] | null = null;
  error: string | null = null;
  logMessages: string[] = [];

  constructor(
    private fileService: FileService,
    private loggingService: LoggingService
  ) {}

  onFileSelected(fileInput: any): void {
    const file: File = fileInput.target.files[0];

    if (file) {
      const allowedFileType = 'text/plain'; // MIME type for .txt files

      if (file.type !== allowedFileType) {
        this.error = 'Invalid file type. Please select a .txt file.';
        this.loggingService.handleError(this.error);

        // Clear previous fileContent and wordCountArray on error
        this.fileContent = null;
        this.wordCountArray = null;
        this.logMessages = [];
        this.showError('Invalid file type. Please select a .txt file.');

        return;
      }
      this.clearError();
      this.fileService.readFile(file).subscribe({
        next: (content: string) => {
          this.fileContent = content;
          this.wordCount = this.fileService.countWords(content);
          this.wordCountArray = Array.from(this.wordCount.entries());
          this.logEvent('File successfully loaded'); // Log the event
          this.error = null;
        },
        error: (error: Error) => {
          this.loggingService.handleError(error);
          this.fileContent = null;
          this.wordCountArray = null;
          this.logMessages = [];
          this.showError('Error reading file. Please try again.');
        },
      });
    } else {
      this.error = 'No file selected';
      this.logEvent('No file selected');
      this.loggingService.handleError('No file selected');
    }
  }

  private logEvent(message: string): void {
    this.loggingService.logEvent(message);
    this.logMessages.push(message); // Store log messages for display
  }

  private showError(message: string): void {
    this.error = message;
    alert(message); // Display error message in an alert
  }

  private clearError(): void {
    this.error = null;
  }
}
