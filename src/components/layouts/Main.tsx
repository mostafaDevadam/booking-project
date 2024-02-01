import React from 'react'
import SideBarLeft from './SideBarLeft'
import { Col, Container, Nav, NavItem, Navbar, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Container fluid>
                <Row style={{ height: '92vh'}}>
                    <Col className='col-3 bg-danger'><SideBarLeft /></Col>
                    <Col className='col-9 bg-success'><Outlet/></Col>
                </Row>

            </Container>
        </div>
    )
}

export default Main
