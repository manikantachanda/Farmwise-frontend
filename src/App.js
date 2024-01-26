// // App.js

// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store';
// import Form from './Form';
// import DisplayFields from './DisplayFields';

// function App() {
//   return (
//     <Provider store={store}>
//       <div>
        
//         <Form />
//          <DisplayFields/>
//       </div>
//     </Provider>
//   );
// }

// export default App;


import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import DisplayFields from './DisplayFields';
import DynamicForm from './DynamicForm';
import store from './store'; // Import your Redux store

function App() {
  return (
    <Provider store={store}> {/* Wrap your components with Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/DynamicForm" element={<DynamicForm />} />
        </Routes>
        <DisplayFields />
      </Router>
    </Provider>
  );
}

export default App;

