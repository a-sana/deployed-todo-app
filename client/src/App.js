import { useEffect, useState} from 'react'
import ListItem from './components/ListItem'
import ListHeader from './components/ListHeader'
import Auth from './components/Auth'
import {useCookies} from 'react-cookie'


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  // const userEmail = cookies.email
  const [ tasks, setTasks] = useState(null)

  // const authToken = false

  const getData = async () => {
    
    try {
      // async method that returns a promise
      const response = await fetch (`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
      
    } catch(err) {
      console.error(err);
    }
  }

    useEffect(() => {
      if (authToken) {
        getData();
      }}, 
      []);

    // useEffect(() => {
    //   if (authToken) {
    //     getData();
    //   }
    // }, [authToken]);

    // useEffect(() => {
    //   if (authToken) {
    //     getData();
    //   }
    // }, [authToken, getData]);

  //Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <>
      <ListHeader listName={'🏖️ Holiday Checklist'} getData={getData}/>
      <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
      </>}
      <p className="copyright">&copy; Creative Coding LLC</p>
     
      
    </div>
  );
}



export default App;

