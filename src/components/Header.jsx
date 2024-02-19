import logo from '../assets/logo.jpg';

export default function Header({count, handleCartClick}) {
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="logo-img" />
        <h1>ReactFood</h1>
      </div>
      <button className="text-button" onClick={handleCartClick}>
        Cart({count})
      </button>
    </div>
  );
}