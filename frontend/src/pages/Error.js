import { Link } from "react-router-dom";
import img from '../assets/images/404_not found.svg';
import Wrapper  from "../assets/css/errorPage";

const Error = () => {
    return (
        <Wrapper>
            <div>
                <img src={img} alt='not found' />
                <h3>Ohh! Page Not Found</h3>
                <p>Sorry we Can't find the page you are looking for</p>
                <Link to='/' >Back Home</Link>
            </div>
        </Wrapper>
    )
}

export default Error