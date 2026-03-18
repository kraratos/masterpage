import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToasterMessageComponent } from './toaster-message.component';
import { ToasterMessageService } from 'src/services/toaster-message.service';
 
describe('ToasterMessageComponent', () => {
  let component: ToasterMessageComponent;
  let fixture: ComponentFixture<ToasterMessageComponent>;
  let toasterMessageService: ToasterMessageService;
 
 
 
  beforeEach(() => {
    toasterMessageService = new ToasterMessageService();
    TestBed.configureTestingModule({
      declarations: [ToasterMessageComponent],
      providers: [
        { provide: ToasterMessageService, useValue: toasterMessageService }
      ]
    });
    fixture = TestBed.createComponent(ToasterMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
 
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
   
 
  it('should call hideToasterMessage() from ToasterMessageService when handleCloseToasterMessage() is invoked', () => {
    const hideSpy = spyOn(toasterMessageService, 'hideToasterMessage');
    component.handleCloseToasterMessage();
    expect(hideSpy).toHaveBeenCalled();
  });
 
});

