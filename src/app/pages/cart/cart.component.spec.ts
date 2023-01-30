import { CartComponent } from "./cart.component"
import { ComponentFixture, TestBed, } from "@angular/core/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from '../../models/book.model';


const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    },
]

describe('Cart component', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>
    let service: BookService

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ], 
            declarations: [
                CartComponent
            ],
            providers: [
                BookService,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()
    })

    beforeEach( () => {
        fixture = TestBed.createComponent(CartComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
        
        //private service
        service = fixture.debugElement.injector.get(BookService)
    })

    it('should create CartComponent', () => {
        expect(component).toBeTruthy();
    })


    it('getTotalPrice returns an amount', () => {
       const totalPrice = component.getTotalPrice(listBook)
       expect(totalPrice).toBeGreaterThan(0)
    //    expect(totalPrice).not.toBe(0)
    //    expect(totalPrice).not.toBeNull()
    })


    it('onInputNumberChange increments correctly', () => {
        const action = 'plus'
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        }

        // const service = (component as any)._bookService
        // const service2 = component['_bookService']
        // const service2 = TestBed.get(BookService) - older version
        
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null)
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null)
        // prove that the method is really incrementing the amount
        expect(book.amount).toBe(2)
        component.onInputNumberChange(action, book)
        expect(book.amount).toBe(3)
        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()

    })
    it('onInputNumberChange decrements correctly', () => {
        const action = 'minus'
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        }

        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation( () => null)
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null)
        expect(book.amount).toBe(2)
        component.onInputNumberChange(action, book)
        expect(book.amount).toBe(1)
        expect(spy).toHaveBeenCalled()
        expect(spy2).toHaveBeenCalled()

    })

})