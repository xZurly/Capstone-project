import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking';
const Main = () => {

    const seedRandom = function(seed){
        var m = 2**35-31;
        var a = 185852;
        var s = seed % m;
        return function(){
          return (s = s * a % m) / m;
        }
    }

    const fetchAPI = function(date){
        let result = [];
        let random = seedRandom(date.getDate());
        
        for(let i = 17; i <= 23; i++) {
          if(random() < 0.5) {
            result.push(i + ':00');
          }
          if(random() < 0.5) {
            result.push(i + ':30');
          }
        }
        return result;
    };
    

    const submitAPI = function(formDate) {
        return true;
    };

    
    const initialState = {availableTimes: fetchAPI(new Date())};
    const [state, dispatch] = useReducer(updateTimes, initialState);

    function updateTimes(state, date) {
        return {availableTimes: fetchAPI(new date())}
    }
    
    const navigate = useNavigate();
    function submitform (formDate) {
        if(submitAPI(formDate)) {
            navigate("/confirmed")
    
        }
    }
    return (
        <main>
            <Routes>
                <Route path='/' element={<Header />}/>
                <Route path='/booking' element={<Booking availableTimes={state} dispatch={dispatch} SubmitForm={submitform}/>} />
                <Route path='/' element={<Header />}/>
            </Routes>
        </main>
    );
};

export default Main;