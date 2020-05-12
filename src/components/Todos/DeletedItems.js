import React, { useState, useEffect } from 'react';
import { CardColumns, Button, Card } from 'reactstrap';

import axiosWithAuth from '../../utils/axiosWithAuth';

import { connect } from 'react-redux';

import { getList } from '../../actions';

import CardItem from './CardItem';
import SearchBar from '../SearchBar';

export default function DeletedItems(props) {

    const [deleted, setDeleted] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/task`)
            .then(response => {
                console.log('response', response)
                let results = response.data.filter(card => {
                    return card.complete === 1;
                });
                console.log('what are results', results)
                setDeleted(results);
            })
            .catch(error => console.log('Call not complete', error))
    }, []);

    return (

        <div className='deleted_tasks'>
            <Card>
                {deleted.map(todo => (
                    <CardItem key={todo.title} props={todo} />
                ))}
            </Card>
        </div >
    )
}
