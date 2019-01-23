import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from "./Spinner";

class App extends React.Component { //za pomoca React.component pozyczamy funkcjonalności z Reacta 
    
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition( //możemy załadować jakies dane z np. jakiegośAPI w kontruktorze, skoro wiemy ze bedziemy tego uzywac w aplikacji (pamietaj, ze to nie nie wyświetla jeszcze tego, to wszyskto jest w konsoli ewentualnie. to jest w pamięci!)
            position => this.setState({ lat: position.coords.latitude }), //callback function - podajemy funkcje jako argument metody
            err => this.setState({ errorMessage: err.message })
            
        );

    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request"/>;
      
    }


    //React says we have to define render!!
    render() {
        return (
            <div className="border red"> {this.renderContent()} </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);