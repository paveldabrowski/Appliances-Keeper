import { TestBed } from '@angular/core/testing';

import { ModelImagesResolver } from './model-images.resolver';

describe('ModelResolver', () => {
  let resolver: ModelImagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ModelImagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
