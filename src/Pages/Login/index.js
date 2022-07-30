import { Button, Form, Input, Select } from 'antd';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loginRequestAction } from "./stores/actions";
import { selectLoading } from "./stores/selector";
import { useNavigate } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next"
import "../../i18n"
import "./index.css"
const { Option } = Select

const LoginComponent = (props) => {
  const { i18n } = useTranslation();
  const { t } = props;
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const payload = {
      values,
      navigate,
    };
    props.loginRequest(payload);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  };

  const handleChange = (value) => {
    changeLanguage(value)
  };

  return (
    <div class="container login">
      <Select className="selectTrans"
        defaultValue="vi"
        onChange={handleChange}>
        <Option value="en">English</Option>
        <Option value="vi">Tiếng Việt</Option>
      </Select>
      <div class="body d-md-flex align-items-center justify-content-between">
        <div class="box-1 mt-md-0 mt-5">
          <img src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            class="" alt="" />
        </div>
        <div class=" box-2 d-flex flex-column h-100">

          <div class="mt-5">
            <p class="mb-1 h-1">{t("Login")}</p>
            <p class="text-muted mb-2"><i>Imagination is more important than knowledge</i> Albert Einstein</p>
            <div class="d-flex flex-column ">
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label={t("Username")}
                  name="username"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t("Password")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                  {t("Login")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div class="mt-auto">
            <p class="footer text-muted mb-0 mt-md-0 mt-4">By register you agree with our
              <span class="p-color me-1">terms and conditions</span>and
              <span class="p-color ms-1">privacy policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => dispatch(loginRequestAction(payload)),
});

const Login = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
);

export default Login;