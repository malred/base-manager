import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 导入页面组件
import Login from './views/Login/Login'
import Layout from './views/Layout/Layout'
import Role from './views/Role/Role';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Layout' element={<Layout />} >
          <Route path='role' element={<Role />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
