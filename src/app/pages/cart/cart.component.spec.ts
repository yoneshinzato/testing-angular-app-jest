import { CartComponent } from "./cart.component"
import { ComponentFixture, TestBed, inject } from "@angular/core/testing"
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
                // CartComponent
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

        //testing method inside ngOnInit of the Cart Component
        jest.spyOn(service, 'getBooksFromCart').mockImplementation( () => listBook)
    })

    afterEach( () => {
        fixture.destroy()
        jest.resetAllMocks()
    })

    it('should create CartComponent', () => {
        expect(component).toBeTruthy();
    })

    // alternate form to test. include CartComponent in provider
    // it('should create', inject([CartComponent], (component2: CartComponent) => {
    //     expect(component2).toBeTruthy()
    // }))

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
        // const service2 = TestBed.get(BookService) - older version Angular 8-
        
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

    it('onClearBooks works correctly', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null)
        //testing a private method from a component
        const spy2 = jest.spyOn(component as any, "_clearListCartBook");
        component.listCartBook = listBook
        component.onClearBooks()
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
        expect(spy2).toHaveBeenCalledTimes(1)
    })

    it("_clearListBook works correctly", () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null)
        component.listCartBook = listBook
        component['_clearListCartBook']()
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
    })

})