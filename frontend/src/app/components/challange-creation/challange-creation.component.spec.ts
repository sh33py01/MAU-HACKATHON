import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallangeCreationComponent } from './challange-creation.component';

describe('ChallangeCreationComponent', () => {
  let component: ChallangeCreationComponent;
  let fixture: ComponentFixture<ChallangeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallangeCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallangeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
