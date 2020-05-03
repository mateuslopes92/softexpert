import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";
import axios from "axios";

import { Container } from "./styles";

export default function Detail({ location }) {
  const [incomes, setIncomes] = useState([]);
  const stock = location.state.company.symbol;

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  async function getIncome() {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/financials/income-statement/${stock}`
    );
    if (response.data) {
      const dataFormated = response.data.financials.map((d) => {
        const n = d.Revenue ? d.Revenue.toLocaleString("en-IN") : 0;
        return {
          ...d,
          ano: d.date.substr(0, 4),
          receita: n,
        };
      });
      if (dataFormated) {
        setIncomes(dataFormated.reverse());
      } else {
        setIncomes([]);
      }
      console.log(dataFormated);
    }
  }

  useEffect(() => {
    getIncome();
  }, []);

  return (
    <Container>
      <ComposedChart
        width={1118}
        height={397}
        data={incomes}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="ano" />
        <YAxis yAxisId="left" orientation="left" stroke="#47525e" />
        <YAxis yAxisId="right" orientation="right" stroke="#47525e" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="receita" barSize={30} fill="#7CB5EC" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="Revenue Growth"
          stroke="#505C6C"
        />
        {/* <Scatter dataKey="cnt" fill="red" /> */}
      </ComposedChart>
    </Container>
  );
}
