import { BaseResponse } from "./response";

export type BaseUser = {
    id: string;
    role: number;
    email: string;
    name: string;
    userName: string;
};

export type Profile = BaseUser & {
    image: string | null;
    access: boolean;
    createdAt: string;
    updatedAt: string;
};

export type Author = BaseUser & {
    image?: string | null;
};

export type ResponseUser = BaseResponse & {
    data: BaseUser & {
        image: string | null;
        access: boolean;
        createdAt: string;
        updatedAt: string;
    };
};
