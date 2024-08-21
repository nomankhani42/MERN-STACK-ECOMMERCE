import React from 'react'
import Layout from '../../Layout/Layout';
import AdminMenu from './AdminMenu';

const Users = () => {
    return (
        <Layout>
          <div className=" lg:mt-5 lg:p-20 p-4">
            <h2 className=" text-center font-bold text-3xl">Admin Dashboard - Users</h2>
            <div className=" grid grid-cols-12 pt-5">
              <div className=" col-span-3">
                <AdminMenu activeMenu={6} />
              </div>
              <div className="col-span-8 p-5">
                 Users
              </div>
            </div>
          </div>
        </Layout>
      );
}

export default Users