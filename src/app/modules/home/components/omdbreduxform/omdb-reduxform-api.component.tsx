import * as React from "react";
import { IRootState } from "../../../../store/model";
import { fetchMovie } from "../../../../store/omdb-reduxform";
import { connect } from "react-redux";

import  { PaperSheet } from "./omdb-paper.component"

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IOMDbReduxAPIProps extends StateProps, DispatchProps {}

export interface IOMDbReduxAPIState {}

export class OMDbReduxAPI extends React.Component<IOMDbReduxAPIProps, IOMDbReduxAPIState> {
  componentDidMount = () => {
    // Default movie 'Lego'
    this.props.fetchMovie('Lego');
  };

  render() {
    const { loading, movie, fetchMovie } = this.props;
    console.log('loading', loading)
    console.log('movie', movie)
    return (
      <div>
        <PaperSheet
          Title={movie.Title}
          Plot={movie.Plot}
          Poster={movie.Poster}
          onSubmit={fetchMovie}
        />
      </div>
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
