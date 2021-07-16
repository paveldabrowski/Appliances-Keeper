import { TestBed } from '@angular/core/testing';

import { TechniciansTermsService } from './technicians-terms.service';

describe('TechniciansTermsService', () => {
  let service: TechniciansTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechniciansTermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
