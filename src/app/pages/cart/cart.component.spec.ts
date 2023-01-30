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

})