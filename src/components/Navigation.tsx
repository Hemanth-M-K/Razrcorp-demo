import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation: React.FunctionComponent = ():JSX.Element => {
    return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='px-3' fixed='top'>
        <Navbar.Brand>
            <Link className='navbar-brand' to='/'>RAZRCORP TEST</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Link className='navbar-brand' to='/'>Infinet Scroll</Link>
                <Link className='navbar-brand' to='/autocorrector'>Auto Completer</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>)
}

export default Navigation;