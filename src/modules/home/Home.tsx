/* tslint:disable */
import * as React from 'react';
import {
  StyledComponentProps,
  Theme,
  withStyles,
  WithStyles,
  withTheme,
  WithTheme,
  Typography,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Grid,
  FormControl,
  InputBase,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DisplayEventCards } from './DisplayEventCards';
import { DisplayOrgCards } from './DisplayOrgCards';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  root: {},
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: `${theme.spacing.unit}px 0`,
    maxWidth: '100%',
    flexBasis: '100%'
  },
  customButton: {
    // border: '1px solid white',
    borderRadius: 0,
    margin: 'auto 0'
  },
  mainDiv: {
    backgroundColor: '#f17820'
  },
  toggleBtn: {
    padding: 0,
    backgroundColor: '#f17820',
    color: 'white'
  },
  toggleGroup: {
    backgroundColor: '#f17820',
    boxShadow: 'none',
    border: '1px solid white',
    borderRadius: 0,
    margin: 'auto 0',
    fontWeight: 200
  },
  activeBtn: {
    backgroundColor: 'white',
    padding: 0,
    color: '#f17820'
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    justifyContent: 'space-evenly',
    color: 'white'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  inputInput: {
    paddingTop: 4,
    paddingRight: theme.spacing.unit,
    paddingBottom: 4,
    paddingLeft: 20,
    transition: theme.transitions.create('width'),
    width: '50%',
    border: '1px solid #2E4C63',
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },
  gridItem: {
    padding: 8
  },
  moreOptionPanel: {
    backgroundColor: '#2E4C63',
    color: 'white !important'
  },
  whiteText: {
    color: 'white'
  },
  spacerDiv: {
    marginBottom: '30px'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'root'
    | 'mainDiv'
    | 'toggleContainer'
    | 'customButton'
    | 'toggleBtn'
    | 'toggleGroup'
    | 'activeBtn'
    | 'formControl'
    | 'inputInput'
    | 'displayDiv'
    | 'heading'
    | 'gridItem'
    | 'moreOptionPanel'
    | 'whiteText'
    | 'spacerDiv'
  >;
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

const distance = [10, 25, 50, 100];

const causes = [
  'Animal Welfare',
  'Arts and Culture',
  'Children',
  'Civil Rights and Social Action',
  'Disaster and Humanitarian Relief',
  'Economic Empowerment',
  'Education',
  'Environment',
  'Health',
  'Human Rights',
  'Politics',
  'Poverty Alleviation',
  'Science and Technology',
  'Social Services'
];

class InternalHome extends React.PureComponent<PropsWithStyles, InternalState> {
  causes: Array<string> = [];
  state = {
    selected: 'event',
    expanded: false,
    cause: this.causes,
    distance: 10
  };
  unique = 1;
  handleMoreOption = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.value });
  };

  handleToggle = (e: any) => {
    console.log(e.target.id, 'clicked');
    this.setState({ selected: e.target.id });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.mainDiv}>
          <Grid container spacing={24} direction="column">
            <Grid container alignItems="center" direction="row" justify="space-evenly">
              <Grid item xs>
                <FormControl className={classes.formControl}>
                  <InputBase fullWidth placeholder="Search" classes={{ input: classes.inputInput }} />
                </FormControl>
              </Grid>

              <Grid item xs>
                <div className={classes.toggleContainer}>
                  <ToggleButtonGroup className={classes.toggleGroup} exclusive onClick={this.handleToggle}>
                    <ToggleButton
                      id="event"
                      value="event"
                      style={
                        { padding: '0 30px' } // onClick={this.handleToggle}
                      }
                      className={this.state.selected === 'event' ? classes.activeBtn : classes.toggleBtn}
                    >
                      <span id="event" className={classes.customButton}>
                        Event
                      </span>
                    </ToggleButton>
                    <ToggleButton
                      value="organization"
                      id="organization"
                      style={
                        { padding: '0 30px' } // onClick={this.handleToggle}
                      }
                      className={this.state.selected === 'organization' ? classes.activeBtn : classes.toggleBtn}
                    >
                      <span id="organization" className={classes.customButton}>
                        Organization
                      </span>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Grid>
            </Grid>
            <Grid>
              <ExpansionPanel expanded={this.state.expanded} onChange={this.handleMoreOption}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>More options</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.moreOptionPanel}>
                  <Grid item md={12} container alignItems="center">
                    <Grid item md={5} className={classes.gridItem}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="causes">
                          <Typography className={classes.whiteText}>Causes</Typography>
                        </InputLabel>

                        <Select
                          multiple
                          value={this.state.cause}
                          onChange={this.handleChange('cause')}
                          input={<Input className={classes.whiteText} multiline id="select-multiple-checkbox" />}
                          renderValue={() => this.state.cause.join(', ')}
                          MenuProps={MenuProps}
                        >
                          {causes.map(c => (
                            <MenuItem key={this.unique++} value={c}>
                              <Checkbox checked={this.state.cause.indexOf(c) > -1} />
                              <Typography className={classes.whiteText}>
                                <ListItemText primary={c} />
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={2} className={classes.gridItem}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="distance">
                          <Typography className={classes.whiteText}>Distance</Typography>
                        </InputLabel>
                        <Select
                          fullWidth
                          value={this.state.distance}
                          onChange={this.handleChange('distance')}
                          inputProps={{ name: 'distance', id: 'distance', style: { color: 'white' } }}
                        >
                          {distance.map(d => (
                            <MenuItem key={d} value={d}>
                              {d} Miles
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </div>
        <div className={classes.spacerDiv} />
        <div className={classes.displayDiv}>
          {this.state.selected === 'event' ? <DisplayEventCards /> : <DisplayOrgCards />}
        </div>
      </div>
    );
  }
}
type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const Home: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(InternalHome));
export default Home;
