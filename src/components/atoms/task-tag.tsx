import { Autocomplete, TextField } from "@mui/material";

export default function TaskTag() {
  const options = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
  ];

  return (
    <Autocomplete
      multiple
      disablePortal
      options={options}
      size="small"
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label="Tags" variant="standard" />
      )}
    />
  );
}
