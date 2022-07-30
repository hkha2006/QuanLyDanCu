import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./../../utils/request";
import MenuLeft from "../MenuLeft";
import { connect } from "react-redux";
import { compose } from "recompose";
import { createStructuredSelector } from "reselect";
import { selectInfoUser } from "../../Pages/Login/stores/selector";
const DefaultLayout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (!token || token === "") {
      navigate("/login");
    }
  }, []);
  return <MenuLeft />;
};
const mapStateToProps = createStructuredSelector({
  infoUser: selectInfoUser,
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(DefaultLayout);