import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd'; // Import the Ant Design table component
import Layout from '../components/Layout';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users data
  const getAllUsers = async () => {
    try {
      setLoading(true); // Ensure loading is set to true at the start of the request
      const res = await axios.get('/api/v1/user/all-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      setUsers(res.data.data); // Set the fetched users data to the state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or if there's an error
    }
  };

  useEffect(() => {
    getAllUsers();
    // Adding an empty dependency array ensures this useEffect only runs once
  }, []);

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => roles.join(', '), // Join the roles array into a comma-separated string
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
      <h1>Users Page</h1>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id" // Assuming each user has a unique _id field
      />
    </Layout>
  );
};

export default UsersPage;
