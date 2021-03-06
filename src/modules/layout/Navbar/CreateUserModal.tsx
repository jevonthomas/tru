/* tslint:disable */

import * as React from 'react';
import axios from 'axios';
import {
  Modal,
  withStyles,
  Theme,
  StyledComponentProps,
  withTheme,
  Button,
  WithTheme,
  WithStyles,
  TextField,
  MenuItem,
  InputLabel,
  Input,
  Checkbox,
  ListItemText,
  InputAdornment,
  IconButton,
  Select,
  Grid,
  Paper,
  FormControl,
  Typography,
  Tooltip,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
let zipcodes = require('zipcodes');
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

interface StateProps {
  isLoggedIn: any;
}
// www.npmjs.com/package/zipcodes - to convert zipcode to city and state
const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  paperModal: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'none',
    borderRadius: '5%',
    textAlign: 'center',
    margin: '5% 30%'
  },
  paper: {
    textAlign: 'center',
    color: '#2E4C63',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: '0 20px',
    maxWidth: 600
  },
  table: {
    minWidth: '100%'
  },
  tableCell: {
    border: 'none'
  },
  label: {
    textAlign: 'center',
    fontSize: '2em'
  },
  submitBtn: {
    width: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 20
  },
  wrapText: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    whiteSpace: 'normal'
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 400
  },
  orangeSpan: {
    color: '#F17820',
    fontSize: '1em'
  },
  errorSpan: {
    color: 'red',
    fontSize: '1em'
  },
  formDiv: {
    width: '100%',
    backgroundColor: 'yellow'
  }
});

const themeAlt = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'button'
    | 'paper'
    | 'paperModal'
    | 'root'
    | 'tableCell'
    | 'table'
    | 'label'
    | 'submitBtn'
    | 'wrapText'
    | 'menu'
    | 'formControl'
    | 'personalizedModal'
    | 'orangeSpan'
    | 'errorSpan'
    | 'margin'
    | 'formDiv'
    | 'bgColorModal'
  >;

const gender = ['Male', 'Female', 'Other'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class CreateModal extends React.PureComponent<PropsWithStyles, InternalState> {
  cause: Array<any> = [];
  state = {
    open: false,
    defaultState: '',
    firstName: '',
    lastName: '',
    gender: '',
    cause: this.cause,
    causeList: this.cause,
    zipcode: '',
    cs: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    password: '',
    showPassword: false,
    passCheck: '',
    errStack: '',
    unformattedPhoneNumber: '',
    passwordErr: ''
  };
  unique = 1;

  propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  // tslint:disable-next-line:no-any
  handleZipcodeChange = (event: any) => {
    const onlyNums = event.target.value.replace(/[^0-9]/, '');
    // tslint:disable-next-line:no-console
    if (onlyNums.length < 5) {
      this.setState({ zipcode: onlyNums });
    } else if (onlyNums.length === 5) {
      this.setState({ zipcode: onlyNums });
      this.findCityState(onlyNums);
    }
  };

  findCityState = (nums: number) => {
    if (zipcodes.lookup(nums) !== undefined) {
      let city = zipcodes.lookup(nums).city;
      let state = zipcodes.lookup(nums).state;
      let cs = `${city}, ${state}`;
      this.setState({ cs: cs, city: city, state: state });
    } else {
      alert('Incorrect zipcode! Try again.');
    }
  };

  // tslint:disable-next-line:no-any
  handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/, '');
    if (onlyNums.length < 10) {
      this.setState({ phoneNumber: onlyNums });
    } else if (onlyNums.length === 10) {
      this.setState({ unformattedPhoneNumber: onlyNums });
      const num = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ phoneNumber: num });
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  // tslint:disable-next-line:no-any
  handleChange = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  validatePassword = () => {
    let password = this.state.password;
    console.log('pass:', password);
    let exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,15}$/;
    if (exp.test(password) === false) {
      this.setState({
        passwordErr: 'Should be between 4-15 characters long, At least one Upper letter, At least one Number'
      });
    } else {
      this.setState({ passwordErr: '' });
    }
  };

  errStack = '';
  validateEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(this.state.email) === false) {
      this.errStack = 'Invalid Email';
      this.setState({ errStack: this.errStack });
    } else {
      this.checkIfEmailAlreadyExists(this.state.email).then(data => {
        console.log(data);
        this.setState({ errStack: data });
      });
    }
  };

  checkIfEmailAlreadyExists = (email: string) => {
    console.log(email);
    return new Promise(resolve => {
      axios.get('http://localhost:8000/api/account/check', { params: { email } }).then(response => {
        if (response.data !== '') {
          resolve('Email is already taken');
        } else resolve('');
      });
    });
  };

  createUserObj = () => {
    return new Promise((resolve, reject) => {
      let userObj = {
        FName: this.state.firstName,
        LName: this.state.lastName,
        Gender: this.state.gender,
        Zip: this.state.zipcode,
        City: this.state.city,
        State: this.state.state,
        Email: this.state.email,
        Password: this.state.password,
        PhoneNO: this.state.unformattedPhoneNumber,
        AccountCreated: Date.now(),
        Account_Type: 'Personal',
        Causes: this.state.cause
      };
      resolve(userObj);
    });
  };

  onFormSubmit = (e: any) => {
    e.preventDefault();
    if (this.state.errStack.length > 0 || this.state.passwordErr.length > 0) {
      this.setState({ errStack: this.state.errStack });
    } else {
      this.createUserObj().then(data => {
        axios.post('http://localhost:8000/api/account', data).then(response => {
          // console.log('Data submitted', response.data);
          sessionStorage.setItem('UserObj', response.data);
          this.props.isLoggedIn();
          this.resetForm();
        });
      });
    }
  };

  resetForm = () => {
    this.handleCloseModal();
    this.setState({
      firstName: '',
      lastName: '',
      gender: '',
      causeList: this.cause,
      zipcode: '',
      cs: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
      password: '',
      showPassword: false,
      passCheck: '',
      errStack: '',
      unformattedPhoneNumber: ''
    });
  };

  getCausesWithCode = () => {
    axios.get('http://localhost:8000/api/causes').then((causes: any) => {
      this.setState({ causeList: causes.data });
      console.log('Data------->', causes.data);
    });
  };

  componentDidMount = () => {
    this.getCausesWithCode();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <MuiThemeProvider theme={themeAlt}>
          <Button color="primary" onClick={this.handleOpenModal} aria-label="Register" className={classes.button}>
            Register
          </Button>
        </MuiThemeProvider>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleCloseModal}
          className={classes.paperModal}
        >
          <div className={classes.root}>
            <form onSubmit={this.onFormSubmit}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.paper}>
                    Sign up to enjoy what <span className={classes.orangeSpan}>tru</span>
                    Radius has to offer.
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="standard-fname"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="standard-lname"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-select-gender"
                    select
                    label="Gender"
                    value={this.state.gender}
                    onChange={this.handleChange('gender')}
                    SelectProps={{ MenuProps: { className: classes.menu } }}
                    margin="normal"
                  >
                    {gender.map(g => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%', marginTop: 16 }}>
                    <InputLabel htmlFor="select-multiple-checkbox">Select causes</InputLabel>
                    <Select
                      autoWidth
                      required
                      multiple
                      value={this.state.cause}
                      onChange={this.handleChange('cause')}
                      input={<Input multiline id="select-multiple-checkbox" />}
                      renderValue={() => this.state.cause.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {/* {this.state.causes.length > 0
                        ? this.state.causes.map(c => (
                            <MenuItem key={this.unique++} value={c.CauseName}>
                              <Checkbox checked={this.state.causes.indexOf(c) > -1} />
                              <ListItemText primary={c} />
                            </MenuItem>
                          ))
                        : ''} */}
                      {this.state.causeList.length > 0
                        ? this.state.causeList.map(c => (
                            <MenuItem key={c.Casues_ID} value={c.CauseName}>
                              <Checkbox checked={this.state.cause.indexOf(c.ntee_code) > -1} />
                              <Typography>
                                <ListItemText primary={c.CauseName} />
                              </Typography>
                            </MenuItem>
                          ))
                        : ''}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="standard-zipcode"
                    label="Zipcode"
                    value={this.state.zipcode}
                    onChange={this.handleZipcodeChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    disabled
                    id="standard-city"
                    label="City"
                    value={this.state.city}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    disabled
                    id="standard-state"
                    label="State"
                    value={this.state.state}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-number"
                    label="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={this.handleNumberChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    onBlur={this.validateEmail}
                    id="email"
                    name="email"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    helperText={<span className={classes.errorSpan}>{this.state.errStack}</span>}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title={this.state.passwordErr} placement="top">
                    <FormControl style={{ width: '100%', marginTop: 16 }}>
                      <InputLabel htmlFor="adornment-password">Password</InputLabel>
                      <TextField
                        style={{ marginTop: 16 }}
                        fullWidth
                        required
                        id="password"
                        helperText={<span className={classes.errorSpan}>{this.state.passwordErr}</span>}
                        name="password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        onBlur={this.validatePassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Button color="primary" className={classes.button} type="button" onClick={this.resetForm}>
                      Cancel
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Button color="primary" className={classes.button} type="submit">
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const CreateUserModal: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(CreateModal));
export default CreateUserModal;
