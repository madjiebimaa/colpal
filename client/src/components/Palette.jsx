import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";

export default function Palette({ hex, handleClick, icon }) {
  return (
    <Grid item>
      <Card>
        <CardHeader
          sx={{
            backgroundColor: hex,
            height: "40px",
          }}
        />
        <Divider />
        <ButtonGroup variant="text">
          <Button size="small" disabled>
            {hex}
          </Button>
          <Button size="small" onClick={() => handleClick(hex)}>
            {icon}
          </Button>
        </ButtonGroup>
      </Card>
    </Grid>
  );
}
