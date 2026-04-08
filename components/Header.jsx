import Link from 'next/link';

import Toolbar from '@mui/material/Toolbar';
import Grid2 from '@mui/material/Grid2';

import { styleToolbar } from './SharedStyles';

const Header = () => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid2 container direction="row" justifyContent="space-around" align="center">
        <Grid2 size={{ xs: 12 }} style={{ textAlign: 'right' }}>
          <Link href="/login" style={{ margin: '0px 20px 0px auto' }}>
            Log in
          </Link>
        </Grid2>
      </Grid2>
    </Toolbar>
  </div>
);

export default Header;
