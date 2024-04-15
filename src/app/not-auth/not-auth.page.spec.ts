import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotAuthPage } from './not-auth.page';

describe('NotAuthPage', () => {
  let component: NotAuthPage;
  let fixture: ComponentFixture<NotAuthPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
