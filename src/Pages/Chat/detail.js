import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Search from "../../Component/Table/search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Loader from "../../App/layout/Skeleton";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  getChatData,
  getChatDetailsData,
  getChatRoomDetails,
  getExportChatData,
} from "../../actions/chatActions";
import { getOrderData } from "../../actions/orderActions";
import { getUserProfile } from "../../actions/customerActions";
import { loadDataResponse, loadRequestData } from "../../actions/baseActions";
import { getPostData } from "../../actions/postActions";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import ViewPost from "../PostItem/view";
import View from "../Order/view";
import ViewDetails from "../Customer/UserInfo";
import OfferMessage from "./offerMessage";
import OfferAccept from "./offerAccept";
import CardMessage from "./cardMessage";

const Index = (props) => {
  const dispatch = useDispatch();
  let { room } = useParams();
  const history = useHistory();
  const [itemShow, setItemShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const { title } = props;
  const { preLoader, chatUser, language, chat, chatRoom } = useSelector(
    (state) => ({
      preLoader: state.preLoader,
      language: state.language,
      chatUser: state.chatUser,
      chat: state.chat,
      chatRoom: state.chatRoom,
    })
  );

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
      dispatch(getChatData());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getChatDetailsData(room));
    };
    fetchData();
  }, [dispatch, room]);

  const checkItemDetails = (item) => {
    console.log(item);
    dispatch(getPostData({ _id: item.post_id }, setItemViewData));
  };

  const setItemViewData = (item) => {
    dispatch(loadDataResponse(item));
    setItemShow(true);
  };

  const handleItemModalClick = () => {
    setItemShow(false);
  };

  const checkUserDetails = (item, type) => {
    if (type === "BUYER") {
      dispatch(getUserProfile({ id: item.user_id }, setViewData));
    }
    if (type === "SELLER") {
      dispatch(getUserProfile({ id: item.seller_id }, setViewData));
    }
  };

  const setViewData = (item) => {
    dispatch(loadRequestData(item));
    setModalShow(true);
  };

  const handleModalClick = () => {
    setModalShow(false);
  };

  const handleViewClick = (item) => {
    dispatch(getOrderData(item.item.orderId, setEditData));
  };

  const setEditData = (item) => {
    dispatch(loadRequestData(item));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemViewClick = (item) => {
    dispatch(getPostData({ _id: item.post_id }, setItemViewData));
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = chatUser.filter((data) => data.item.title?.match(value));
    setSearchData(result);
  };

  useEffect(() => {
    setSearchData(chatUser);
  }, [chatUser]);

  const exportChat = () => {
    dispatch(getExportChatData(chatRoom.room, downloadFile));
  };

  const downloadFile = (fileUrl) => {
    var filename = fileUrl.split("/").pop();
    fetch(fileUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {preLoader ? (
        <Fragment>
          <div className="pt-3 dashboard-search-cs">
            <Search
              Breadcrumb={breadcrumbs}
              onChange={(event) => handleSearch(event)}
            />

            <Col>
              <div className="chating-main">
                <div className="chating-left">
                  <div className="chat_list_search">
                    <input type="text" placeholder="Search" />
                    <button type="btn">
                      <SearchOutlinedIcon />
                    </button>
                  </div>

                  {searchData.map((item) => (
                    <div
                      className={
                        room === item.room
                          ? "product_list active"
                          : "product_list"
                      }
                      onClick={() => chatDetail(item)}
                    >
                      <figure>
                        <img src={item.item.image} alt={item.item.title} />
                      </figure>
                      <figcaption>
                        <strong>
                          {item.item.title} <span>{item.time}</span>
                        </strong>
                        <span>{item.message}</span>
                      </figcaption>
                    </div>
                  ))}
                </div>

                <div className="chat-right">
                  <div className="message_header">
                    <div className="header_left">
                      <figure
                        className="cursor-pointer "
                        onClick={() => checkItemDetails(chatRoom)}
                      >
                        <img
                          src={chatRoom.item.image}
                          alt={chatRoom.item.title}
                        />
                      </figure>
                      <strong
                        className="cursor-pointer "
                        onClick={() => checkItemDetails(chatRoom)}
                      >
                        {chatRoom.item.title}
                      </strong>
                    </div>
                    <div className="header_right">
                      <span className="cursor-pointer" onClick={exportChat}>
                        <DescriptionIcon />
                      </span>
                    </div>
                  </div>
                  <ul>
                    <ScrollToBottom>
                      {chat.map((item, i) => (
                        <div key={i}>
                          {!item.isCard &&
                            item.receiver === chatRoom.buyer._id && (
                              <li
                                className="message_outer recive_message"
                                key={i}
                              >
                                <div className="message_child">
                                  <span
                                    className="name_circle cursor-pointer "
                                    onClick={() =>
                                      checkUserDetails(chatRoom, "BUYER")
                                    }
                                  >
                                    {chatRoom.buyer.first_name
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                  <div className="message_summary">
                                    <p>{item.message}</p>
                                    <span className="date-fix">
                                      {item.date} {item.time}
                                    </span>
                                  </div>
                                </div>
                              </li>
                            )}
                          {!item.isCard &&
                            item.receiver === chatRoom.seller._id && (
                              <li
                                className="message_outer send_message"
                                key={i}
                              >
                                <div className="message_child">
                                  <span
                                    className="name_circle cursor-pointer "
                                    onClick={() =>
                                      checkUserDetails(chatRoom, "SELLER")
                                    }
                                  >
                                    {chatRoom.seller.first_name
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                  <div className="message_summary">
                                    <p>{item.message}</p>
                                    <span className="date-fix">
                                      {item.date} {item.time}
                                    </span>
                                  </div>
                                </div>
                              </li>
                            )}
                          {item.isCard &&
                            item.receiver === chatRoom.buyer._id &&
                            (item.buyer_status === "RECEIVED_OFFER" ||
                              item.seller_status === "SEND_OFFER") && (
                              <li
                                id={item._id}
                                key={item._id}
                                className="message_outer"
                              >
                                <div className="offer_card_row">
                                  <OfferMessage
                                    item={item}
                                    roomDetails={chatRoom}
                                    checkUserDetails={checkUserDetails}
                                  />
                                </div>
                              </li>
                            )}
                          {item.isCard &&
                            item.type === "BOTH" &&
                            (item.buyer_status === "SEND_OFFER" ||
                              item.seller_status === "RECEIVED_OFFER") && (
                              <li
                                id={item._id}
                                key={item._id}
                                className="message_outer"
                              >
                                <div className="offer_card_row">
                                  <OfferMessage
                                    item={item}
                                    roomDetails={chatRoom}
                                    checkUserDetails={checkUserDetails}
                                  />
                                </div>
                              </li>
                            )}
                          {item.isCard &&
                            item.type === "BOTH" &&
                            item.buyer_status === "ACCEPTED" &&
                            item.seller_status === "ACCEPTED" && (
                              <li
                                id={item._id}
                                key={item._id}
                                className="message_outer"
                              >
                                <div className="offer_card_row">
                                  <OfferAccept
                                    item={item}
                                    roomDetails={chatRoom}
                                    checkUserDetails={checkUserDetails}
                                  />
                                </div>
                              </li>
                            )}
                          {item.buyer_status === "TRACK_ORDER" &&
                            item.seller_status === "TRACK_ORDER" && (
                              <li className="accepted-chat-cs">
                                <CardMessage
                                  item={item}
                                  handleViewClick={handleViewClick}
                                />
                              </li>
                            )}
                        </div>
                      ))}
                    </ScrollToBottom>
                  </ul>
                </div>
              </div>
            </Col>
          </div>
        </Fragment>
      ) : (
        <Loader />
      )}
      {itemShow && (
        <ViewPost open={itemShow} handleClose={handleItemModalClick} />
      )}
      {modalShow && <ViewDetails open={modalShow} onHide={handleModalClick} />}
      {open && (
        <View
          open={open}
          handleClose={handleClose}
          handleItemViewClick={handleItemViewClick}
        />
      )}
    </Fragment>
  );
};

export default Index;
