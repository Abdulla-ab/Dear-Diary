import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addADiaryCard } from "../../pages/Home/HomeSlice";

export default function Form() {
  const [extractedInput, setExtractedInput] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errorTitle, setErrorTitle] = React.useState("");
  const [errorDescription, setErrorDescription] = React.useState("");

  const dispatch = useDispatch();

  const handleExtractInput = (e) => {
    setExtractedInput(true);
  };

  const handleSubmit = (e) => {
    if (title.length > 0 && description.length > 0) {
      const diaryCardId = new Date();
      const diaryCard = {
        timestamp : diaryCardId,
        title: title,
        name: localStorage.getItem("name"),
        description: description,
      };

      try {
        dispatch(addADiaryCard(diaryCard));
        setTitle("");
        setDescription("");
        setExtractedInput(false);
      } catch (error) {
        console.log(error);
      }
    } else if (title.length === 0 && description.length === 0) {
      setErrorTitle("Title is required");
      setErrorDescription("Description is missing");
    } else if (title.length === 0) {
      setErrorTitle("Title is required");
      setErrorDescription("");
    } else if (description.length === 0) {
      setErrorTitle("");
      setErrorDescription("Description is missing");
    }
  };

  return (
    <>
      <Box sx={{ width: "90%", mt:"15px", ml: "30px", mb: "50px" }}>
        <Box component="form" noValidate autoComplete="off" sx={{ mb: "30px" }}>
          <FormControl
            sx={{
              width: extractedInput ? 3 / 5 : 1 / 5,
              transition: extractedInput ? "ease-in 0.8s" : "ease-out 0.8s",
              borderRadius: "16px",
              backgroundColor: "#e0e0e0",
              opacity: 0.94,
              border: "none",
              "& fieldset": { border: "none" },
            }}
          >
            <OutlinedInput
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              sx={{ color: "black" }}
              onClick={handleExtractInput}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              width: "10%",
              ml: "70px",
              mt: "10px",
              borderRadius: "16px",
              backgroundColor: "#ffa500",
              ":hover": { backgroundColor: "#ffa500" },
              display: extractedInput ? "" : "none",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {errorTitle && console.log(errorTitle)}
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ backgroundColor: "#e0e0e0", borderRadius: "16px"}}
        >
          <FormControl
            sx={{
              width: 1,
              border: "none",
              opacity: 0.94,
              "& fieldset": { border: "none" },
              borderRadius: "16px",
              display: extractedInput ? "block" : "none",
              transition: extractedInput ? "ease-in 0.8s" : "ease-out 0.8s",
            }}
          >
            <OutlinedInput
              placeholder="Description"
              multiline
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={5}
              sx={{ width: 1 }}
            />
          </FormControl>
        </Box>
        {errorDescription && console.log(errorDescription)}
      </Box>
    </>
  );
}