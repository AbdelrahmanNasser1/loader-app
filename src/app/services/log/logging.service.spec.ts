import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    it('should log errors to the console', () => {
      //Spy on the console.error method
      spyOn(console, 'error');
      const errorMessage = 'Test error message';
      const error = new Error(errorMessage);

      service.handleError(error);
      expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
    });
  });

  describe('logEvent', () => {
    it('should log events to the console', () => {
      //Spy on the console.log method
      spyOn(console, 'log');
      const eventName = 'Test event';

      service.logEvent(eventName);
      expect(console.log).toHaveBeenCalledWith('Event:', eventName);
    });
  });
});
