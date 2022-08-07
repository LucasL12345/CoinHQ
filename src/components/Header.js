import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import "../App.css"

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "rgb(0, 82, 255)",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "Josefin Sans"
  },
}));

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();

  const history = useHistory();

  return (
    <div className="Navbar">
      <AppBar color="transparent" position="static" elevation={0}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h5"
              className={classes.title}
            >
              CoinHQ
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
              
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
