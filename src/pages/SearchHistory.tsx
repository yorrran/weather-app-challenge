import { getGeoLocation } from "@/api/weather";
import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { IArrayLocation } from "@/interfaces/weather";
import "@/styles/searchhistory.less";
import ListItem from "@/components/ListItem";
import { nanoid } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "@/utils/Encrypt";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

function SearchHistory() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState<
    Array<{ id: string; location: string }>
  >([]);
  const retrievedData = localStorage.getItem("weathersearch");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const decryptedData = retrievedData ? decryptData(retrievedData) : null;
    if (decryptedData) {
      const jsonData = JSON.parse(decryptedData);
      setHistoryItems(jsonData);
    }
  }, [retrievedData]);

  const onSearch = async () => {
    setLoading(true);
    try {
      const res = await getGeoLocation(inputValue.trim());
      const localData: IArrayLocation = res.data;
      if (localData.length <= 0) {
        setError("Invalid country or city");
        throw Error("Invalid country or city");
      }
      saveToBrowser(inputValue.trim());
      navigate({
        pathname: "/home",
        search: createSearchParams({
          location: inputValue.trim()
        }).toString()
      });
    } catch (e: any) {
      console.log("e:", e);
      if (e.isAxiosError) {
        messageApi.open({
          type: "error",
          content: e.toString()
        });
      }
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
    const entryptedData = encryptData(JSON.stringify(filteredData));
    localStorage.setItem("weathersearch", entryptedData);
  };

  const onDelete = (deleteData: { id: string; location: string }) => {
    const filteredData =
      historyItems.length > 0
        ? historyItems.filter(
            (item) =>
              item.location.toLowerCase() !== deleteData.location.toLowerCase()
          )
        : [];
    setHistoryItems(filteredData);
    const entryptedData = encryptData(JSON.stringify(filteredData));
    localStorage.setItem("weathersearch", entryptedData);
  };

  return (
    <>
      {contextHolder}
      <div className="search-history-container">
        <div className="search-history-bar">
          <div className="search-input-wrapper">
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              size="large"
              placeholder="Search country or city here"
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <Button type="primary" onClick={onSearch} loading={loading}>
            Search
          </Button>
        </div>
        <div className="search-history-list">
          <div className="search-history-title">Search History</div>
          <div className="search-list-wrapper">
            {historyItems && historyItems.length ? (
              historyItems.map((historyItem: any) => (
                <ListItem
                  key={historyItem.id}
                  historyItem={historyItem}
                  handleDelete={onDelete}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchHistory;
