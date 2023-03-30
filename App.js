import { useState } from "react";
import Web3 from "web3";
import axios from "axios";

function App() {
  const [transactionId, setTransactionId] = useState(null);

  const handleClick = async () => {
    // Set the request payload and API key
    const payload = { id: "0" };
    const apiKey = "ksjYEcajgKUpKbTTPCE";

    // Generate the Content-MD5 header
    const timestamp = Date.now();
    const message = apiKey + JSON.stringify(payload) + timestamp;
    const contentMd5 = Web3.utils.sha3(message);

    // Set the request headers
    const headers = {
      time: timestamp,
      "Content-MD5": contentMd5,
    };

    // Call the API and get the response
    const response = await axios.post(
      "http://14.99.147.156:8888/flashx-backend/flashx/public/api/v1/block-chain/get-access-keys",
      payload,
      { headers }
    );

    // Save the transaction ID to state
    setTransactionId(response.data.transactionId);
  };

  return (
    <div>
      <button onClick={handleClick}>Save to Blockchain</button>
      {transactionId && <p>Transaction ID: {transactionId}</p>}
    </div>
  );
}

export default App;
