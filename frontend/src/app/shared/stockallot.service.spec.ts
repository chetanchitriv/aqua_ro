import { TestBed } from '@angular/core/testing';

import { StockallotService } from './stockallot.service';

describe('StockallotService', () => {
  let service: StockallotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockallotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
