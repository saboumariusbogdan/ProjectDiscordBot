import React, {useState, useEffect} from 'react';
import {deleteTask, getTasks} from './services';
import {Link} from 'react-router-dom';

const Tasklist = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getTasks()
            .then(items => {
                setList(items);
            })
    }, []);

    const refreshList= (id) => {
        setList((prevState)=> prevState.filter((task)=> task.id !== id) )
    }

    console.log(list)
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                    list.map(item => {
                        return (<tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.description}</td>
                            <td>{item.status}</td>
                            <td><Link to={`/tasks/${item.id}`}>Edit</Link></td>
                            {
                                console.log(item.id)
                            }
                            <button onClick={ () => {
                                deleteTask(item.id)
                                refreshList(item.id)
                            } } style={{backgroundColor:"red"}}>DELETE</button>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </>
    )

}

export default Tasklist;
