import {
    createStyles,
    Navbar,
    Group,
    Burger,
    Avatar,
    Text,
    ScrollArea,
    ThemeIcon,
    Title,
    Divider,
    Box,
    ActionIcon,
} from "@mantine/core";
import { BellRinging, Receipt2, Logout, Home, NewSection, Activity } from "tabler-icons-react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

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
            height: "100%",
            minHeight: "100%",
        },

        header: {
            paddingBottom: theme.spacing.md,
            borderBottom: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === "dark" ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === "dark" ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
                        : theme.colors[theme.primaryColor][0],
                color: theme.colorScheme === "dark" ? theme.white : theme.colors[theme.primaryColor][7],
                [`& .${icon}`]: {
                    color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7],
                },
            },
        },
        icon: {
            color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5],
        },

        name: {
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            color: theme.colorScheme === "dark" ? "white" : "black",
        },
    };
});

const data = [
    { link: "/", label: "Home", icon: Home, access: ["admin", "user"] },
    { link: "/new-request", label: "Request", icon: NewSection, access: ["admin"] },
    { link: "/register-donor", label: "Register Donor", icon: BellRinging, access: ["user"] },
    { link: "/donors", label: "Donors", icon: BellRinging, access: ["user"] },
    { link: "/register-requestor", label: "Register Requestor", icon: Receipt2, access: ["user"] },
    { link: "/requestors", label: "Requestor", icon: Receipt2, access: ["user"] },
    { link: "/report", label: "Report", icon: Receipt2, access: ["admin"] },
];

interface props {
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navOpen: boolean;
    user: UserState;
}

const SideNav: React.FC<props> = ({ setNavOpen, navOpen, user }) => {
    const { classes, cx } = useStyles();

    const links = data
        .filter((item) => item.access.includes(user?.role || ""))
        .map((item) => (
            <NavLink
                className={(navData) =>
                    cx(classes.link, {
                        [classes.linkActive]: navData.isActive,
                    })
                }
                to={item.link}
                key={item.label}
            >
                <item.icon className={classes.linkIcon} />
                <span>{item.label}</span>
            </NavLink>
        ));

    return (
        <Navbar p="xs" className={classes.navbar}>
            <Navbar.Section>
                <Group mb="md" position="apart">
                    <Group spacing="xs">
                        <ThemeIcon size="xl" radius="xl" variant="light">
                            <Activity />
                        </ThemeIcon>
                        <Title
                            order={3}
                            sx={(theme) => ({
                                color: theme.colorScheme === "dark" ? "white" : "inherit",
                            })}
                        >
                            Organ Donation
                        </Title>
                    </Group>
                    <Burger
                        className={classes.burger}
                        opened={!navOpen}
                        onClick={() => setNavOpen(!navOpen)}
                        size="sm"
                    />
                </Group>
            </Navbar.Section>
            <Divider mb="md" />

            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                {links}
            </Navbar.Section>
            <Divider />
            <Navbar.Section p="xs">
                <Group>
                    <Avatar p={0} radius="xl" />
                    <Box sx={{ flex: 1 }}>
                        <Text
                            size="sm"
                            weight={500}
                            sx={(theme) => ({
                                color: theme.colorScheme === "dark" ? "white" : "inherit",
                            })}
                        >
                            {user?.name}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {user?.email}
                        </Text>
                    </Box>

                    <ActionIcon>
                        <Logout />
                    </ActionIcon>
                </Group>
            </Navbar.Section>
        </Navbar>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(SideNav);
