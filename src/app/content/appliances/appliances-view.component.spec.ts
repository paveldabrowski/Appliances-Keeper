import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliancesViewComponent } from './appliances-view.component';

describe('AppliancesViewComponent', () => {
  let component: AppliancesViewComponent;
  let fixture: ComponentFixture<AppliancesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliancesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliancesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
