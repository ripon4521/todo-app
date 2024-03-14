import { Select } from "antd";

const SelectSearch = () => {
  return (
    <div>
      <Select
        showSearch
        style={{ width: 150 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "1",
            label: "All",
          },
          {
            value: "2",
            label: "Low",
          },
          {
            value: "3",
            label: "Medeium",
          },
          {
            value: "3",
            label: "High",
          },
        ]}
      />
    </div>
  );
};

export default SelectSearch;
