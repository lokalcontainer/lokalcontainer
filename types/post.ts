import { BaseResponse } from "./response";
import { BaseUser } from "./user";

type ImageAttr = {
    url: string;
    width: number;
    height: number;
};

export type BaseImage = {
    name: string;
    dominant: { r: number; g: number; b: number };
    large: ImageAttr;
    small: ImageAttr;
};

export type PostType = "font" | "blog" | "article" | "goods";

export type BasePost = {
    id: string;
    author: BaseUser;
    slug: string;
    title: string;
    type: PostType;
    createdAt: string;
    updatedAt: string;
    images: BaseImage[];
};

export type ResponsePosts = BaseResponse & {
    data: BasePost[];
};

export type ResponsePost = BaseResponse & {
    data: BasePost;
};
