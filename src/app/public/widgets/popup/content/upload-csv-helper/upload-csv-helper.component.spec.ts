import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCsvHelperComponent } from './upload-csv-helper.component';

describe('UploadCsvHelperComponent', () => {
  let component: UploadCsvHelperComponent;
  let fixture: ComponentFixture<UploadCsvHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCsvHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCsvHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
