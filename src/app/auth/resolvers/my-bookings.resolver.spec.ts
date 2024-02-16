import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { myBookingsResolver } from './my-bookings.resolver';

describe('myBookingsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => myBookingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
