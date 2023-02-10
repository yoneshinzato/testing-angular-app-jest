import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
    ReactiveFormsModule
      ],
      declarations: [FormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('name is required', () => {
    const nameField = component.form.get('name')
    nameField.setValue('') //an error occurs
    expect(nameField.valid).toBe(false)
  })

  it('name fields has an error with more than 5 characters', () => {
    const nameField = component.form.get('name')
    nameField.setValue('test name')
    expect(nameField.valid).toBe(false)
  })

  it('name fields is correct with less than 5 characters', () => {
    const nameField = component.form.get('name')
    nameField.setValue('test')
    expect(nameField.valid).toBe(true)
  })

  it('email is required', () => {
    const emailField = component.form.get('email')
    emailField.setValue('') //an error occurs
    expect(emailField.valid).toBe(false)
  })
  it('email is valid', () => {
    const emailField = component.form.get('email')
    emailField.setValue('yone@') //an error occurs
    expect(emailField.valid).toBe(false)
    emailField.setValue('yone@gmail.com')
    expect(emailField.valid).toBe(true)
  })

  it('email is valid', () => {
    const nameField = component.form.get('name')
    const emailField = component.form.get('email')
    nameField.setValue('Yone')
    emailField.setValue('yone@gmail.com')
    expect(component.form.valid).toBe(true)
  })



});
