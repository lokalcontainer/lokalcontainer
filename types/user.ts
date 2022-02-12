import { BaseResponse } from "./response";

export type BaseUser = {
    id: string;
    role: number;
    email: string;
    name: string;
    userName: string;
};

export type ResponseUser = BaseResponse & {
    data: BaseUser & {
        image: string | null;
        access: boolean;
        createdAt: string;
        updatedAt: string;
    };
};
