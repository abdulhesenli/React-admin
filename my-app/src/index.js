import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthContextProvider from './Context/authContext';
import List from './component/list';
import Nav from './component/nav';
import Category from './categoryadd/category';
import Login from './Context/LoginAdmin/Login';





const queryClient = new QueryClient()
class App extends React.Component {


    render() {
        return (



            <QueryClientProvider client={queryClient}>


                <Router>

                    <AuthContextProvider>
                        <div>
                            <Nav />

                            <Routes>
                                <Route path='/list' element={<List />} />
                                <Route path='/category' element={<Category />} />
                                <Route path='/login' element={<Login/>} />
                             

                            </Routes>


                        </div>
                    </AuthContextProvider>
                </Router>

            </QueryClientProvider>




        )



    }


}









const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);