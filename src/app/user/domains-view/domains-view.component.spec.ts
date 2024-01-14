import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsViewComponent } from './domains-view.component';

describe('DomainsViewComponent', () => {
  let component: DomainsViewComponent;
  let fixture: ComponentFixture<DomainsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
