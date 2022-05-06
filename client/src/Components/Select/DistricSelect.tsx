import { Select, SelectProps } from "@mantine/core";
import district from "../../json/district.json";

const DistrictSelect: React.FC<SelectProps & { state: string } & React.RefAttributes<HTMLInputElement>> = ({
    state,
    ...rest
}) => {
    return (
        <Select
            clearable
            searchable
            placeholder="Pick one"
            {...rest}
            // @ts-ignore
            data={[...district[state]]}
        />
    );
};

export default DistrictSelect;
