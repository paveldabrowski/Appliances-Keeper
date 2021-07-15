import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourSchedulerComponent } from './hour-scheduler.component';

describe('HourSechedulerComponent', () => {
  let component: HourSchedulerComponent;
  let fixture: ComponentFixture<HourSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
