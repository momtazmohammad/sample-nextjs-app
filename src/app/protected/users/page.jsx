"use server"
import React from "react";
import dbConnect from "@/../lib/dbConnect";
import userModel from "@/../models/user";

const  getUsers=async ()=>{
  let resUsers;
  try {
    await dbConnect();
    resUsers = await userModel.find({ isadmin: false }).select({
      userpass: 0,
      isadmin: 0,
      __v: 0,
    });
  } catch (err) {
    resUsers = [];
  }
  return resUsers
}

const Users = async () => {
const resUsers=await getUsers();
  return (
    <div>
      <div>
        <table style={{ margin:"10px",borderCollapse: "collapse", tableLayout:"fixed",width:"100%"}}>
          <thead>
            <tr>
              <th className="table-th" >کدکاربر </th>
              <th className="table-th" >نام کاربر </th>
              <th className="table-th" >ایمیل </th>
            </tr>
          </thead>
          <tbody>
            {resUsers.map((user) => (
              <tr
                key={user.userid}               
              >
                <td className="table-td">
                  {user.userid}
                </td>
                <td className="table-td">{user.username}</td>
                <td className="table-td">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;

