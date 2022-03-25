import React from "react";
import {
    createStyles,
    Header,
    Autocomplete,
    Group,
    Burger,
    Avatar,
    Menu,
    Divider,
} from "@mantine/core";
import {
    Heart,
    Logout,
    Message,
    PlayerPause,
    Search,
    Settings,
    Star,
    SwitchHorizontal,
    Trash,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        position: "sticky",
        top: "0px",
    },

    inner: {
        height: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    links: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    search: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },
}));

export function TopNav({ links = [], setNavOpen, navOpen }) {
    const { classes, theme } = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={56} className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger
                        opened={!navOpen}
                        onClick={() => setNavOpen(!navOpen)}
                        size="sm"
                    />
                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <Menu
                        control={
                            <Avatar radius="xl" style={{ cursor: "pointer" }} />
                        }
                    >
                        <Menu.Item
                            icon={
                                <Heart size={14} color={theme.colors.red[6]} />
                            }
                        >
                            Liked posts
                        </Menu.Item>
                        <Menu.Item
                            icon={
                                <Star
                                    size={14}
                                    color={theme.colors.yellow[6]}
                                />
                            }
                        >
                            Saved posts
                        </Menu.Item>
                        <Menu.Item
                            icon={
                                <Message
                                    size={14}
                                    color={theme.colors.blue[6]}
                                />
                            }
                        >
                            Your comments
                        </Menu.Item>

                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item icon={<Settings size={14} />}>
                            Account settings
                        </Menu.Item>
                        <Menu.Item icon={<SwitchHorizontal size={14} />}>
                            Change account
                        </Menu.Item>
                        <Menu.Item icon={<Logout size={14} />}>
                            Logout
                        </Menu.Item>

                        <Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item icon={<PlayerPause size={14} />}>
                            Pause subscription
                        </Menu.Item>
                        <Menu.Item color="red" icon={<Trash size={14} />}>
                            Delete account
                        </Menu.Item>
                    </Menu>
                </Group>
            </div>
        </Header>
    );
}
