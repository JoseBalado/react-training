import * as React from "react";
import { IRootState } from "../../../../store/model";
import { fetchMovie } from "../../../../store/omdb-reduxform";
import { connect } from "react-redux";

import  { ReduxPaperSheet } from "./omdb-paper.component"
import { IMovieForm } from './omdb-reduxform-simple-form';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IOMDbReduxAPIProps extends StateProps, DispatchProps {}

export interface IOMDbReduxAPIState {}

export class OMDbReduxAPI extends React.Component<IOMDbReduxAPIProps, IOMDbReduxAPIState> {
  componentDidMount = () => {
    // Default movie 'Lego'
    this.props.fetchMovie('Batman');
  };

  onFormSubmit = (value: Partial<IMovieForm>) => {
    if(value.name){
      this.props.fetchMovie(value.name);
      }
  }

  render() {
    const { loading, movie } = this.props;
    console.log('loading', loading)
    console.log('movie', movie)
    return (
      <ReduxPaperSheet
        Title={movie.Title}
        Plot={movie.Plot}
        Poster={movie.Poster}
        onSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = ({ reduxMovie: { loading, movie } }: IRootState) => ({
  movie,
  loading
});

const mapDispatchToProps = {
  fetchMovie
};

export const OMDbReduxFormAPIComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OMDbReduxAPI);
