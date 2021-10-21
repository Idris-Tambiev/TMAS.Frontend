import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsPageComponent } from './columns-page.component';

describe('ColumnsPageComponent', () => {
  let component: ColumnsPageComponent;
  let fixture: ComponentFixture<ColumnsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
