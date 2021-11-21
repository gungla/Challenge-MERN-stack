import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Loader from './Loader';

function About() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);

    return (
        <>
        <Link className='btn btn-light my-3' to='/'>
            Volver
        </Link>
        {loading && <Loader/>}
        {!loading && (  
        <Row>
            <Col md={6} className='descp'>
                <Image src='https://avatars.githubusercontent.com/u/379321?v=4' fluid />
            </Col>
            <Col md={6}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>Sobre mi</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac ligula sit amet enim eleifend pharetra vitae in lorem. Nunc viverra leo ac justo volutpat luctus. Maecenas quis mi sed massa molestie fermentum. Duis vehicula, magna et feugiat elementum, erat lorem dignissim urna, id elementum augue ipsum quis ligula. Mauris in feugiat orci. Morbi lacinia ut tellus eget consequat. Vestibulum malesuada eros augue.
                        <br/><br/>
                        Proin dictum est quis lorem volutpat, non tristique arcu condimentum. Etiam facilisis vitae ante quis varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        )}
        </>
    )
}

export default About
