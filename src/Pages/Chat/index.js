import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Search from "../../Component/Table/search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Loader from "../../App/layout/Skeleton";
import { getChatUserData, getChatRoomDetails } from "../../actions/chatActions";
import ForumIcon from "@material-ui/icons/Forum";

const Index = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchData, setSearchData] = useState([]);
  const { title } = props;
  const { preLoader, chatUser, language } = useSelector((state) => ({
    preLoader: state.preLoader,
    language: state.language,
    chatUser: state.chatUser,
  }));

  const breadcrumbs = [
    {
      title: title,
      class: "activeBreadcrumbs",
    },
  ];

  const chatDetail = (item) => {
    dispatch(getChatRoomDetails(item));
    history.push(`/${language}/chat/${item.room}`);
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(getChatUserData());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setSearchData(chatUser);
  }, [chatUser]);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = chatUser.filter((data) => data.item.title?.match(value));
    setSearchData(result);
  };

  return (
    <Fragment>
      {preLoader ? (
        <Fragment>
          <div className="pt-3 dashboard-search-cs">
            <Search Breadcrumb={breadcrumbs} />
            <Col>
              <div className="chating-main">
                <div className="chating-left">
                  <div className="chat_list_search">
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={(event) => handleSearch(event)}
                    />
                    <button type="btn">
                      <SearchOutlinedIcon />
                    </button>
                  </div>

                  {searchData.map((item) => (
                    <div
                      className="product_list"
                      onClick={() => chatDetail(item)}
                    >
                      <figure>
                        <img src={item.item.image} alt={item.item.title} />
                      </figure>
                      <figcaption>
                        <strong>{item.item.title}</strong>
                        <span>{item.message}</span>
                        <span>{item.time}</span>
                      </figcaption>
                    </div>
                  ))}
                </div>

                <div className="chat-right blank-chat-screen">
                  <ForumIcon />
                </div>
              </div>
            </Col>
          </div>
        </Fragment>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Index;
