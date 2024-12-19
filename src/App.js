import "./App.css";
import { useState } from "react";
import { Box, TextField, Checkbox, FormControlLabel, Stack, Button } from "@mui/material";

let newTodo;
function App() {
  const todoItems = [];
  const [todos, setTodos] = useState(todoItems);
  const [todo, setTodo] = useState("");
  const [buttonName, setButtonName] = useState("Todo App");
  const [disabled, setDisabled] = useState(true);
  const AddItem = (e) => {
    e.preventDefault();
    setTodos([...todos, { label: todo, id: todos.length + 1, checked: false }]);
    setTodo("");
  };
  const handleCheck = (id, isChecked) => {
    newTodo = todos.map((item) => (item.id + "" === id.target.id ? { ...item, checked: isChecked } : item));
    setTodos(newTodo);
    setButtonName(newTodo.filter((item) => item.checked).length > 0 ? "Delete Selected" : "Todo App");
    setDisabled(newTodo.every((item) => !item.checked));
  };

  const HandleDelete = () => {
    setTodos(newTodo.filter((item) => !item.checked));
    setButtonName("Todo App");
    setDisabled(true);
  };
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "0%",
        transform: "translate(-50%, 0%)",
        textAlign: "center",
      }}
    >
      <Button
        variant="contained"
        id="button"
        disabled={disabled}
        style={{
          margin: 12,
        }}
        onClick={HandleDelete}
      >
        {buttonName}
      </Button>

      <Box
        component="form"
        sx={{
          width: "100%",
          borderRadius: 5,
        }}
        onSubmit={(e) => AddItem(e)}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={0}>
          <TextField
            id="outlined-basic"
            label="Enter Task and press Enter"
            variant="outlined"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {todos.map((item) => (
            <FormControlLabel control={<Checkbox id={item.id} checked={item.checked} onChange={handleCheck} />} label={item.label} key={item.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
}

export default App;
