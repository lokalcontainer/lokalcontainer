import type { ChangeEvent, CSSProperties } from "react";
import type { ResponseSession } from "types/session";
import { useRouter } from "next/router";
import { Formik } from "formik";
import fetchJson from "libs/lib.fetch";
import { useSession } from "components/Context/ContextSession";

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
        <li>
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
        </li>
    );
};

export const FormSignIn = () => {
    const { replace, query } = useRouter();
    const { mutateSession } = useSession();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--grid-gap)",
                maxWidth: 320
            }}
        >
            <div style={{ fontSize: "2em", fontWeight: "bold" }}>Sign In</div>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(v, a) => {
                    fetchJson<ResponseSession>("/api/v1/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(v)
                    })
                        .then((res) => {
                            if (!res.success) {
                                // @ts-ignore
                                a.setErrors({ [res.data[0].field]: res.data[0].message });
                            } else {
                                if (query.callback_url as string) {
                                    mutateSession().then(() =>
                                        replace(query.callback_url as string)
                                    );
                                } else {
                                    mutateSession();
                                    // mutateSession().then(() =>
                                    //     replace("/[user]", `/${res.data?.userName}`)
                                    // );
                                }
                            }
                        })
                        .catch((err) => console.log(err));
                }}
            >
                {({ values, handleSubmit, handleChange, errors }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
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
                            </ul>
                            <div>
                                <button type="submit">Sign In</button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};
