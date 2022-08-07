import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom:50,
    },
    header_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom:30,
      marginTop:45
    },
    heading: {
      fontWeight: "bold",
      fontFamily: "Josefin Sans",
    }
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress/>;

  return (
    <div className={classes.container}>
      <div className={classes.header_container}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="50"
        />
        &nbsp; &nbsp;
        <Typography variant="h4" className={classes.heading}>
          {coin?.name}
        </Typography>
        </div>
        <div className={classes.marketData}>
          <span style={{ display: "flex"}}>
          <Typography variant="h6" style={{color:"grey"}}>
            Price
          </Typography>
            &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Josefin Sans",
              marginBottom:60,
            }}
          >
            {symbol}{" "}
            {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
          </span>
        </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
