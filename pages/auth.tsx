import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ChangeEvent, CSSProperties } from "react";
import type { ResponseSession } from "types/session";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Formik } from "formik";

import fetchJson from "libs/lib.fetch";
import { getServerSession } from "libs/get-server-session";
import { LayoutMain } from "components/LayoutMain";
import { FormSignIn } from "components/Utils/Forms";

type CustomInputProps = {
    label: string;
    type: "email" | "password" | "text";
    value: string;
    placeholder: string;
    error?: string;
    onChange: {
        (e: ChangeEvent<any>): void;
        <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
            ? void
            : (e: string | ChangeEvent<any>) => void;
    };
};

const inputStyle: CSSProperties = {
    appearance: "none",
    background: "none",
    border: "none",
    borderBottom: "1px solid",
    width: "100%",
    fontSize: "inherit",
    fontFamily: "inherit"
};

const CustomInput = (props: CustomInputProps) => {
    const { label, type, value, placeholder, onChange, error } = props;
    return (
        <label style={{ display: "block", marginBottom: "var(--grid-gap)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
                <span style={{ textTransform: "capitalize" }}>{label}</span>
                {error && <span style={{ fontSize: "0.65em" }}>{error}</span>}
            </div>
            <input
                type={type}
                name={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ ...inputStyle }}
            />
        </label>
    );
};

const FormSignUp = () => {
    return (
        <div>
            <div>Sign Up</div>
            <Formik
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={(v, a) => {
                    fetchJson<ResponseSession>("/api/v1/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(v)
                    })
                        .then((res) => {
                            if (!res.success) {
                                a.setErrors({
                                    // @ts-ignore
                                    [res.data[0].field]: res.data[0].message
                                });
                            }
                        })
                        .catch((err) => console.log(err));
                }}
            >
                {({ values, handleSubmit, handleChange, errors }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <CustomInput
                                type="text"
                                label="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                error={errors.name}
                            />
                            <CustomInput
                                type="email"
                                label="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="john.doe@mail.com"
                                error={errors.email}
                            />
                            <CustomInput
                                type="password"
                                label="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="••••••"
                                error={errors.password}
                            />
                            <div>
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type Tab = {
    component: JSX.Element;
    label: string;
};

const tabs: Tab[] = [
    { component: <FormSignIn />, label: "sign-in" },
    { component: <FormSignUp />, label: "sign-up" }
];

export default function Page(props: PageProps) {
    const { replace, query } = useRouter();
    const [selectedTab, setSelectedTab] = useState(tabs[props.tab]);

    useEffect(() => {
        if (query.form === "sign-in") {
            setSelectedTab(tabs[0]);
        } else {
            setSelectedTab(tabs[1]);
        }
    }, [query.form]);

    return (
        <LayoutMain>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {tabs
                    .filter((item) => item.label !== query.form)
                    .map((item, i) => (
                        <li key={i}>
                            <button
                                onClick={() => {
                                    replace(
                                        `/auth?form=${item.label}&callback_url=${
                                            query.callback_url ?? "/"
                                        }`
                                    );
                                }}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
            </ul>

            <AnimatePresence exitBeforeEnter initial={false}>
                <motion.div
                    key={selectedTab ? selectedTab.label : "empty"}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {selectedTab && <>{selectedTab.component}</>}
                </motion.div>
            </AnimatePresence>
        </LayoutMain>
    );
}

export const getServerSideProps: GetServerSideProps<{
    tab: number;
}> = async (ctx) => {
    const responseSession = await getServerSession(ctx);

    if (responseSession.success) {
        return {
            redirect: {
                permanent: false,
                destination: `/${responseSession.data?.userName}?source=auth&message=authorized-user`
            }
        };
    }

    const q = ctx.query.form as string;
    let tab: number = 0;

    if (!q) {
        tab = 0;
    } else if (q === "sign-in") {
        tab = 0;
    } else {
        tab = 1;
    }

    return { props: { tab } };
};
