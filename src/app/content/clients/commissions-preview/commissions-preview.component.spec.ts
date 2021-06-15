import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsPreviewComponent } from './commissions-preview.component';

describe('CommissionsPreviewComponent', () => {
  let component: CommissionsPreviewComponent;
  let fixture: ComponentFixture<CommissionsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
