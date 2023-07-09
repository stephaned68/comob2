import { TestBed } from '@angular/core/testing';

import { EquipmentBaseService } from './equipmentbase.service';

describe('EquipmentbaseService', () => {
  let service: EquipmentBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
