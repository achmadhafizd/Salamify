import { SelectList } from "react-native-dropdown-select-list";
import * as React from "react";

interface dropdownProps {
  data: any;
  setSelectedValue : any;
}

const CustomDropdown = ({ data,setSelectedValue }: dropdownProps) => {

  return (
    <SelectList
      setSelected={setSelectedValue}
      data={data}
      search={false}
      boxStyles={{ backgroundColor: "#1E1E2D", paddingVertical: 18 }} 
      save="value"
      dropdownTextStyles={{ color: "white" }}
      inputStyles={{ color: "white"}}
      dropdownStyles={{ backgroundColor: "#1E1E2D" }}
    />
  );
};

export default CustomDropdown;
