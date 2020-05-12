import React, { useState, useEffect } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

import CardItem from './Todos/CardItem';
import { Card, Form, Input } from 'reactstrap';

export default function SearchBar(props) {

  const [cardList, setCardList] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/task`)
      .then(response => {
        let results = response.data.filter(card => {
          return card.title.toLowerCase().includes(searchQuery.toLowerCase())
        });
        setCardList(results);
      })
      .catch(error => console.log('Call not complete', error))
  }, [searchQuery]);


  return (
    <Card><Form className="search-form">
      <Input
        id='term'
        type='text'
        name='textfield'
        placeholder='Search...'
        value={searchQuery}
        onChange={handleChange} />
    </Form>
      {cardList.map(todo => (
        <CardItem key={todo.title} props={todo} />
      ))}
    </Card>

  );
}