import type { BaseResponse } from "./response";
import type { BaseUser } from "./user";

export type ResponseSession = BaseResponse & {
    data?: BaseUser;
};
