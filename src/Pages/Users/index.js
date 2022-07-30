import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { Tabs, Table, Space, Button, Modal, Form, Input, Select, Radio, notification, Breadcrumb } from 'antd';
import { DeleteOutlined, CheckCircleTwoTone, CloseCircleTwoTone, SmileOutlined, CloseCircleOutlined, MehOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { compose } from 'recompose';
import { getAllUser, asyncCreateUser, asyncGetDetailRoles, asyncGetDetailRoom, asyncDeleteUser } from "./stores/actions"
import { selectLoading, selectUser, selectRole, selectRoom } from "./stores/selector"
import "./index.css"


const Users = (props) => {
    const [params, setParams] = useState({
        search: "",
        paging: {
            pageIndex: 1,
            pageSize: 10
        },
        sorting: {
            field: "username",
            order: "asc"
        }
    })

    const [url, setUrl] = useState("all")

    const { TabPane } = Tabs;
    const { Search } = Input;
    const { isLoading, listUsers, listRole, listRoom } = props
    const { getAllUser, createUser, getRoles, getRooms, deleteUser } = props
    const [sortedInfo, setSortedInfo] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formModal] = Form.useForm();
    const [valueGender, setValueGender] = useState("Male");

    useEffect(() => {
        const payload = {
            url,
            params
        }
        getAllUser(payload)
        getRoles(params)
        getRooms(params)
    }, [])

    useEffect(() => {
        const payload = {
            url,
            params
        }
        getAllUser(payload)
    }, [params], [url])
    // console.log(listRole)
    // console.log(listRoom)

    // func thay đổi tab khi thay đổi tab
    const onChangeTab = (key) => {
        setUrl(key)
        const tabParams = { ...params, search: "" }
        setParams(tabParams)
    };

    const handleChangeTable = async (pagination,sorter) => {
        console.log(sorter)
        setSortedInfo(sorter);
        const {current,pageSize}=pagination
        const paging={pageIndex:current, pageSize}
        const paramsPage={...params,paging}
        setParams(paramsPage)
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        const respone = await createUser(values)
        if (respone.status === 200) {
            getAllUser(params)
            openNotification(
                'Thông báo nò',
                'Thêm thành công rồi nhé!!!',
                <SmileOutlined style={{ color: '#52c41a', }} />)
            setIsModalVisible(false);
        } else {
            handleOk()
            openNotification(
                'Thông báo nò',
                'Thêm thất bại rùiii!!!',
                <CloseCircleOutlined style={{ color: '#f5222d', }} />)
        }
    }

    const onFinishFailed = (values) => {
        console.log(values)
    }

    const handleChangeRadio = (e) => {
        setValueGender(e.target.value);
    };

    const handleCreateItem = () => {
        setIsModalVisible(true)
        formModal.resetFields()
    }

    const openNotification = (mess, des, ic) => {
        notification.open({
            message: mess,
            description:
                des,
            icon: ic
        });
    }

    const handleChangeSelect = (value) => {
        console.log(value)
    };

    const handleDelete = async (values) => {
        const respone = await deleteUser(values)
        if (respone.status === 200) {
            openNotification(
                'Thông báo nò',
                'Xóa thành công rồi nhé!!!',
                <SmileOutlined style={{ color: '#52c41a', }} />)
            getAllUser(params)
        } else {
            openNotification(
                'Thông báo nò',
                'Xóa thất bại rùiii!!!',
                <CloseCircleOutlined style={{ color: '#f5222d', }} />)
        }
    }

    const { confirm } = Modal
    const showDeleteConfirm = (values) => {
        confirm({
            title: `Xóa tài khoản này hử?`,
            icon: <MehOutlined style={{ color: "#d4b106" }} />,
            content: 'Chừi ưi nghĩ kỹ chưa dọ?!?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(values)
            },
            onCancel() {
            },
        });
    };

    const onSearch = async (value) => {
        const searchParams = { ...params, search: value }
        setParams(searchParams)
        console.log(params)
    }

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return (
                    <span>
                        {params.paging.pageIndex * params.paging.pageSize - 9 + index}
                    </span>
                )
            }
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.length - b.username.length,
            sortOrder: sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <span>{text ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#f5222d" />
                }</span>
            )
        },
        {
            title: 'Tên đầy đủ',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số nợ',
            dataIndex: 'debtAmount',
            key: 'debtAmount',
        },
        {
            title: 'Tác vụ',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <DeleteOutlined onClick={() => showDeleteConfirm(record.username)} style={{ color: "#1890ff" }} />
                </Space>
            )
        }
    ]

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to='/' />Administrator</Breadcrumb.Item>
                <Breadcrumb.Item><Link to='administrator/user' />User</Breadcrumb.Item>
            </Breadcrumb>

            <Search placeholder="input search text" onSearch={onSearch} enterButton className='searchBtn' />

            <Button onClick={handleCreateItem} className="createBtn">Create</Button>

            <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                <TabPane tab="All" key="All">
                </TabPane>

                <TabPane tab="Residence" key="Resident">
                    Content of Tab Pane 2
                </TabPane>

                <TabPane tab="Tenant" key="Tenant">
                    Content of Tab Pane 3
                </TabPane>

                <TabPane tab="Admin" key="Admin">
                    Content of Tab Pane 4
                </TabPane>

                <TabPane tab="Reception" key="Reception">
                    Content of Tab Pane 5
                </TabPane>

                <TabPane tab="Accountant" key="Accountant">
                    Content of Tab Pane 6
                </TabPane>

                <TabPane tab="Security" key="Security">
                    Content of Tab Pane 7
                </TabPane>

                <TabPane tab="Guset" key="Guest">
                    Content of Tab Pane 8
                </TabPane>
            </Tabs>

            <Table columns={columns} dataSource={listUsers} loading={isLoading} id="user-table"
                onChange={handleChangeTable}
                pageIndex={params.paging.pageIndex}
                pagination={{
                    current: params.paging.pageIndex,
                    total: 200,
                    pageSize: params.paging.pageSize,
                }}
            />

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={
                    <Space>
                        <Button type="primary" form='formModal' htmlType="submit">Submit</Button>
                        <Button type="danger" onClick={handleCancel}>Close</Button>
                    </Space>

                }
            >
                <Form
                    name="formModal"
                    labelCol={{
                        span: 6,
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
                    form={formModal}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="FullName"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your FullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {

                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                    >
                        <Input
                            addonBefore='+84'
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"

                        rules={[
                            {

                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                    >
                        <Radio.Group onChange={handleChangeRadio} value={valueGender} >
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Room"
                        name="roomId"
                    >
                        <Select>
                            onChange={handleChangeSelect}
                            {listRoom.map((item) => (
                                <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Roles"
                        name="roleID"
                    >
                        <Select>
                            onChange={handleChangeSelect}
                            {listRole.map((item) => (
                                <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                            ))}
                        </Select>

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    isLoading: selectLoading,
    listUsers: selectUser,
    listRole: selectRole,
    listRoom: selectRoom
})

const mapDispatchToProps = (dispatch) => ({
    getAllUser: (payload) => dispatch(getAllUser(payload)),
    createUser: (payload) => asyncCreateUser(dispatch)(payload),
    getRoles: (payload) => asyncGetDetailRoles(dispatch)(payload),
    getRooms: (payload) => asyncGetDetailRoom(dispatch)(payload),
    deleteUser: (payload) => asyncDeleteUser(dispatch)(payload),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Users)