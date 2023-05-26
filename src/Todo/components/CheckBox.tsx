import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

type CheckboxType = {
    handleChange?: () => void
    checked: boolean
}

const ControlledCheckbox:React.FC<CheckboxType> = props => {
  const { handleChange, checked } = props

  return (
    <Checkbox
      defaultChecked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

export default ControlledCheckbox