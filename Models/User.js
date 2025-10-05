import { DataTypes } from "sequelize";
import sequelize from "../Config/db.js";

const User = sequelize.define("User", {
  userid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone:{
   type:DataTypes.STRING,
   unique:true,
   allowNull:false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
