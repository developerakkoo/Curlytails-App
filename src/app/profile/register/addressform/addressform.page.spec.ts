import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressformPage } from './addressform.page';

describe('AddressformPage', () => {
  let component: AddressformPage;
  let fixture: ComponentFixture<AddressformPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddressformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
