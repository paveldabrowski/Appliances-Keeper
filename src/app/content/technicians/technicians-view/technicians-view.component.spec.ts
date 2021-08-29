import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniciansViewComponent } from './technicians-view.component';

describe('TechniciansViewComponent', () => {
  let component: TechniciansViewComponent;
  let fixture: ComponentFixture<TechniciansViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechniciansViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniciansViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
