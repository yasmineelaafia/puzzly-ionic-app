
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeSelectionPage } from './mode-selection.page';

describe('ModeSelectionPage', () => {
  let component: ModeSelectionPage;
  let fixture: ComponentFixture<ModeSelectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModeSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
