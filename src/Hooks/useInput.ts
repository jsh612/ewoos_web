import React, { useState } from "react";

export default (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange, setValue };
};
