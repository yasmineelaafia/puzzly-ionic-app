import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoicePage } from './voice.page';

describe('VoicePage', () => {
  let component: VoicePage;
  let fixture: ComponentFixture<VoicePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
