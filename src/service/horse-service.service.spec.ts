import { TestBed } from '@angular/core/testing';

import { HorseServiceService } from './horse-service.service';

describe('HorseServiceService', () => {
  let service: HorseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
