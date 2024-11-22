import { useDispatch } from 'react-redux';
import { Button, Flex } from 'antd';
import { setIsAuth } from '../../state/userProfile';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './index.css';

const Resume = ()=>{
    const dispatch = useDispatch();
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        dispatch(setIsAuth(false));
  
      } catch (e) {
        console.log(e, ':signOut error')
      }
    };
    return(
        <div>
             <Flex  justify='flex-end'  >
         <Button  type= 'primary' htmlType='submit' onClick={handleSignOut}>
            Sign Out
         </Button>
         </Flex>
        </div>
    )
}

export default Resume;