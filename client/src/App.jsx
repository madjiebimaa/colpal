import ColorizeIcon from "@mui/icons-material/Colorize";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PaletteIcon from "@mui/icons-material/Palette";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

function App() {
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
        url: "http://localhost:8080/api/palettes/recommendation",
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
    <Container>
      <Typography variant="h4" component="h1" align="center" sx={{ mt: 3 }}>
        colpal
      </Typography>
      <Divider />
      <Grid container justifyContent="center">
        <Grid item>
          <Stack direction="row" spacing={2} sx={{ m: 2 }}>
            <TextField
              label="search image"
              onChange={(e) => handleSearchChange(e)}
            />
            <Button size="small" onClick={() => handleSearchClick()}>
              find
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 1 }}>
        {images.map((image, idx) => {
          return idx === imageIdx ? (
            <div key={image.id}>
              <Grid item>
                <Card>
                  <CardMedia
                    component="img"
                    alt="search result"
                    height="240"
                    image={image.urls.small}
                  />
                  <CardActions>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Button
                          size="small"
                          onClick={() =>
                            handleGetPaletteClick(image.urls.small)
                          }
                        >
                          <PaletteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Button
                    size="small"
                    startIcon={<NavigateBeforeIcon />}
                    onClick={(e) => handleImageIdxClick(e)}
                  >
                    prev
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    endIcon={<NavigateNextIcon />}
                    onClick={(e) => handleImageIdxClick(e)}
                  >
                    next
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : null;
        })}
      </Grid>
      <Typography variant="h5" component="h3" align="center" sx={{ mt: 3 }}>
        domain colors
      </Typography>
      <Divider />
      <Grid container justifyContent="center" spacing={1} sx={{ mt: 1 }}>
        {palettes.map((palette) => {
          return (
            <Grid item key={palette.main.hex}>
              <Card>
                <CardHeader
                  sx={{
                    backgroundColor: palette.main.hex,
                    height: "40px",
                  }}
                />
                <Divider />
                <ButtonGroup variant="text">
                  <Button size="small" disabled>
                    {palette.main.hex}
                  </Button>
                  <Button
                    size="small"
                    onClick={() =>
                      handleRecommendationPaletteClick(palette.main.hex)
                    }
                  >
                    <ColorizeIcon />
                  </Button>
                </ButtonGroup>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h5" component="h3" align="center" sx={{ mt: 3 }}>
        recommendation colors
      </Typography>
      <Divider />
      <Grid container justifyContent="center" spacing={1} sx={{ mt: 1 }}>
        {hexRecommendations.map((hexRecommendation) => {
          return (
            <Grid item key={hexRecommendation.hex}>
              <Card>
                <CardHeader
                  sx={{
                    backgroundColor: hexRecommendation.hex,
                    height: "40px",
                  }}
                />
                <Divider />
                <ButtonGroup variant="text">
                  <Button size="small" disabled>
                    {hexRecommendation.hex}
                  </Button>
                  <Button
                    size="small"
                    onClick={() => console.log(hexRecommendation.hex)}
                  >
                    <AddCircleOutlineIcon />
                  </Button>
                </ButtonGroup>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
