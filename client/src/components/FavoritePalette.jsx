import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Palette from "../components/Palette";

export default function FavoriteHexs({ hexs }) {
  const [favoriteHexs, setFavoriteHexs] = useState({
    title: "",
    description: "",
  });

  const handleFieldInputChange = ({ target: { name, value } }) => {
    setFavoriteHexs({ ...favoriteHexs, [name]: value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{ mt: 1, mb: 10 }}
    >
      {hexs.map((hex) => {
        return <Palette key={hex + "-favorite"} hex={hex} />;
      })}
      <Grid
        item
        container
        direction="column"
        xs={12}
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Grid item>
          <TextField
            type="text"
            name="title"
            label="title"
            required
            value={favoriteHexs.title}
            onChange={(e) => handleFieldInputChange(e)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            name="description"
            label="description"
            multiline
            value={favoriteHexs.description}
            onChange={(e) => handleFieldInputChange(e)}
          />
        </Grid>
        <Grid item>
          <Button type="submit" size="small" endIcon={<FavoriteBorderIcon />}>
            add to
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
