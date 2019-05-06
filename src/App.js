import React from 'react';
import logo from './logo.svg';
import './App.css';

const SERVER = "http://157.230.76.73:3000"; 

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: "BIENVENIDO AL CONTROL DE TU PECERA",
      temp: 0,
      ph: 2,
      light: 32
    }

  }

  onAction = (e) => {
    this.setState({
      nombre: "WHAT?",
    });
  }

  getNombre = () => {
    return "Dinosaurio";
  }

  getInfo = () =>{
    fetch(`${SERVER}/last`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response=>response.json()).then(response => {
      this.setState({
        temp: response[0].temp,
        ph: response[0].ph,
        light: response[0].light,
      });

      setTimeout(()=>{
        this.getInfo();
      },1000);
      console.log(response);
  });
  }

  componentDidMount(){
    this.getInfo();
  }

  // getColorPh = () =>{
  //   if(ph == 60)
  // }

  render() {
    const { nombre } = this.state;
    const { temp } = this.state;
    const { ph } = this.state;
    const { light } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 title">
            {nombre}
          </div>
        </div>
        <div className="row">
          <span className="glyphicon glyphicon-search" aria-hidden="true">
          </span>
          <div className="col-md-4 temp">

            <i className="material-icons icon">whatshot</i>
            <div className="info">
              <span className="titleCard">
                TEMPERATURA
              </span>
              <span className="valueCard">
                {temp}º
              </span>
            </div>
          </div>
          <div className="col-md-4 ph">
            <i className="material-icons icon">invert_colors</i>
            <div className="info">
              <span className="titleCard">
                ACIDES DEL AGUA
              </span>
              <span className="valueCard">
                {ph}
              </span>
            </div>
          </div>
          <div className={light >= 490 ? 'col-md-4 light': 'col-md-4 dark' }>
            <i className="material-icons icon">{light >= 490 ? 'brightness_5' : 'brightness_3'}</i>
            <div className="info">
              <span className="titleCard">
                INTESIDAD DE LA LUZ
                </span>
              <span className="valueCard">
                {light}%
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
