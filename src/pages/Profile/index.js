/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from "../../components/base/card/index";
import ProfileCard from "../../components/module/cardProfile/index";
import styles from "./profile.module.css";
// import Input from "../../components/base/input/index";
import Button from "../../components/base/button/index";
// import Navi from '../../components/module/navi/index'
import Footer from "../../components/module/footer/index";
import Header from "../../components/module/nav/header";
import { useSelector, useDispatch } from "react-redux";
// import styless from "../../components/module/cardProfile/cardProfile.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  updateUser,
  detailUserAction,
} from "../../configs/redux/actions/detailUserAction";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png"

const Profile = () => {
  const { data } = useSelector((state) => state.detail);
  // const id = user.id;
  // const {city} = data
  const dispatch = useDispatch();
  const [phone_number, setPhone_number] = useState("");
  const [username, setUsername] = useState("");
  const [citys, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [post_code, setPost_code] = useState("");
  const [imagePreview, setImagePreview] = useState(avatar);
  const [photo, setPhoto] = useState(imagePreview);
  // const [email, setEmail] = useState("");git 
  useEffect(() => {
    datas();
    dispatch(detailUserAction());
  }, []);
  console.log(citys);
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    console.log(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const data = new FormData();
    data.append("phone_number", phone_number);
    data.append("username", username);
    data.append("city", citys);
    data.append("address", address);
    // data.append("email", email);
    data.append("post_code", post_code);
    data.append("photo", photo);
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_BACKEND}/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        dispatch(updateUser(res));
        navigate("/profile");
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate users",
          text: `username : ${username}`,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data yang anda inputkan salah",
        });
        console.log(err);
      });
  };

  const datas = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.username);
    setUsername(response.data.data.username);
    setImagePreview(response.data.data.photo);
    setPost_code(response.data.data.post_code);
    setCity(response.data.data.city);
    setPhone_number(response.data.data.phone_number);
    setAddress(response.data.data.address);
  };
  return (
    <>
      <div className={styles.container}>
        <Header />
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.sect1}>
              <ProfileCard
                onChange={(e) => onImageUpload(e)}
                names="photo"
                gambar={imagePreview}
              />
            </div>
            <div className={styles.sect2}>
              <p className={styles.text}>Profile</p>
              <p className={styles.text2}>Profile</p>
              <div className={styles.formSheet}>
                <div className={styles.contact}>
                  <p className={styles.contactText}>Contact</p>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={styles.input}
                    value={data.email}
                    //   onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insert Your Email"
                    disabled
                  />
                  <label htmlFor="phone_number" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    id="phone_number"
                    type="number"
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
                    name="phone_number"
                    className={styles.input}
                    placeholder="Insert Your Phone Number"
                  />
                  <p className={styles.settingText}>{"Account Setting >"}</p>
                </div>
                <div className={styles.biodata}>
                  <p className={styles.biodataText}>Biodata</p>
                  <label htmlFor="username" className={styles.label}>
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                    placeholder="Insert Your Name"
                  />
                  <label htmlFor="city" className={styles.city}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={citys}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.input}
                    placeholder="Insert Your City"
                  />
                  <label htmlFor="address" className={styles.label}>
                    Adress
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={styles.input}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Insert Your Adress"
                  />
                  <label htmlFor="postcode" className={styles.label}>
                    Zip Coder
                  </label>
                  <input
                    type="number"
                    id="postcode"
                    className={styles.input}
                    name="post_code"
                    value={post_code}
                    onChange={(e) => setPost_code(e.target.value)}
                    placeholder="Insert Your Zip Code"
                  />
                </div>
              </div>
              <div className={styles.btnDiv}>
                <Button className={styles.btn} title="save" type="submit" />
              </div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
