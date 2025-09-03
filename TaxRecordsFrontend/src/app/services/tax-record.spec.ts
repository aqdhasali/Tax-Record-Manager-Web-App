import { TestBed } from '@angular/core/testing';

import { TaxRecord } from './tax-record';

describe('TaxRecord', () => {
  let service: TaxRecord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxRecord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
