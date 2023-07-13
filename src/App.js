import { useState, useEffect } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xffc4b25557bb4327d437c3b3ead6b2b15fab391a";

function App() {
  const [totalSupply, setTotalSupply] = useState("");

  const fetchURL =
    "https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=" +
    CONTRACT_ADDRESS +
    "&apikey=" +
    process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (totalSupply == "") {
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          const _supply = ethers.formatUnits(data["result"], "ether");
          setTotalSupply(_supply);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <div>
      <p>{totalSupply}</p>
    </div>
  );
}

export default App;
