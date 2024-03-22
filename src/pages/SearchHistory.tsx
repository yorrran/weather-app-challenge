import { getGeoLocation } from "@/api/weather";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { IArrayLocation } from "@/interfaces/weather";
import "@/styles/searchhistory.less";
import ListItem from "@/Components/ListItem";
import { nanoid } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "@/utils/Encrypt";

function SearchHistory() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState<
    Array<{ id: string; location: string }>
  >([]);
  const retrievedData = localStorage.getItem("weathersearch");

  useEffect(() => {
    const decryptedData = retrievedData ? decryptData(retrievedData) : null;
    console.log("decryptedData:", decryptedData);
    if (decryptedData) {
      const jsonData = JSON.parse(decryptedData);
      setHistoryItems(jsonData);
    }
  }, [retrievedData]);

  const onSearch = async () => {
    setLoading(true);
    try {
      const res = await getGeoLocation(inputValue);
      const localData: IArrayLocation = res.data;
      if (localData.length <= 0) {
        throw Error("location input not correct");
      }
      saveToBrowser(inputValue);
    } catch (e) {
      console.log("e:", e);
    } finally {
      setLoading(false);
    }
  };

  const saveToBrowser = (inputValue: string) => {
    const filteredData =
      historyItems.length > 0
        ? historyItems.filter(
            (item) => item.location.toLowerCase() !== inputValue.toLowerCase()
          )
        : [];
    filteredData.push({
      id: nanoid(),
      location: inputValue
    });
    console.log("filteredData:", filteredData);
    const entryptedData = encryptData(JSON.stringify(filteredData));
    localStorage.setItem("weathersearch", entryptedData);
  };

  return (
    <div className="search-history-container">
      <div className="search-history-bar">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="large"
          placeholder="Search country or city here"
        />
        <Button type="primary" onClick={onSearch} loading={loading}>
          Search
        </Button>
      </div>
      <div className="search-history-list">
        <div className="search-history-title">Search History</div>
        <div className="search-list-wrapper">
          {historyItems && historyItems.length ? (
            historyItems.map((historyItem: any) => (
              <ListItem key={historyItem.id} historyItem={historyItem} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchHistory;
