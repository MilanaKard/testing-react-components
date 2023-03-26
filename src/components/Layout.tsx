import { NavLink, Outlet } from 'react-router-dom';

const Layout = (): JSX.Element => {
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/form">Form</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>2023</footer>
    </>
  );
};
export { Layout };
