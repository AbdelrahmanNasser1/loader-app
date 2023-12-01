import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//contains all functionality related to file
export class FileService {
  //method that read data inside file loaded
  readFile(file: File): Observable<string> {
    const reader = new FileReader();

    return new Observable<string>((observer) => {
      reader.onloadend = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsText(file);
    });
  }

  // Implement word counting logic here
  countWords(content: string): Map<string, number> {
    const words = content.split(/\s+/);
    const wordCount = new Map<string, number>();

    words.forEach((element) => {
      element.toLowerCase();
      wordCount.set(element, (wordCount.get(element) || 0) + 1);
    });

    return wordCount;
  }
}
