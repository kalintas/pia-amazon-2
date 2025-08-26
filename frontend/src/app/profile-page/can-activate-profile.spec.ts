import { TestBed } from '@angular/core/testing';

import { CanActivateProfile } from './can-activate-profile';

describe('CanActivateProfile', () => {
  let service: CanActivateProfile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateProfile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
