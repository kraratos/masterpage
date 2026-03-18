import { TestBed } from '@angular/core/testing';

import { DateUtil } from './dateUtils';
import * as luxon from 'luxon';

describe('dateUtils', () => {
  let util: DateUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
   // util = TestBed.inject(DateUtil);
  });


  it('diff days are correct',()=>{
    var a= new Date();
    a.setMilliseconds( Date.parse("10-05-2024"));
    var b = new Date();
    b.setMilliseconds( Date.parse('05-05-2024'))

    expect(

        DateUtil.getDateDiffDays(new Date('05-05-2024'),new Date("05-10-2024"))
    ).toBe(5);
  });
 

  it('add 5 days are correct',()=>{
    var data =  DateUtil.aggiungiGiorni(new Date('05-05-2024'),5)

    expect(

    data.getDate()
    ).toBe(10);
  });

  it('sub 5 days are correct',()=>{
    var data =  DateUtil.sottraiGiorni(new Date('05-15-2024'),5)
    console.log(data);
    expect(

    data.getDate()
    ).toBe(10);
  });

  it('utc_date_to_timezone  is correct',()=>{
   var dt= luxon.DateTime.fromObject({
      day:5,
      month:5,
      year:2024,
      hour:24,
      minute:0,
      second:0
    })
    dt.setZone("europe/rome",{keepCalendarTime:true});
    var data =  DateUtil.utc_date_to_timezone(dt.toJSDate(),"europe/sofia")
    
    console.log(data);
    expect(

    data
    ).toBe( '2024-05-06 01:00:00');//+1h
  });

  it('timezone_to_UTC_date_string  is correct',()=>{
    var dt= luxon.DateTime.fromObject({
       day:5,
       month:5,
       year:2024,
       hour:24,
       minute:0,
       second:0
     })
     dt.setZone("europe/sofia",{keepCalendarTime:true});//gmt+3h
     var data =  DateUtil.timezone_to_UTC_date_string(dt.toJSDate(),"europe/sofia")
     
     console.log(data);
     expect(
 
     data
     ).toBe( '2024-05-05 21:00:00');//-3h
   });

   it('timezone_to_UTC_date_string  is correct',()=>{
    var dt= luxon.DateTime.fromObject({
       day:5,
       month:5,
       year:2024,
       hour:24,
       minute:0,
       second:0
     })
     dt.setZone("europe/sofia",{keepCalendarTime:true});//gmt+3h
     var data =  DateUtil.timezone_to_UTC_millis(dt.toJSDate(),"europe/sofia")
     var dt1= luxon.DateTime.fromObject({
      day:5,
      month:5,
      year:2024,
      hour:21,
      minute:0,
      second:0
    })
     console.log(data);
     expect(
 
     data
     ).toBe(1714942800000);//-3h '2024-05-05 21:00:00'
   });
});