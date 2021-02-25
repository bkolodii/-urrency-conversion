import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { State } from 'src/app/interfaces/state.interface';
import { HistoryCurrChangeAction } from 'src/app/redux/actions/historyCurr';
import { reducers } from 'src/app/redux/reducers';
import { CurrencyService } from 'src/app/services/currency.service';

import { ChartsComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let service: CurrencyService;
  let store: Store<State>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartsComponent],
      providers: [HttpClient,
        {
          provide: CurrencyService, useClass: CurrencyService
        }
      ],
      imports: [HttpClientModule,
        BrowserModule,
        FormsModule,
        StoreModule.forRoot(reducers),
        BrowserAnimationsModule,
        HttpClientTestingModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    store = TestBed.get(Store)
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CurrencyService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    const history = [[{
      code: "HKD",
      data: "2014-12-31",
      value: 9.417

    }], [{
      code: "CAD",
      data: "2014-12-31",
      value: 1.4063
    }]]
    store.dispatch(new HistoryCurrChangeAction(history))
    fixture.detectChanges();
  });

  it('should state containe hitory date', () => {
    component.buildChart()
    expect(component.state.history.date).toContain("2014-12-31")
  });

  it('should state containe hitory result', () => {
    component.buildChart()
    expect(component.state.history.result[0].toFixed(2)).toEqual(0.15.toFixed(2))
  });
});
