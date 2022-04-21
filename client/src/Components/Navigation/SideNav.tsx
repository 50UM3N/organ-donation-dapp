import { createStyles, Navbar, Group, Code, Burger, Avatar, Text } from "@mantine/core";
import { BellRinging, Receipt2, Logout, At, PhoneCall, Home, NewSection } from "tabler-icons-react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import { InitialUserState } from "../../store/reducers/user-reducer";
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
            height: "auto",
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
    { link: "/", label: "Home", icon: Home },
    { link: "/new-request", label: "Request", icon: NewSection },
    { link: "/register-doner", label: "Register Doner", icon: BellRinging },
    { link: "/register-requestor", label: "Register Requestor", icon: Receipt2 },
];

interface props {
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navOpen: boolean;
    user: InitialUserState;
}

const SideNav: React.FC<props> = ({ setNavOpen, navOpen, user }) => {
    const { classes, cx } = useStyles();

    const links = data.map((item) => (
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
        <Navbar p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} mb="md" position="apart">
                    <Code>v3.1.2</Code>
                    <Burger
                        className={classes.burger}
                        opened={!navOpen}
                        onClick={() => setNavOpen(!navOpen)}
                        size="sm"
                    />
                </Group>
                <Group noWrap mb="md">
                    <Avatar size={94} radius="md" />
                    <div>
                        <Text size="xs" sx={{ textTransform: "uppercase" }} weight={700} color="dimmed">
                            {user?.role}
                        </Text>

                        <Text size="lg" weight={500} className={classes.name}>
                            {user?.name}
                        </Text>

                        <Group noWrap spacing={10} mt={3}>
                            <At size={16} className={classes.icon} />
                            <Text size="xs" color="dimmed">
                                {user?.email}
                            </Text>
                        </Group>

                        <Group noWrap spacing={10} mt={5}>
                            <PhoneCall size={16} className={classes.icon} />
                            <Text size="xs" color="dimmed">
                                {user?.mobile}
                            </Text>
                        </Group>
                    </div>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <Logout className={classes.linkIcon} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(SideNav);
