import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeGuestPage } from './home-guest.page';

describe('HomeGuestPage', () => {
  let component: HomeGuestPage;
  let fixture: ComponentFixture<HomeGuestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeGuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
