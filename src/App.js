import React, { useState } from "react";
import './App.css';

import { Index } from "./dates/Index";
import { Index0 } from "./dates/Index0.jsx";
import { Index1 } from "./dates/Index1.jsx";
import { Index3 } from "./dates/Index3";
import { Index4 } from "./dates/Index4";

const App = () => {
  const [currentForm, setCurrentForm] = useState('index');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const formComponents = {
    index: <Index onFormSwitch={toggleForm} />,
    index0: <Index0 onFormSwitch={toggleForm} />,
    index1: <Index1 onFormSwitch={toggleForm} />,
    index3: <Index3 onFormSwitch={toggleForm} />,
    index4: <Index4 onFormSwitch={toggleForm} />

  };


  return (
    <div className="App">
      {formComponents[currentForm]}
    </div>
  );
}

export default App;
