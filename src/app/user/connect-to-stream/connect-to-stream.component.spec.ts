import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToStreamComponent } from './connect-to-stream.component';

describe('ConnectToStreamComponent', () => {
  let component: ConnectToStreamComponent;
  let fixture: ComponentFixture<ConnectToStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectToStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectToStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
