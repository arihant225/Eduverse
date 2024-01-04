import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAhostComponent } from './become-ahost.component';

describe('BecomeAhostComponent', () => {
  let component: BecomeAhostComponent;
  let fixture: ComponentFixture<BecomeAhostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeAhostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeAhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
