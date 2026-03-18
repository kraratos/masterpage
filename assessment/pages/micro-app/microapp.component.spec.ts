import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroAppComponent } from './microapp.component';

describe('FormaldeideComponent', () => {
  let component: MicroAppComponent;
  let fixture: ComponentFixture<MicroAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicroAppComponent]
    });
    fixture = TestBed.createComponent(MicroAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
