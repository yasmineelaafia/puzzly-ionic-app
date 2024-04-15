import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SoloPage } from './solo.page';

describe('SoloPage', () => {
  let component: SoloPage;
  let fixture: ComponentFixture<SoloPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(SoloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
