import { Select } from "@mantine/core";
import states from "../../json/state.json";

const StateSelect = ({ ...rest }) => {
    return (
        <Select
            clearable
            searchable
            placeholder="Pick one"
            {...rest}
            styles={{
                dropdown: {
                    textTransform: "capitalize",
                },
            }}
            data={states}
        />
    );
};

export default StateSelect;
