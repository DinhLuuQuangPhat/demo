import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { ComboBox } from "@progress/kendo-react-dropdowns";
const FieldEditCombobox = (fieldRenderProps) => {
  const {
    title,
    id,
    disabled,
    value,
    data,
    textField,
    dataItemKey,
    onComboboxChange,
    defaultValue,
    ...others
  } = fieldRenderProps;
  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={"k-form-field-wrap"}>
        <ComboBox
          className={`bg-white`}
          disabled={disabled}
          name={id}
          id={id}
          style={{ borderColor: "grey" }}
          data={data}
          value={value}
          textField={textField}
          dataItemKey={dataItemKey}
          defaultValue={defaultValue}
          onChange={(e) => {
            onComboboxChange(e, id);
          }}
          size="small"
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditCombobox;
