import NoSSR from 'react-no-ssr';
import Router from '../router.js'
import Core from "meteor/nova:core";

const Messages = Core.Messages;

const Header = ({currentUser}) => {
  
  ({Logo, ListContainer, CategoriesList, NewPostButton, UserMenu, AccountsMenu} = Telescope.components);

  const logoUrl = Telescope.settings.get("logoUrl");
  const siteTitle = Telescope.settings.get("title", "Telescope");
  const tagline = Telescope.settings.get("tagline");

  return (
    <div className="header-wrapper">
      <header className="header">

        <div className="logo">
          <Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>
        
        <div className="nav">
          
          <div className="nav-user">
            {currentUser ? <UserMenu user={currentUser}/> : <NoSSR><LogInButtons /></NoSSR>}
          </div>

          <div className="nav-new-post">
            <NewPostButton/>
          </div>

        </div>

      </header>
    </div>
  )
}

module.exports = Header;
