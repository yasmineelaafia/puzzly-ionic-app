import { TestBed } from '@angular/core/testing';

import { TouchDataService } from './touch-data.service';

describe('TouchDataService', () => {
  let service: TouchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
