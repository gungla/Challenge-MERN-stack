import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/');
    }
  }

  return (
    <Form className='search_form' onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Buscar...'
        className='search-button'>
      </Form.Control>
      <i className="fa fa-search fa-lg position-absolute"></i>
      {/* <Button type='submit' variant='success' className='icon'>
        Buscar
      </Button> */}
    </Form>
  )
}

export default SearchBox;
