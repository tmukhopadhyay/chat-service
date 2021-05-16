import { TestBed } from '@angular/core/testing';

import { AppStore } from './app.store';

describe('AppService', () => {
  let store: AppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(AppStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });
});
