import { createStyles } from "@mantine/core";

const useGridStyle = createStyles((theme) => ({
    tableHead: {
        input: {
            backgroundColor: theme.colorScheme !== "dark" ? "inherit" : theme.colors.dark[5] + "!important",
            color: theme.colorScheme !== "dark" ? "inherit" : theme.colors.dark[0] + "!important",
            borderColor: theme.colorScheme !== "dark" ? "inherit" : theme.colors.dark[3] + "!important",
            "&::placeholder": {
                color: theme.colorScheme !== "dark" ? theme.colors.gray[5] : theme.colors.dark[3],
            },
            "&:focus": {
                boxShadow: "none !important",
                borderColor:
                    theme.colorScheme !== "dark"
                        ? theme.colors[theme.primaryColor][5] + "!important"
                        : theme.colors[theme.primaryColor][8] + "!important",
            },
        },
    },
    tableTd: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] + "!important" : "inherit",
        borderColor: theme.colorScheme === "dark" ? theme.colors.gray[8] + "!important" : "inherit",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] + "!important" : "inherit",
    },
    tableTh: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] + "!important" : "inherit",
        borderColor: theme.colorScheme === "dark" ? theme.colors.gray[8] + " !important" : "inherit",

        color: theme.colorScheme === "dark" ? theme.colors.dark[2] + " !important" : "inherit",
    },
    tableFooter: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] + "!important" : "inherit",
        borderColor: theme.colorScheme === "dark" ? theme.colors.gray[8] + "!important" : "inherit",
        ".gridjs-summary": {
            color: theme.colorScheme === "dark" ? theme.colors.dark[2] + " !important" : "inherit",
        },
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] + "!important" : "inherit",
        button: {
            "&": {
                borderColor: theme.colorScheme === "dark" ? theme.colors.gray[8] + "!important" : "inherit",
                backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[6] + "!important" : "inherit",
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] + "!important" : "inherit",
            },
            "&[disabled]": {
                backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[4] + "!important" : "inherit",
                color: theme.colorScheme === "dark" ? theme.colors.dark[3] + "!important" : "inherit",
            },
            "&:not([disabled]):not(.gridjs-currentPage):hover": {
                backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[5] + "!important" : "inherit",
                color: theme.colorScheme === "dark" ? theme.colors.dark[2] + "!important" : "inherit",
            },
            "&.gridjs-currentPage": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors[theme.primaryColor][8] + "!important"
                        : "inherit",
                color: theme.colorScheme === "dark" ? "white !important" : "inherit",
                borderColor:
                    theme.colorScheme !== "dark"
                        ? "inherit"
                        : theme.colors[theme.primaryColor][8] + "!important",
            },
        },
    },
    tableContainer: {
        fontFamily: theme.fontFamily,
        ".gridjs-wrapper": {
            borderColor: "inherit",
            boxShadow: `0 1px 3px 0 #0000001a, 0 1px 2px 0 #00000042`,
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
        },
    },
}));

export default useGridStyle;
