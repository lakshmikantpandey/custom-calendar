export interface Event {
  _id: string,
  date: string;
  holderName?: string;
  title: string;
  resource?: string;
  space_id : string;
  day?: string,
  check_in: {
        slot: string,
        value: string
    },
  check_out: {
        slot: string,
        value: string
    },
  remainders: string[],
  user_id: string,
  created_at?: string,
  updated_at?: string,
  is_active?: boolean,
  is_deleted?: boolean,
  admin_id?: string,
  user_name?: string
}

export type AddEvent = Pick<Event, 'space_id' | 'title' | 'day' | 'remainders' | 'check_in' | 'check_out'>

export interface Rooms {
  _id: string;
  space_name: string;
  space_images: [];
  description: string;
  audiences : string[];
  max_slot: number;
  remainders: Array<{ unit : string, value : number}>;
  is_active: boolean;
  display_order: number;
  branch: [{ _id : string, name : string}];
  is_deleted : boolean;
  created_at : boolean;
  updated_at: boolean;
  businessHours : [{
    from_time : string,
    to_time : string,
    is_available : boolean
  }]
}

export interface User {
    _id: string,
    first_name: string,
    last_name: string,
    display_name: string,
    image: string,
    email: string,
    mobile_no: string,
    role: string,
    code: string,
    cluster: {
        _id: string,
        name: string
    },
    is_active: boolean,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
    is_empty: false,
    last_login: string,
    fcm_token: [],
    points: number,
    enamecard: boolean | null,
    manager_delay_date: number
}

export type ApiResponse<T> = {
  data: {
    data: T;
  };
};