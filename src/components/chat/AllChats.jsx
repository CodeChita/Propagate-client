import React from 'react'
import { Avatar, Typography } from '@material-ui/core'

const AllChats = (props) => {

    const [messageList, setMessageList] = useState(null)

    componentDidMount() {
        
    }
    

    const myUserId = props.me._id
    return (
        
        <div>
        <Typography variant="h4">Messages</Typography>
        <hr/>
        
    
        
        </div>
    )
}

export default AllChats
