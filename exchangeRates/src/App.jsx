import { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Alert, Link } from "@mui/material";


function App() {
  const [moneda, setMoneda] = useState(0);
  const [moneda1, setMoneda1] = useState(0);
  const [tasa, setTasa] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function traerTasa() {
      try {
        setCargando(true);
        setError(null);


        const res = await fetch("https://open.er-api.com/v6/latest/USD");

        if (!res.ok) {
          throw new Error("Error al conectar con la API");
        }
        const data = await res.json();
        setTasa(data.rates.HNL);
        setCargando(false);
      }
      catch (err) {
        setError(err.message);
        setCargando(false);

      }
    }
    traerTasa();

  }, []);

  return (

    <Container>
      <Typography variant="h2">Cambio de moneda</Typography>
      <Typography variant="body1">Ingrese la cantidad la cantidad en dólares con 2 decimales y presione el buton para ver en cambio en lempiras.</Typography>

      {cargando && <Alert severity="info">Cargando tasa de cambio...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Dolares"
        value={moneda}
        onChange={(e) => setMoneda(Number(e.target.value))}
      />
      <Button
        variant="contained"
        onClick={() => {
          const resultado = moneda * tasa;
          setMoneda1(resultado.toFixed(2));
        }}
        disabled={!tasa || cargando}
      >
        Calcular
      </Button>
      <Typography>Tasa actual:1 USD ={tasa} HNL</Typography>
      <Typography>Cambio en Lempiras: {moneda1}</Typography>
      <Typography variant="caption" sx={{ marginTop: 3, display: "block" }}>
        Rates By{" "}
        <Link href="https://exchangerate-api.com" target="_blank" rel="noopener noreferrer">
          Exchange Rate API
        </Link>
      </Typography>
    </Container>
  );
}

export default App
