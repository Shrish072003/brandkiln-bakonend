import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd'; // Import Ant Design components
import { UploadOutlined } from '@ant-design/icons';
import Layout from '../components/Layout';

const KnowledgeCentrePage = () => {
  const [knowledgeEntries, setKnowledgeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [form] = Form.useForm(); // Ant Design form instance

  // Fetch all Knowledge Centre entries
  const getAllKnowledgeEntries = async () => {
    try {
      setLoading(true); // Ensure loading is set to true at the start of the request
      const res = await axios.get('/api/v1/knowledge/get-all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      setKnowledgeEntries(res.data.data); // Set the fetched knowledge entries data to the state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or if there's an error
    }
  };

  useEffect(() => {
    getAllKnowledgeEntries();
    // Adding an empty dependency array ensures this useEffect only runs once
  }, []);

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (values[key] && values[key].file) {
          formData.append(key, values[key].file.originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });

      const res = await axios.post('/api/v1/knowledge/create', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      message.success('Knowledge Centre entry created successfully!');
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset form fields
      getAllKnowledgeEntries(); // Refresh the table data
    } catch (error) {
      console.error(error);
      message.error('Failed to create Knowledge Centre entry.');
    }
  };

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Knowledge Centre Header',
      dataIndex: 'knowledgeCentreHeader',
      key: 'knowledgeCentreHeader',
    },
    {
      title: 'Short Description',
      dataIndex: 'short_Description',
      key: 'short_Description',
    },
    {
      title: 'Knowledge Header',
      dataIndex: 'knowledge_Header',
      key: 'knowledge_Header',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          {/* Add actions here, like edit or delete buttons */}
          <a>Edit</a>
          <a style={{ marginLeft: 10 }}>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Knowledge Centre Page</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '16px' }}>
        Add Knowledge Centre Entry
      </Button>
      <Table
        columns={columns}
        dataSource={knowledgeEntries}
        loading={loading}
        rowKey="_id" // Assuming each knowledge entry has a unique _id field
      />

      {/* Modal for adding a new Knowledge Centre entry */}
      <Modal
        title="Add Knowledge Centre Entry"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please enter the category' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="knowledgeCentreHeader"
            label="Knowledge Centre Header"
            rules={[{ required: true, message: 'Please enter the knowledge centre header' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="knowledge_Header"
            label="Knowledge Header"
            rules={[{ required: true, message: 'Please enter the knowledge header' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="knowledge_HeaderMetatag"
            label="Knowledge Header Metatag"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="knowledgeArticle_Header"
            label="Knowledge Article Header"
            rules={[{ required: true, message: 'Please enter the knowledge article header' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="short_Description"
            label="Short Description"
            rules={[{ required: true, message: 'Please enter the short description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="lHS_key_Image"
            label="LHS Key Image"
            valuePropName="fileList"
            getValueFromEvent={e => e && e.fileList}
          >
            <Upload name="file" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="lHs_metatag"
            label="LHS Metatag"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bullet1_text"
            label="Bullet 1 Text"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bullet1_description"
            label="Bullet 1 Description"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="bullet1_Img"
            label="Bullet 1 Image"
            valuePropName="fileList"
            getValueFromEvent={e => e && e.fileList}
          >
            <Upload name="file" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="bullet1_metadata"
            label="Bullet 1 Metadata"
          >
            <Input />
          </Form.Item>
          {/* Repeat for bullets 2, 3, 4, and 5 */}
          {/* Bullet 2 */}
          <Form.Item
            name="bullet2_text"
            label="Bullet 2 Text"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bullet2_description"
            label="Bullet 2 Description"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="bullet2_Img"
            label="Bullet 2 Image"
            valuePropName="fileList"
            getValueFromEvent={e => e && e.fileList}
          >
            <Upload name="file" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="bullet2_metadata"
            label="Bullet 2 Metadata"
          >
            <Input />
          </Form.Item>
          {/* Bullet 3 */}
          <Form.Item
            name="bullet3_text"
            label="Bullet 3 Text"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bullet3_description"
            label="Bullet 3 Description"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="bullet3_Img"
            label="Bullet 3 Image"
            valuePropName="fileList"
            getValueFromEvent={e => e && e.fileList}
          >
            <Upload name="file" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="bullet3_metadata"
            label="Bullet 3 Metadata"
          >
            <Input />
          </Form.Item>
          {/* Bullet 4 */}
          <Form.Item
            name="bullet4_text"
            label="Bullet 4 Text"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bullet4_description"
            label="Bullet 4 Description"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="bullet4_Img"
            label="Bullet 4 Image"
            valuePropName="fileList"
            getValueFromEvent={e => e && e.fileList}
          >
            <Upload name="file" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="bullet4_metadata"
            label="Bullet 4 Metadata"
          >
            <Input />
          </Form.Item>
          {/* Bullet 5 */}
          <Form.Item
            name="bullet5_text"
            label="Bullet 5 Text"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bullet5_description"
            label="Bullet 5 Description"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="bullet5_Img"
            label="Bullet 5 Image"
            valuePropName="fileList"
            getValueFromEvent={e => e && e.fileList}
          >
            <Upload name="file" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="bullet5_metadata"
            label="Bullet 5 Metadata"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default KnowledgeCentrePage;
