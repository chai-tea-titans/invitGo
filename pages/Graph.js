import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpendingAsync } from "./store/spendingSlice";
import LineChart from "./graph/LineChar";

function App() {
  const dispatch = useDispatch();
  const spending = useSelector(state => state.spending);

  useEffect(() => {
    dispatch(fetchSpendingAsync());
  }, [dispatch]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const januarySpending = spending.filter(data => data.month === "January");
  const januaryTotal = januarySpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const februarySpending = spending.filter(data => data.month === "February");
  const februaryTotal = februarySpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const marchSpending = spending.filter(data => data.month === "March");
  const marchTotal = marchSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const aprilSpending = spending.filter(data => data.month === "April");
  const aprilTotal = aprilSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const maySpending = spending.filter(data => data.month === "May");
  const mayTotal = maySpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const juneSpending = spending.filter(data => data.month === "June");
  const juneTotal = juneSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const julySpending = spending.filter(data => data.month === "July");
  const julyTotal = julySpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const augustSpending = spending.filter(data => data.month === "August");
  const augustTotal = augustSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const septemberSpending = spending.filter(data => data.month === "September");
  const septemberTotal = septemberSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const octoberSpending = spending.filter(data => data.month === "October");
  const octoberTotal = octoberSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const novemberSpending = spending.filter(data => data.month === "November");
  const novemberTotal = novemberSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const decemberSpending = spending.filter(data => data.month === "December");
  const decemberTotal = decemberSpending.reduce(
    (total, data) => total + data.spendingamount,
    0
  );

  const monthlyTotals = [
    { month: "January", total: januaryTotal },
    { month: "February", total: februaryTotal },
    { month: "March", total: marchTotal },
    { month: "April", total: aprilTotal },
    { month: "May", total: mayTotal },
    { month: "June", total: juneTotal },
    { month: "July", total: julyTotal },
    { month: "August", total: augustTotal },
    { month: "September", total: septemberTotal },
    { month: "October", total: octoberTotal },
    { month: "November", total: novemberTotal },
    { month: "December", total: decemberTotal },
  ];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Totals",
        data: monthlyTotals.map(total => total.total),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#FB3640",
          "#6E9CD2",
          "#FFE74C",
          "#FF5964",
          "#E55934",
          "#8ac6d1",
          "#F9DAD0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: 700 }}>
      <LineChart chartData={chartData} />
    </div>
  );
}

export default App;
