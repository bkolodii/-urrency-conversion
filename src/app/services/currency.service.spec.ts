import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientModule]
    });
    service = TestBed.get(CurrencyService);
  });
  it('should return base currency value', (done) => {
    service.getCurrency().subscribe(value => {
      expect(value.base).toBe("EUR")
      done()

    })
  })
  it('should return date currency calculate', (done) => {
    service.getCurrHisrory(2015).subscribe(value => {
      expect(value.date.substr(0, 4)).toBe("2014")
      done()
    })
  })
  it('should return date currency calculate', (done) =>{
    service.getCurrency().subscribe( value => {
      expect(value.rates.hasOwnProperty("USD")).toBeTrue()
    })
    done()
  })

});

