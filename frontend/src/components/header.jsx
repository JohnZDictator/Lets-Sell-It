import './header.css';

const Header = ({ img, title, showHamburger }) => {
    return (
        <>
            <header>
                <img src={img} alt="" />
                <h1>{title}</h1>
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </header>
        </>
    );
};

export default Header;