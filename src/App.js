import React from 'react';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import { Link } from "react-router-dom";
import Player from "./components/AudioPlayer";
import { Layout } from "antd";
import Spotify from "./images/logo.png";
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons"; //search field design

const { Content, Sider, Footer } = Layout; //ant design for page structure

const App = () => {

  const [nftAlbum, setNftAlbum] = useState();
  return (
    <>
      <Layout>
        <Layout>
          <Sider width={300} className="sideBar"> {/*the width equals 300 so the side meanu can be wider*/}
            <img src={Spotify} alt="Logo" className="logo"></img>
            <div className="searchBar">
              <span> Search here... </span>
              <SearchOutlined style={{ fontSize: "30px" }} />
            </div>
            <Link to="/">
            <p style={{ color: "#ffda79" }}> Home </p>
            </Link>
            <p> Your Profile </p>
            <div className="recentPlayed">
              <p className="recentTitle">RECENTLY PLAYED</p>
              <div className="install">
                <span> More Options </span>
                <DownCircleOutlined style={{ fontSize: "30px" }} />
              </div>
            </div>
          </Sider>
          <Content className="contentWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album" element={<Album setNftAlbum={setNftAlbum}/>} />
          </Routes>
          </Content>
        </Layout>
        {/*this footer contains the music player */}
        <Footer className="footer">
          {nftAlbum &&
          <Player
            url={nftAlbum}
          />
          }
        </Footer>
      </Layout>
    </>
  );
}


export default App;
