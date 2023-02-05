import { HomeComponent } from "./home.component"
import { ComponentFixture, TestBed, } from "@angular/core/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import { BookService } from "../../services/book.service";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";

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

describe('Home component', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>
{
    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ], 
            declarations: [
                HomeComponent
            ],
            providers: [
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()
        
    })

    beforeEach( () => {
        fixture = TestBed.createComponent(HomeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })


    it('getBooks get books from the subscription', () => {
        // Angular 8-
        // const bookService = TestBed.get(BookService)
        // Angular 9+
        const bookService = fixture.debugElement.injector.get(BookService)
        const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce( of(listBook) )
        component.getBooks()
        expect(spy1).toHaveBeenCalledTimes(1)
        expect(component.listBook.length).toBe(3)
        expect(component.listBook).toEqual(listBook)
    })


}

})