import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PuzzlyPhaserComponent } from './puzzly-phaser.component';

describe('PuzzlyPhaserComponent', () => {
  let component: PuzzlyPhaserComponent;
  let fixture: ComponentFixture<PuzzlyPhaserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlyPhaserComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzlyPhaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
