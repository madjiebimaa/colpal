import AddCircleIcon from "@mui/icons-material/AddCircle";
import ColorizeIcon from "@mui/icons-material/Colorize";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ImageSlider from "../components/ImageSlider";
import Palette from "../components/Palette";

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [imageIdx, setImageIdx] = useState(0);
  const [palettes, setPalettes] = useState([]);
  const [hexRecommendations, setHexRecommendations] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8080/api/images?q=" + query,
      });
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageIdxClick = (e) => {
    const sign = e.target.innerText;
    if (sign === "NEXT") {
      if (imageIdx === images.length - 1) {
        setImageIdx(0);
      } else {
        setImageIdx(imageIdx + 1);
      }
    } else if (sign === "PREV") {
      if (imageIdx === 0) {
        setImageIdx(images.length - 1);
      } else {
        setImageIdx(imageIdx - 1);
      }
    }
  };

  const handleGetPaletteClick = async (imageURL) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/api/palettes",
        data: {
          url: imageURL,
        },
      });
      setPalettes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecommendationPaletteClick = async (hex) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/api/palettes/recommendations",
        data: {
          hex: hex,
        },
      });
      setHexRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ mt: 3 }}>
        colpal
      </Typography>
      <Divider />

      <Grid container justifyContent="center">
        <Grid item>
          <Stack direction="row" spacing={2} sx={{ m: 2 }}>
            <TextField
              type="search"
              label="search image"
              onChange={(e) => handleSearchChange(e)}
            />
            <Button
              type="submit"
              size="small"
              onClick={() => handleSearchClick()}
            >
              find
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" sx={{ mt: 1 }}>
        {images.map((image, idx) => {
          return idx === imageIdx ? (
            <ImageSlider
              key={image.id}
              image={image}
              handleGetPaletteClick={handleGetPaletteClick}
              handleImageIdxClick={handleImageIdxClick}
            />
          ) : null;
        })}
      </Grid>

      {palettes.length !== 0 ? (
        <>
          <Typography variant="h5" component="h3" align="center" sx={{ mt: 3 }}>
            domain colors
          </Typography>
          <Divider />
        </>
      ) : null}
      <Grid container justifyContent="center" spacing={1} sx={{ mt: 1 }}>
        {palettes.map((palette) => {
          return (
            <Palette
              key={palette.main.hex}
              hex={palette.main.hex}
              handleClick={handleRecommendationPaletteClick}
              icon={<ColorizeIcon />}
            />
          );
        })}
      </Grid>

      {hexRecommendations.length !== 0 ? (
        <>
          <Typography variant="h5" component="h3" align="center" sx={{ mt: 3 }}>
            recommendation colors
          </Typography>
          <Divider />
        </>
      ) : null}
      <Grid
        container
        justifyContent="center"
        spacing={1}
        sx={{ mt: 1, mb: 10 }}
      >
        {hexRecommendations.map((hexRecommendation) => {
          return (
            <Palette
              key={hexRecommendation.hex}
              hex={hexRecommendation.hex}
              handleClick={() => console.log("NOT IMPLEMENTED")}
              icon={<AddCircleIcon />}
            />
          );
        })}
      </Grid>
    </>
  );
}
