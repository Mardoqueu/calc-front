import { useState } from "react";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { calculateOperation } from "../../services/api";
import { toast } from "react-toastify";
import { CalculatorProps } from "../../interfaces/CalculatorProps";

export const Calculator = ({ onInputChange }: CalculatorProps) => {
  const [input, setInput] = useState<string>("0");

  /**
   * Event handler function to handle click events.
   *
   * This function updates the input value based on the clicked value.
   * If the current input is "0", it replaces it with the new value.
   * Otherwise, it appends the new value to the existing input.
   *
   * @param {string} value - The value to be added to the input.
   */
  const handleClick = (value: string) => {
    setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
  };

  /**
   * handleEqual is an asynchronous function that processes a mathematical input string,
   * replaces any square root notation with a corresponding function, and sends the
   * processed input to a server for calculation. The resulting response updates the input
   * state and triggers a change event.
   *
   * The function performs the following steps:
   * 1. Retrieves the user ID from local storage.
   * 2. If the user ID is not found, it displays an error message.
   * 3. Replaces square root notation (√) in the input string with the corresponding
   *    function format (sqrt()).
   * 4. Sends the processed input to a server function `calculateOperation` for calculation.
   * 5. Updates the input state and calls the `onInputChange` function with the server response.
   * 6. Catches any errors and sets the input state to "0" upon failure.
   *
   * @throws {Error} Throws an error if the user ID is missing from local storage.
   */
  const handleEqual = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return toast.error("Log in again to get user id, user id not found");
      }

      let processedInput = input;
      processedInput = processedInput.replace(/√(\d+)/g, "sqrt($1)");
      const response = await calculateOperation(Number(userId), processedInput);

      setInput(response);
      onInputChange(response);

      return;
    } catch {
      setInput("0");
    }
  };

  /**
   * Resets the input value to its default state.
   *
   * This function sets the input to "0", and if an error occurs during this process,
   * it sets the input to "Error".
   */
  const handleClear = () => {
    try {
      setInput("0");
    } catch {
      setInput("Error");
    }
  };

  return (
    <Box
      sx={{
        minWidth: 280,
        maxWidth: 400,
        bgcolor: "#f0f0f0",
        border: "2px solid #cccccc",
        borderRadius: 2,
        padding: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" align="center" fontWeight={600} gutterBottom>
        Calculator
      </Typography>
      <InputBase
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid #cccccc",
          borderRadius: 2,
          padding: 1,
          height: 60,
          color: "#333",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 600,
          fontSize: 24,
          textAlign: "right",
          mb: 2,
        }}
        value={input}
        inputProps={{
          style: {
            textAlign: "center",
          },
        }}
        fullWidth
      />
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
        {["9", "8", "7", "6", "5", "4", "3", "2", "1"].map((num) => (
          <Button
            key={num}
            variant="contained"
            color="primary"
            onClick={() => handleClick(num)}
            sx={{ width: "100%", height: 56, fontSize: 20 }}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick("0")}
          sx={{ width: "100%", height: 56, fontSize: 20 }}
        >
          0
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClear}
          sx={{ width: "100%", height: 56, fontSize: 20 }}
        >
          CE
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEqual}
          sx={{ width: "100%", height: 56, fontSize: 20 }}
        >
          =
        </Button>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} mt={2}>
        {["+", "-", "*", "/", "√", "."].map((operator) => (
          <Button
            key={operator}
            variant="contained"
            color="secondary"
            onClick={() => handleClick(operator)}
            sx={{ width: "100%", height: 56, fontSize: 20 }}
          >
            {operator}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
