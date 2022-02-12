import type { BaseResponse } from "./response";

export type Session = {
    id: string;
    role: number;
    email: string;
    name: string;
    userName: string;
};

export type ResponseSession = BaseResponse & {
    data?: Session;
};
