/* tslint:disable */

import * as React from 'react';
import {
  StyledComponentProps,
  Theme,
  // Paper,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import CreateUserModal from './CreateUserModal';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: '5%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  paddingTop: {
    paddingTop: '50px !important'
  }
});

type PropsWithStyles = StateProps & DispatchProps & WithTheme & WithStyles<'root' | 'textField' | 'paddingTop'>;

class InternalLogin extends React.PureComponent<PropsWithStyles, InternalState> {
  state = {
    email: '',
    password: '',
    err: ''
  };

  validateEmailOrPhoneNUmber = () => {
    let phoneNumberRegex = /\d{10}/;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(emailRegex.test(this.state.email));
    if (emailRegex.test(this.state.email) === true || phoneNumberRegex.test(this.state.email) === true) {
      this.setState({ err: '' });
    } else {
      this.setState({ err: 'Invalid email or Phone Number' });
    }
  };

  signIn = () => {
    if (this.state.email !== '' && this.state.password !== '' && this.state.err === '') {
      let signInCreds = {
        email: this.state.email,
        password: this.state.password
      };
      localStorage.setItem('userObj', this.state.email);
      alert(`${signInCreds.email} ${signInCreds.password}`);
      // TODO: Alert should be replaced by functionality to check from database if the information matches.
    }
  };

  // tslint:disable-next-line:no-any
  handleEmail = (e: any) => {
    this.setState({ email: e.target.value });
  };
  // tslint:disable-next-line:no-any
  handlePassword = (e: any) => {
    this.setState({ password: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: '-webkit-fill-available' }}>
        <form onSubmit={this.signIn}>
          <Grid container alignItems="center" justify="flex-end" spacing={24}>
            <Grid item>
              <TextField
                id="standard-email"
                label="Email or Mobile Number"
                className={classes.textField}
                value={this.state.email}
                onBlur={this.validateEmailOrPhoneNUmber}
                onChange={this.handleEmail}
                margin="normal"
                helperText={this.state.err}
              />
              <TextField
                id="standard-password"
                label="Password"
                type="password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handlePassword}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button color="primary" type="submit">
                Log In
              </Button>
              <CreateUserModal classes={classes} />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const login: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalLogin));
export default login;
