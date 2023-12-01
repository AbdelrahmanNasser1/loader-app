import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('readFile', () => {
    it('should read file content', fakeAsync(() => {
      const fileContent = 'Hello, World!';
      const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

      service.readFile(file).subscribe((content) => {
        expect(content).toEqual(fileContent);
      });

      tick();
    }));

    it('should handle file read error', fakeAsync(() => {
      const invalidFile = new File([], 'invalid.txt', { type: 'text/plain' });

      service.readFile(invalidFile).subscribe(
        () => {},
        (error) => {
          expect(error).toBeDefined();
        }
      );
      tick();
    }));
  });

  describe('countWords', () => {
    it('should count words in the content', () => {
      const content = 'This is a sample text. This text has some words.';

      const wordCount = service.countWords(content);

      expect(wordCount.get('this')).toBe(2);
      expect(wordCount.get('is')).toBe(1);
      expect(wordCount.get('a')).toBe(1);
      expect(wordCount.get('sample')).toBe(1);
    });
  });
});
