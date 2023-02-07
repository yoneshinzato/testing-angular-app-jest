import { HomeComponent } from "./home.component"
import { ComponentFixture, TestBed, } from "@angular/core/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core"
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

const bookServiceMock = {
    getBooks: () => of(listBook)
}

@Pipe({name: 'reduceText'})
class ReducePipeMock implements PipeTransform {
    transform(): string {
        return ''
    }
}

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
                HomeComponent,
                ReducePipeMock
            ],
            providers: [
                // BookService - you can call it here and use the jest.spyOn method
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
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
    // works exactly like beforeEach
    // beforeAll( () => {
    // })
    // after each test
    // afterEach( () => {
    // })
    //after finishing all tests
    // afterAll( () => {
    // })

    it('should create', () => {
        expect(component).toBeTruthy()
    })


    it('getBooks get books from the subscription', () => {
        // Angular 8-
        // const bookService = TestBed.get(BookService)
        // Angular 9+
        const bookService = fixture.debugElement.injector.get(BookService)
        // const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce( of(listBook) )
        component.getBooks()
        // expect(spy1).toHaveBeenCalledTimes(1)
        
        expect(component.listBook.length).toBe(3)
        expect(component.listBook).toEqual(listBook)
    })
    // xit() - ignore this specific test suite
    // xdescribe() - works the same way
    // fit() ou it.only() - test only this specific suite
    // fdescribe() describe.only() works similarly
}

})