import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDragComponent } from './cards-drag.component';

describe('CardsDragComponent', () => {
  let component: CardsDragComponent;
  let fixture: ComponentFixture<CardsDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
