import { FormControl, MenuItem, Select } from "@mui/material";

const TOP_OPTIONS = [5, 10, 15, 20];

export function TopSelector({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 130 }}>
      <Select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        displayEmpty
      >
        {TOP_OPTIONS.map((n) => (
          <MenuItem key={n} value={n}>
            Top {n}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

