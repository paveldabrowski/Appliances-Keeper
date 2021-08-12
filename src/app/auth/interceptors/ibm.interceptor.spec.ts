import { TestBed } from '@angular/core/testing';

import { IbmTokenReceiver } from './ibm-token-receiver.interceptor';

describe('IbmInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IbmTokenReceiver
      ]
  }));

  it('should be created', () => {
    const interceptor: IbmTokenReceiver = TestBed.inject(IbmTokenReceiver);
    expect(interceptor).toBeTruthy();
  });
});
