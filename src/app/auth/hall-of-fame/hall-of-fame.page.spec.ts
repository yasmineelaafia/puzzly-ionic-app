import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HallOfFamePage } from './hall-of-fame.page';

describe('HallOfFamePage', () => {
  let component: HallOfFamePage;
  let fixture: ComponentFixture<HallOfFamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HallOfFamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
