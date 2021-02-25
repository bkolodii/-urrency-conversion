import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { State } from 'src/app/interfaces/state.interface';
import { reducers } from 'src/app/redux/reducers';
import { CurrencyService } from 'src/app/services/currency.service';
import { StoreModule } from '@ngrx/store';
import { CurrencyComponent } from './currency.component';
import { AmountChangeAction } from 'src/app/redux/actions/amount';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AmountCurrChangeAction } from 'src/app/redux/actions/amountCurr';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { DataStub } from 'src/app/classes/testData';
import { testData, testHistory } from 'src/app/interfaces/testData';
import { HistoryCurrChangeAction } from 'src/app/redux/actions/historyCurr';
describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let service: CurrencyService;
  let store: Store<State>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyComponent],
      providers: [HttpClient
      ],
      imports: [HttpClientModule,
        BrowserModule,
        FormsModule,
        StoreModule.forRoot(reducers),
        BrowserAnimationsModule,
        MatInputModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        HttpClientTestingModule]
    }).overrideComponent(CurrencyComponent, {
      set: {
        providers: [
          { provide: CurrencyService, useClass: DataStub },
        ]
      }
    }).compileComponents();

  });

  beforeEach(() => {
    store = TestBed.get(Store)
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(CurrencyService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    component.getCurrency();
    fixture.detectChanges();
  });

  it(`should have value from`, ((done) => {
    component.currencyFrom({ code: "RUB", value: 123 });
    expect(component.currSelect[0].value == 123).toBeTrue()
    done();
    service.history.next(testHistory);
    fixture.detectChanges();
  }))
  it(`should have value to`, ((done) => {
    component.currencyTo({ code: "PLZ", value: 3 })
    service.history.next(testHistory)
    fixture.detectChanges();
    expect(component.currSelect[1].value == 3).toBeTrue()
    done()
  }))
  it(`should have amount to`, ((done) => {
    component.currSelect[0] = { code: "PLZ", value: 3 }
    component.currSelect[1] = { code: "RUB", value: 10 }
    component.exchange()
    expect(component.amountTo).toEqual(3.33)
    done()
  }))
  it(`should have year from`, (() => {
    component.updated = 2021
    component.onYearFromChange("2015.23")
    expect(component.yearFrom).toEqual(2015)
  }))
  it(`should have year to`, (() => {
    service.history.next(testHistory)
    component.updated = 2021
    component.onYearToChange("2015.23")
    expect(component.yearTo).toEqual(2015)
  }))
  it(`should not have letter in input`, (() => {
    const element = fixture.nativeElement;
    let input: HTMLInputElement = element.querySelectorAll('input')[0]
    input.value = 'can you here that'
    expect(input.value).toEqual('')
  }))
  it(`should have currency`, ((done) => {
    spyOn(service, 'getCurrency').and.returnValue(of(testData))
    component.getCurrency()
    fixture.detectChanges();
    expect(component.currencies).toEqual(Object.keys(testData.rates).map(key => {
      return { code: key, value: testData.rates[key] }
    }));
    done()
  }))

  describe('an element is available in the store', () => {
    beforeEach(() => {
      store.dispatch(new AmountChangeAction(2));
      store.dispatch(new AmountCurrChangeAction([{
        code: "HKD",
        value: 9.4153
      }, {
        code: "PHP",
        value: 59.021
      }]));
      store.dispatch(new HistoryCurrChangeAction(testHistory))
      fixture.detectChanges();
    });
    it('should have an amount in the store', (done) => {
      store.subscribe(data => {
        expect(data.amount).toEqual(2)
      })
      done()
    });
    it('should have currency in the store', (done) => {
      store.subscribe(data => {
        expect((data.currencies * data.amount).toFixed(2)).toEqual(12.54.toFixed(2))
      })
      done()
    });
    it('should have history in the store', (done) => {
      store.subscribe(data => {
        expect(data.history.result.length).toEqual(testHistory[0].length)
      })
      done()
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});