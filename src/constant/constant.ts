import moment from "moment-timezone";

export const YYYY_MM_DD = "YYYY-MM-DD";
export const SGT = moment().tz('Asia/Singapore').format(YYYY_MM_DD);
// export const BASE_URL = "http://192.168.1.10:4000/api/v1";
export const BASE_URL = "https://sandbox.appon.tech/api/v1";

export const TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0ZGEwYmVjMThiMDI3NDkxODRhMDg2MiIsIm1vYmlsZV9ubyI6IjgxMDk2NjY5NDEiLCJkaXNwbGF5X25hbWUiOiJBamF5IiwiZW1haWwiOiJzcGdvMTAwMUBtYWlsaW5hdG9yLmNvbSIsInJvbGUiOiJjY28iLCJjb2RlIjoiMGFqYXkxIiwiaXNfYWN0aXZlIjp0cnVlLCJmY21fdG9rZW4iOltdLCJjbHVzdGVyIjp7Il9pZCI6IjY0ZGEwYjljMThiMDI3NDkxODRhMDg2MSIsIm5hbWUiOiJUZXN0IGNsdXN0ZXIifX0sImlhdCI6MTcxNzEzNTUyNCwiZXhwIjo0ODcyODk1NTI0LCJpc3MiOiJodHRwOi8vdGVjaHBoYW50LmNvbSIsImp0aSI6IjBkMTQwZWUzLWZlMzktNGIxNS1iNDU2LTFlYjY5YTJhMjI4MyJ9.EBI-dfvquPEHlcF66-JhmUrJqCVm6-qUowFGDQcCBPWuAmudwUswqCAnXgXlbXfhsMkr42AQGA4OjYlJTDBqLg';
export const slots = [
    '12:00 am', "12:30 am" ,'01:00 am', "01:30 am" ,'02:00 am',"02:30 am" ,'03:00 am', "03:30 am", '04:00 am',
    "04:30 am",'05:00 am',"05:30 am",'06:00 am',"06:30 am",'07:00 am',"07:30 am",'08:00 am',"08:30 am",
    '09:00 am',"09:30 am",'10:00 am',"10:30 am",'11:00 am',"11:30 am",'12:00 pm',"12:30 pm",'01:00 pm',"01:30 pm",
    '02:00 pm',"02:30 pm",'03:00 pm',"03:30 pm",'04:00 pm',"04:30 pm",'05:00 pm',"05:30 pm",
    '06:00 pm',"06:30 pm",'07:00 pm',"07:30 pm",'08:00 pm',"08:30 pm",'09:00 pm',"09:30 pm",
    '10:00 pm',"10:30 pm",'11:00 pm',"11:30 pm",'11:59 pm'
]
export const maxDateValue = moment().tz("Asia/Singapore").add(2, "months").endOf("month");