import './Header.scss'
// Not a page, but a reusable component, should go into src/components folder
// Page is usually a parent component which holds all neccessary components
// for a desired functionality to work
export const Header = () => {

    return <div className="header"><h1>Interviews & Reports Practice</h1></div>

}