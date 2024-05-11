import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeHandlerComponent } from './challange-handler.component';

describe('ChallangeHandlerComponent', () => {
  let component: ChallangeHandlerComponent;
  let fixture: ComponentFixture<ChallangeHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallangeHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallangeHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
