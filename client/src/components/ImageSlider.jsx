import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PaletteIcon from "@mui/icons-material/Palette";
import { Button, Card, CardActions, CardMedia, Grid } from "@mui/material";

export default function ImageSlider({
  image,
  handleGetPaletteClick,
  handleImageIdxClick,
}) {
  return (
    <div>
      <Grid item>
        <Card>
          <CardMedia
            component="img"
            alt="search result"
            height="240"
            image={image.urls.small}
            loading="lazy"
          />
          <CardActions>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  size="small"
                  onClick={() => handleGetPaletteClick(image.urls.small)}
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
  );
}
