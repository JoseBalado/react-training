import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { IMovie } from '../../../../models/movie.model'

import  SimpleForm, { IMovieForm } from './omdb-reduxform-simple-form';
import { FormErrors } from 'redux-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

export const ReduxPaperSheet: React.FC<IMovie & {onSubmit: (value: Partial<IMovieForm>) => void | FormErrors<FormData> | Promise<any>}> = props => {
  const classes = useStyles();
  console.log('props', props);
  const { Title, Plot, Poster, onSubmit } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <SimpleForm 
          onSubmit={onSubmit}
        />
        <Typography variant="h5" component="h3">
          Title
        </Typography>
        <Typography component="p">
          {Title}
        </Typography>
        <Typography variant="h5" component="h3">
          Plot
        </Typography>
        <Typography component="p">
          {Plot}
        </Typography>
        <Typography variant="h5" component="h3">
          Image
        </Typography>
        <Typography component="p">
          <img src={Poster} alt="something" />
        </Typography>
      </Paper>
    </div>
  );
}
