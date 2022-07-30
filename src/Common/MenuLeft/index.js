import { Link } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    CoffeeOutlined,
    AuditOutlined,
    FileSearchOutlined,
    BlockOutlined,
    FileDoneOutlined,
    IdcardOutlined,
    SettingOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Select } from 'antd';
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './index.css'
import routes from '../../routers'
import { withTranslation, useTranslation } from "react-i18next";
import { connect } from "react-redux";
const { Header, Sider, Content } = Layout;
const { Option } = Select

const MenuLeftComponent = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { i18n } = useTranslation();
    const { t } = props;

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const handleChange = (value) => {
        changeLanguage(value)
    };
    const showContentMenu = (routes) => {
        let result = null;
        if (routes) {
            result = routes.map((item, index) => {
                return (
                    <Route key={index} path={item.path} element={item.component()} />
                );
            });
        }
        return result;
    };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible collapsed={collapsed}
                width={250}
            >
                <div className="logo" >
                    <a href='/' className='row'>
                        <img className='d-inline-block align-top col-4' src='https://img.upanh.tv/2022/06/12/logo.png' alt='logo' width={35} height={35} />
                        <h5 className='col-8'>Estella Heights</h5>
                    </a>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="1">
                        <DashboardOutlined />
                        <span className="nav-text">{t("Dasboard")}</span>
                        <Link to='administrator/dashboard' />
                    </Menu.Item>

                    <Menu.Item key="2">
                        <UserOutlined />
                        <span className="nav-text">{t("UserManagement")}</span>
                        <Link to='administrator/users' />
                    </Menu.Item>

                    <Menu.Item key="3">
                        <CoffeeOutlined />
                        <span className="nav-text">{t("News")}</span>
                        <Link to='administrator/news' />
                    </Menu.Item>

                    <Menu.Item key="4">
                        <AuditOutlined />
                        <span className="nav-text">{t("Feedbacks")}</span>
                        <Link to='administrator/feedback' />
                    </Menu.Item>

                    <Menu.Item key="5">
                        <FileSearchOutlined />
                        <span className="nav-text">{t("FormOnline")}</span>
                        <Link to='administrator/form' />
                    </Menu.Item>

                    <Menu.SubMenu
                        title={t("ServiceManagement")}
                        icon={<BlockOutlined />}
                        key="9"
                    >
                        <Menu.Item key="6">
                            <FileDoneOutlined />
                            <span className="nav-text">{t("ListBookingService")}</span>
                            <Link to='administrator/form' />
                        </Menu.Item>

                        <Menu.Item key="7">
                            <IdcardOutlined />
                            <span className="nav-text">{t("SystemService")}</span>
                            <Link to='administrator/form' />
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.Item key="8">
                        <SettingOutlined />
                        <span className="nav-text">{t("Configuration")}</span>
                        <Link to='administrator/setting' />
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Link to="/logout" className="logout">
                        <LogoutOutlined style={{ fontSize: 20 }} />
                    </Link>
                    <Select className="selectTrans"
                        defaultValue="vi"
                        onChange={handleChange}
                    >
                        <Option value="en">English</Option>
                        <Option value="vi">Tiếng Việt</Option>
                    </Select>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        minHeight: 0,
                        padding: 20,
                    }}
                >
                    <Routes>{showContentMenu(routes)}</Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

const MenuLeft = withTranslation()(
    connect()(MenuLeftComponent)
);

export default MenuLeft