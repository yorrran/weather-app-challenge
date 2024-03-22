import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import "@/styles/listitem.less"
import deletedark from '@/assets/delete-dark.svg'

function ListItem({ historyItem }: any) {
  const dispatch = useDispatch();

  const onSearch = () => {
    console.log("search");
  };
  return (
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
          icon={
            <img
              src={deletedark}
              className="list-item-icon"
            />
          }
        />
      </div>
    </div>
  );
}

export default ListItem;
