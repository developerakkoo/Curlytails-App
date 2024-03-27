import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressMapPage } from './address-map.page';

describe('AddressMapPage', () => {
  let component: AddressMapPage;
  let fixture: ComponentFixture<AddressMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddressMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
