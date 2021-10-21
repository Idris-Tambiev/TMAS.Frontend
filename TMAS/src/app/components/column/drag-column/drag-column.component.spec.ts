import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragColumnComponent } from './drag-column.component';

describe('DragColumnComponent', () => {
  let component: DragColumnComponent;
  let fixture: ComponentFixture<DragColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
