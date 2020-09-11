import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import UserCard from "./components/card/UserCard"
import Header from "./components/header/Header";
import { DataProvider } from "./context/DataContext";
function App() {

  return (
    // BEM convention
    <DataProvider>
      <div className="app">
        <Header />
        <Container maxWidth="md">
          <div className="app__card">
            <UserCard />
          </div>
        </Container>


      </div>
    </DataProvider>
  );
}

export default App;
