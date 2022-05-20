import React from "react";
import { createStyles, Header, Group, Burger, SegmentedControl, Center, Box } from "@mantine/core";
import { Sun, Moon } from "tabler-icons-react";

import { connect } from "react-redux";
import { toggleTheme } from "../../store/actions";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { InitialThemeState } from "../../store/reducers/theme-reducer";
import { ThemeActionType } from "../../store/actions/theme-action";

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
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

interface props {
    setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navOpen: boolean;
    setTheme: (theme: "dark" | "light") => {
        type: ThemeActionType;
        payload: "dark" | "light";
    };
    colorScheme: InitialThemeState;
    user: UserState;
}

const TopNav: React.FC<props> = ({ setNavOpen, navOpen, setTheme, colorScheme, user }) => {
    const { classes } = useStyles();

    return (
        <Header height={56} className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={!navOpen} onClick={() => setNavOpen(!navOpen)} size="sm" />
                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}></Group>
                    <SegmentedControl
                        value={colorScheme}
                        onChange={() => setTheme(colorScheme === "dark" ? "light" : "dark")}
                        data={[
                            {
                                value: "light",
                                label: (
                                    <Center>
                                        <Sun size={16} />
                                        <Box ml={10}>Light</Box>
                                    </Center>
                                ),
                            },
                            {
                                value: "dark",
                                label: (
                                    <Center>
                                        <Moon size={16} />
                                        <Box ml={10}>Dark</Box>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </Group>
            </div>
        </Header>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        colorScheme: state.themeReducer,
        user: state.userReducer,
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setTheme: (theme: "dark" | "light") => dispatch(toggleTheme(theme)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
