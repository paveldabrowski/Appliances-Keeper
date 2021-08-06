import { TestBed } from '@angular/core/testing';

import { IbmInterceptor } from './ibm.interceptor';

describe('IbmInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IbmInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IbmInterceptor = TestBed.inject(IbmInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
