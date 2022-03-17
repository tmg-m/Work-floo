import { Route, Routes } from 'react-router-dom';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import TaskCreate from './pages/TaskCreate';
import TaskDetail from './pages/TaskDetail';
import TaskEdit from './pages/TaskEdit';
import UserEdit from './pages/UserEdit';
import UserProfile from './pages/UserProfile';
import { AuthProviderWrapper } from './context/auth.context';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AllUser from './pages/AllUser';
import Chat from './pages/Chat';

function App() {
  return (
    <AuthProviderWrapper>
      <Routes>
        <Route path="/" element={<IsPrivate><Home /></IsPrivate>}/>
        <Route path="/task/:id" element={<IsPrivate><TaskDetail /></IsPrivate>} />
        <Route path="/task/:id/edit" element={<IsPrivate><TaskEdit /></IsPrivate>} />
        <Route path="/task/create" element={<IsPrivate><TaskCreate /></IsPrivate>} />
        <Route path="/user" element={<IsPrivate><AllUser /></IsPrivate>} />
        <Route path="/user/:id" element={<IsPrivate><UserProfile /></IsPrivate>} />
        <Route path="/user/:id/edit" element={<IsPrivate><UserEdit /></IsPrivate>} />

        <Route path="/chat/:id" element={<IsPrivate><Chat /></IsPrivate>} />
        <Route path="/chat/mine" element={<IsPrivate><Chat /></IsPrivate>} />

        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>}/>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Navbar />
    </AuthProviderWrapper>
  );
}

export default App;
