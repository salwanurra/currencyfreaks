import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const Home = () => {
    const [data, setDatas] = useState(null);
    const header = [
        "Currency", "We Buy", "Exchange Rate", "We Sell"
    ]

    const getData = async () => {
        return axios.get("https://api.currencyfreaks.com/latest?apikey=4c57df131ca04e3b913c78a1aa33ad0f&symbols=CAD,EUR,IDR,JPY,CHF,GBP");
    };

    useEffect(() => {
        getData().then(res => setDatas(res.data.rates));
    }, []);

    return (
      <div>
        {
          data ?
            <div className="center">
              <table>
               <thead>
                  <tr>
                    { header.map((header, index) => {
                      return <th key={index}>{header}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  { Object.keys(data).map((item, index) => (
                      <tr key={index}>
                        <td>{item}</td>
                        <td>{(1.05 * data[item]).toFixed(4)}</td>
                        <td>{(1.0 * data[item]).toFixed(4)}</td>
                        <td>{(0.95 * data[item]).toFixed(4)}</td>
                      </tr>
                  ))}
                </tbody>
              </table>

            </div>
            :
            <p>Loading</p>
          }
          <div style={{textAlign:"center"}}>
            <p>Rates are based from 1 USD</p>
            <p>This application uses API from https://currencyfreaks.com.</p>     
          </div>
      </div>
    );
}

export default Home;
