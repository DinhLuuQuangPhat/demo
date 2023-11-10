import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { NumericTextBox } from "@progress/kendo-react-inputs";

const FieldEditNumberic = (fieldRenderProps) => {
  const {
    title,
    id,
    disabled,
    value,
    onChange,
    defaultValue,
    format,
    ...others
  } = fieldRenderProps;
  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={"k-form-field-wrap"}>
        <NumericTextBox
          className={`numberic-right bg-white`}
          disabled={disabled}
          name={id}
          id={id}
          style={{ borderColor: "grey" }}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            onChange(e, id);
          }}
          size="small"
          format={format}
          step={1}
          min={0}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditNumberic;
