import React, { useState } from "react";
import { createStyles, Navbar, Group, Code, Burger } from "@mantine/core";
import { BellRinging, Fingerprint, Receipt2, Logout } from "tabler-icons-react";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
        burger: {
            [theme.fn.largerThan("md")]: {
                display: "none",
            },
        },
        navbar: {
            width: "300px",
            top: "0",
            height: "auto",
            minHeight: "100%",
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                color: theme.colorScheme === "dark" ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color:
                        theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[2]
                    : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.fn.rgba(
                              theme.colors[theme.primaryColor][8],
                              0.25
                          )
                        : theme.colors[theme.primaryColor][0],
                color:
                    theme.colorScheme === "dark"
                        ? theme.white
                        : theme.colors[theme.primaryColor][7],
                [`& .${icon}`]: {
                    color: theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 5 : 7
                    ],
                },
            },
        },
    };
});

const data = [
    { link: "", label: "Register Donner", icon: BellRinging },
    { link: "", label: "Register Requestor", icon: Receipt2 },
    { link: "", label: "Register Authority", icon: Fingerprint },
];

export default function SideNav({ setNavOpen, navOpen }) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Billing");

    const links = data.map((item) => (
        <a
            className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
            })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <Navbar p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Code className={classes.version}>v3.1.2</Code>
                    <Burger
                        className={classes.burger}
                        opened={!navOpen}
                        onClick={() => setNavOpen(!navOpen)}
                        size="sm"
                    />
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a
                    href="#"
                    className={classes.link}
                    onClick={(event) => event.preventDefault()}
                >
                    <Logout className={classes.linkIcon} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}
