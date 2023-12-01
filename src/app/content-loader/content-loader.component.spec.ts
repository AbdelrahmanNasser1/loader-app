import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLoaderComponent } from './content-loader.component';
import { FileService } from '../services/file/file.service';
import { LoggingService } from '../services/log/logging.service';
import { of, throwError } from 'rxjs';

describe('ContentLoaderComponent', () => {
  let component: ContentLoaderComponent;
  let fixture: ComponentFixture<ContentLoaderComponent>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(async () => {
    const fileSpy = jasmine.createSpyObj('FileService', [
      'readFile',
      'countWords',
    ]);
    const logSpy = jasmine.createSpyObj('LoggingService', [
      'logEvent',
      'handleError',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ContentLoaderComponent],
      providers: [
        { provide: FileService, useValue: fileSpy },
        { provide: LoggingService, useValue: logSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fileServiceSpy = TestBed.inject(FileService) as jasmine.SpyObj<FileService>;
    loggingServiceSpy = TestBed.inject(
      LoggingService
    ) as jasmine.SpyObj<LoggingService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFileSelected', () => {
    it('should set error when invalid file type is selected', () => {
      const invalidFile = new File([], 'invalid.png', { type: 'image/png' });
      const event = { target: { files: [invalidFile] } };

      component.onFileSelected(event);

      expect(component.error).toEqual(
        'Invalid file type. Please select a .txt file.'
      );
    });

    it('should handle file read error', () => {
      const error = new Error('Test error');

      fileServiceSpy.readFile = jasmine
        .createSpy()
        .and.returnValue(throwError(error));

      const validFile = new File(['Test content'], 'test.txt', {
        type: 'text/plain',
      });
      const event = { target: { files: [validFile] } };

      component.onFileSelected(event);

      expect(component.error).toEqual('Error reading file. Please try again.');
      expect(loggingServiceSpy.handleError).toHaveBeenCalledWith(error);
    });

    it('should load file content and count words', () => {
      const content = 'test';
      fileServiceSpy.readFile = jasmine
        .createSpy()
        .and.returnValue(of(content));

      fileServiceSpy.countWords = jasmine
        .createSpy()
        .and.returnValue(new Map([['test', 1]]));

      const validFile = new File([content], 'test.txt', { type: 'text/plain' });
      const event = { target: { files: [validFile] } };

      component.onFileSelected(event);

      expect(component.fileContent).toEqual(content);
      expect(component.wordCountArray).toEqual([['test', 1]]);
      expect(component.error).toBeNull();
      expect(loggingServiceSpy.logEvent).toHaveBeenCalledWith(
        'File successfully loaded'
      );
    });

    it('should handle no file selected', () => {
      const event = { target: { files: [] } };

      component.onFileSelected(event);

      expect(component.error).toEqual('No file selected');
      expect(loggingServiceSpy.logEvent).toHaveBeenCalledWith(
        'No file selected'
      );
    });
  });
});
