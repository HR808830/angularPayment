import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayumoneyComponent } from './payumoney.component';

describe('PayumoneyComponent', () => {
  let component: PayumoneyComponent;
  let fixture: ComponentFixture<PayumoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayumoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayumoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
