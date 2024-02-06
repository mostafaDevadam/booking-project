import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewRoomPage } from './new-room.page';

describe('NewRoomPage', () => {
  let component: NewRoomPage;
  let fixture: ComponentFixture<NewRoomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
