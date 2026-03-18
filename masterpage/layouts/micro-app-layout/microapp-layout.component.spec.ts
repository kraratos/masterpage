import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroAppLayoutComponent } from './microapp-layout.component';

describe('MicroAppLayoutComponent', () => {
  let component: MicroAppLayoutComponent;
  let fixture: ComponentFixture<MicroAppLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicroAppLayoutComponent]
    });
    fixture = TestBed.createComponent(MicroAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
