import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragCardComponent } from './cards-drag/drag-card.component';

describe('DragComponentComponent', () => {
  let component: DragCardComponent;
  let fixture: ComponentFixture<DragCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
