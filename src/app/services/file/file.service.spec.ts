import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('readFile', () => {
    it('should read file content', (done: DoneFn) => {
      const fileContent = 'Hello, World!';
      const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

      service.readFile(file).subscribe((content) => {
        expect(content).toEqual(fileContent);
        done();
      });
    });

    it('should handle file read error', (done: DoneFn) => {
      const invalidFile = new File([], 'invalid.txt', { type: 'text/plain' });

      service.readFile(invalidFile).subscribe(
        () => {},
        (error) => {
          expect(error).toBeDefined();
          done();
        }
      );
    });
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
