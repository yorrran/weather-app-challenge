import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "@/styles/listitem.less";
import deletedark from "@/assets/delete-dark.svg";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom"

function ListItem({ historyItem, handleDelete }: any) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const onSearch = () => {
    console.log("search");
    navigate({
      pathname: "/home",
      search: createSearchParams({
        location: historyItem.location
      }).toString()
    });
  };

  const onClick = () => {
    setOpen(true)
  };

  const hideModal = () => {
    setOpen(false);
  };
  const onOk = () => {
    setOpen(false);
    handleDelete(historyItem);
  };
  return (
    <>
      <div className="list-item-wrapper">
        <div className="list-item-left">
          <span className="list-item-location">{historyItem.location}</span>
        </div>
        <div className="list-item-right">
          <Button
            className="list-btn-search"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={onSearch}
          />
          <Button
            shape="circle"
            icon={<img src={deletedark} className="list-item-icon" />}
            onClick={onClick}
          />
        </div>
      </div>
      <Modal
        title="Confirm"
        open={open}
        onOk={onOk}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <div>Confirm to delete?</div>
      </Modal>
    </>
  );
}

export default ListItem;
