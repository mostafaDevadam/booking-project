import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { feedbackResolver } from './feedback.resolver';

describe('feedbackResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => feedbackResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
