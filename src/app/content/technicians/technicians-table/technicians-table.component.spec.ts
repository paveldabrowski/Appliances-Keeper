import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniciansTableComponent } from './technicians-table.component';

describe('TechniciansTableComponent', () => {
  let component: TechniciansTableComponent;
  let fixture: ComponentFixture<TechniciansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechniciansTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniciansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
