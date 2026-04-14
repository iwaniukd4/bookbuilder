import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid2 from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';

import { styleToolbar } from './SharedStyles';
import MenuWithAvatar from './MenuWithAvatar';

const optionsMenu = [
  {
    text: 'Got question?',
    href: 'https://github.com/async-labs/builderbook/issues',
  },
  {
    text: 'Log out',
    href: '/logout',
    anchor: true,
  },
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

const defaultProps = {
  user: null,
};

const Header = ({ user }) => {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid2 container direction="row" justifyContent="space-around" alignItems="center">
          <Grid2 size={{ xs: 9, sm: 11 }} style={{ textAlign: 'left' }}>
            {user ? null : (
              <Link href="/">
                <Avatar
                  src="https://storage.googleapis.com/builderbook/logo.svg"
                  alt="Builder Book logo"
                  style={{ margin: '0px auto 0px 20px', cursor: 'pointer' }}
                />
              </Link>
            )}
          </Grid2>
          <Grid2 size={{ xs: 3, sm: 1 }} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: ' nowrap' }}>
                {user.avatarUrl ? (
                  <MenuWithAvatar
                    options={optionsMenu}
                    src={user.avatarUrl}
                    alt={user.displayName}
                  />
                ) : null}
              </div>
            ) : (
              <Link href="/login" style={{ margin: '0px 20px 0px auto' }}>
                Log in
              </Link>
            )}
          </Grid2>
        </Grid2>
      </Toolbar>
    </div>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
