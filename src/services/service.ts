import axios from "axios";
import { BASE_URL } from "../constant/constant";
import { AddEvent, ApiResponse, Event } from "../interfaces/interfaces";

class Service {
  static async getRooms() {
    return await axios.get<any>(`${BASE_URL}/user/spaces`);
  }
  static async addEvent(eventData : AddEvent) {
    return await axios.post<any>(`${BASE_URL}/user/space/booking/slot`, eventData);
  }
  static async userDetails() {
    return await axios.get<any>(`${BASE_URL}/user/details`);
  }
  static async getEventsByDate(date: any) {
    return await axios.get<ApiResponse<{[key :string] : Event[]}>>(`${BASE_URL}/user/booked/slot?date=${date}`);
  }
  static async deleteEvent(eventId: string, reason: string) {
    return await axios.post<any>(
      `${BASE_URL}/space/booking/cancel?bookingId=${eventId}`, {reason});
  }
  static async updateEvent(eventId: string| undefined, updateData : AddEvent) {
    return await axios.post<any>(`${BASE_URL}/booking/update/${eventId}`, updateData);
  }
}
export default Service;
