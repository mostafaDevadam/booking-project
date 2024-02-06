import { TestBed } from '@angular/core/testing';

import { HotelGuard } from './hotel.guard';

describe('HotelGuard', () => {
  let guard: HotelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HotelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
