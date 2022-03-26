import { Container, createStyles } from "@mantine/core";
import { useState } from "react";
import SideNav from "./SideNav";
import { TopNav } from "./TopNav";
const Nav = ({ children }) => {
    const useStyles = createStyles((theme) => ({
        closeSideBar: {
            left: "-300px !important",
        },
        layout: {
            overflow: "hidden",
            position: "relative",
            height: "100%",
            width: "100%",
        },
        sideBar: {
            height: "100%",
            transition: "all 0.2s linear",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: "200",
        },
        main: {
            overflow: "auto",
            height: "100%",
            transition: "margin 0.2s linear",
            [theme.fn.largerThan("md")]: {
                marginLeft: "300px",
            },
        },
        closeSideBarMain: {
            marginLeft: "0px",
        },
        mainBackground: {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    }));
    const { classes, theme } = useStyles();
    const [navOpen, setNavOpen] = useState(
        window.innerWidth <= theme.breakpoints.md ? true : true
    );
    return (
        <div className={classes.layout}>
            <aside
                className={` ${navOpen ? classes.closeSideBar : ""} ${
                    classes.sideBar
                }`}
            >
                <SideNav navOpen={navOpen} setNavOpen={setNavOpen} />
            </aside>
            <main
                className={`${classes.main} ${classes.mainBackground} ${
                    navOpen ? classes.closeSideBarMain : ""
                }`}
            >
                <TopNav navOpen={navOpen} setNavOpen={setNavOpen} />
                <Container size="xl" fluid my={"md"}>
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default Nav;
